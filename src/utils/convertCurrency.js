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

// Fetch USD‑base historical quote using HistoricalResponse schema
async function fetchRate(date) {
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

    // HistoricalResponse schema: quotes.USDEUR
    const eurQuote = data?.quotes?.USDEUR;

    if (eurQuote) {
      if (iso !== date) {
        console.log(`    ↳ Using previous business day ${iso}`);
      }
      return eurQuote;
    }

    current.setDate(current.getDate() - 1);
  }

  throw new Error(`No valid historical quote found within 7 days of ${date}.`);
}

function getDirection(data) {
  if (typeof data.amountUS === "number") return "USD->EUR";
  if (typeof data.amountEU === "number") return "EUR->USD";
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

    // Skip if already converted

    if (!data.exchangeDate) {
      console.log("  ❌ Missing exchangeDate — skipping");
      continue;
    }

    const direction = getDirection(data);
    if (!direction) {
      console.log("  ❌ No numeric amountUS/amountEU — skipping");
      continue;
    }

    const sourceAmount =
      direction === "USD->EUR" ? data.amountUS : data.amountEU;

    if (typeof sourceAmount !== "number") {
      console.log("  ❌ Amount is not numeric (TBD?) — skipping");
      continue;
    }

    if (direction === "USD->EUR" && typeof data.amountEU === "number") {
      console.log("  ❌ Already converted (amountEU exists) — skipping");
      continue;
    }

    if (direction === "EUR->USD" && typeof data.amountUS === "number") {
      console.log("  ❌ Already converted (amountUS exists) — skipping");
      continue;
    }

    console.log(
      `  ➜ Fetching historical USD→EUR quote for ${data.exchangeDate}`
    );

    let usdToEur;
    try {
      usdToEur = await fetchRate(data.exchangeDate);
    } catch (err) {
      console.log(`  ❌ Error fetching rate: ${err.message}`);
      continue;
    }

    let converted;
    if (direction === "USD->EUR") {
      // USD → EUR: multiply by USDEUR
      converted = Math.round(sourceAmount * usdToEur);
    } else {
      // EUR → USD: divide by USDEUR
      converted = Math.round(sourceAmount / usdToEur);
    }

    const newData = {
      ...data,
      exchangeRate: usdToEur,
      ...(direction === "USD->EUR"
        ? { amountEU: converted }
        : { amountUS: converted }),
    };

    const updated = matter.stringify(parsed.content, newData);
    fs.writeFileSync(filePath, updated);

    console.log(
      `  ✔ Updated ${direction === "USD->EUR" ? "amountEU" : "amountUS"} = ${converted}`
    );
    console.log(`  ✔ Rate used (USDEUR) = ${usdToEur}`);
  }

  console.log("\n✨ Done!");
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
