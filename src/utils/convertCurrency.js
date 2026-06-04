/* eslint-disable no-undef */
import "dotenv/config";

import fs from "fs";
import matter from "gray-matter";
import path from "path";

const YEARS_DIR = path.join(process.cwd(), "src/content/pastYears");
const API_KEY = process.env.EXCHANGE_API_KEY;

if (!API_KEY) {
  console.error("❌ Missing EXCHANGE_API_KEY in .env");
  process.exit(1);
}

// Fetch USD‑base historical quotes (USDSEK, USDEUR)
async function fetchRates(date) {
  let current = new Date(date);
  if (isNaN(current.getTime())) {
    throw new Error(`Invalid exchangeDate format: ${date}`);
  }

  for (let i = 0; i < 14; i++) {
    const iso = current.toISOString().split("T")[0];

    const url =
      `https://api.exchangerate.host/historical` +
      `?access_key=${API_KEY}` +
      `&date=${iso}`;

    const res = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0",
        Accept: "application/json",
      },
    });

    if (!res.ok) {
      console.log(`    ↳ HTTP ${res.status} — retrying previous day`);
      current.setDate(current.getDate() - 1);
      continue;
    }

    const data = await res.json();

    const usdToEur = data?.quotes?.USDEUR;
    const usdToSek = data?.quotes?.USDSEK;

    if (usdToEur && usdToSek) {
      if (iso !== date) {
        console.log(`    ↳ Using previous business day ${iso}`);
      }
      return { usdToEur, usdToSek };
    }

    current.setDate(current.getDate() - 1);
  }

  throw new Error(
    `No valid historical quotes found within 14 days of ${date}.`
  );
}

function getDirection(data) {
  if (typeof data.amountSEK === "number") return "SEK";
  if (typeof data.amountUS === "number") return "USD";
  if (typeof data.amountEU === "number") return "EUR";
  return null;
}

async function run() {
  const files = fs.readdirSync(YEARS_DIR).filter((f) => f.endsWith(".md"));

  for (const file of files) {
    const filePath = path.join(YEARS_DIR, file);
    const raw = fs.readFileSync(filePath, "utf8");
    const parsed = matter(raw);
    const data = parsed.data;

    console.log(`\nProcessing ${file}...`);

    if (!data.exchangeDate) {
      console.log("  ❌ Missing exchangeDate — skipping");
      continue;
    }

    const direction = getDirection(data);
    if (!direction) {
      console.log("  ❌ No numeric amount found — skipping");
      continue;
    }

    let usdToEur, usdToSek;
    try {
      ({ usdToEur, usdToSek } = await fetchRates(data.exchangeDate));
    } catch (err) {
      console.log(`  ❌ Error fetching rate: ${err.message}`);
      continue;
    }

    const newData = { ...data, exchangeRate: { usdToEur, usdToSek } };

    // SEK → USD/EUR
    if (direction === "SEK") {
      const sek = data.amountSEK;

      newData.amountEU = Math.round(sek * (usdToEur / usdToSek));
      newData.amountUS = Math.round(sek * (1 / usdToSek));

      console.log(`  ✔ SEK → EUR = ${newData.amountEU}`);
      console.log(`  ✔ SEK → USD = ${newData.amountUS}`);
    }

    // USD → EUR
    if (direction === "USD") {
      const usd = data.amountUS;
      newData.amountEU = Math.round(usd * usdToEur);

      console.log(`  ✔ USD → EUR = ${newData.amountEU}`);
    }

    // EUR → USD
    if (direction === "EUR") {
      const eur = data.amountEU;
      newData.amountUS = Math.round(eur / usdToEur);

      console.log(`  ✔ EUR → USD = ${newData.amountUS}`);
    }

    const updated = matter.stringify(parsed.content, newData);
    fs.writeFileSync(filePath, updated);
  }

  console.log("\n✨ Done!");
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
