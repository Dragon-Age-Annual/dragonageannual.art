/**
 * Fetches and aggregates "Community Copy Donations" orders from Big Cartel.
 *
 * Every €15 in this product's orders = one free copy unlocked for the community.
 * This runs server-side only (inside the Astro live loader) — the credentials
 * here must never be bundled into client JS, which is why this whole thing
 * needs an adapter + prerender=false rather than a client-side fetch.
 */

const DONATION_UNIT_EUR = 15;

export interface DonationStats {
  totalDonatedEur: number;
  copiesUnlocked: number;
  progressToNextCopyEur: number; // how much of the *next* €15 has been collected
  lastUpdated: string;
}

/**
 * Replace the body of this function with your existing fulfillment-script
 * request logic (same Basic Auth headers, same base URL/subdomain pattern
 * you already have working). Keeping it isolated here means the aggregation
 * math below doesn't care how the orders were fetched.
 *
 * Expected return: an array of raw order objects from Big Cartel, already
 * paginated through to completion.
 */
async function fetchAllOrders(): Promise<any[]> {
  const subdomain = import.meta.env.BIGCARTEL_SUBDOMAIN;
  const password = import.meta.env.BIGCARTEL_PASSWORD;

  if (!subdomain || !password) {
    throw new Error(
      "Missing BIGCARTEL_SUBDOMAIN or BIGCARTEL_PASSWORD env vars."
    );
  }

  const authHeader =
    "Basic " + Buffer.from(`${subdomain}:${password}`).toString("base64");
  const commonHeaders = {
    Authorization: authHeader,
    Accept: "application/vnd.api+json",
    "Content-type": "application/vnd.api+json",
  };

  // Step 1: resolve the numeric account ID. The /v1/accounts/{id}/... paths
  // want Big Cartel's internal ID, not your subdomain string.
  const accountRes = await fetch("https://api.bigcartel.com/v1/accounts", {
    headers: commonHeaders,
  });
  if (!accountRes.ok) {
    throw new Error(
      `Big Cartel account lookup failed: ${accountRes.status} ${await accountRes.text()}`
    );
  }
  const accountJson = await accountRes.json();
  // JSON:API shape — adjust if logging shows something different.
  const accountId = Array.isArray(accountJson.data)
    ? accountJson.data[0]?.id
    : accountJson.data?.id;

  if (!accountId) {
    throw new Error(
      `Could not resolve account ID from response: ${JSON.stringify(accountJson)}`
    );
  }

  // Step 2: paginate orders using JSON:API bracketed page params.
  const orders: any[] = [];
  let page = 1;
  const pageSize = 100;

  while (true) {
    const res = await fetch(
      `https://api.bigcartel.com/v1/accounts/${accountId}/orders?page%5Bnumber%5D=${page}&page%5Bsize%5D=${pageSize}`,
      { headers: commonHeaders }
    );

    if (!res.ok) {
      throw new Error(
        `Big Cartel orders request failed: ${res.status} ${await res.text()}`
      );
    }

    const batch = await res.json();
    const pageOrders = Array.isArray(batch.data) ? batch.data : [];
    orders.push(...pageOrders);

    if (pageOrders.length < pageSize) break;
    page += 1;
  }

  return orders;
}

/**
 * JSON:API resources put custom fields under `attributes`, and often express
 * relations (like "which product") under `relationships` rather than a flat
 * `product_id`. These helpers check the flat shape first, then fall back to
 * the nested shape, so you don't have to guess up front which one Big Cartel
 * actually returns for orders/line-items specifically.
 */
function field(obj: any, key: string): any {
  return obj?.[key] ?? obj?.attributes?.[key];
}

function relatedProductId(lineItem: any): string | undefined {
  return (
    lineItem?.product_id ??
    lineItem?.attributes?.product_id ??
    lineItem?.relationships?.product?.data?.id
  );
}

function isCompletedOrder(order: any): boolean {
  // e.g. exclude cancelled/refunded/unpaid orders
  const status = String(
    field(order, "status") ?? field(order, "payment_status") ?? ""
  ).toLowerCase();
  return !["cancelled", "canceled", "refunded", "unpaid"].includes(status);
}

function lineItemTotal(lineItem: any): number {
  const total = field(lineItem, "total");
  if (typeof total === "number") return total;
  const qty = field(lineItem, "quantity") ?? 1;
  const unitPrice =
    field(lineItem, "price") ?? field(lineItem, "unit_price") ?? 0;
  return qty * unitPrice;
}

export async function getDonationStats(): Promise<DonationStats> {
  const donationProductId = import.meta.env.BIGCARTEL_DONATION_PRODUCT_ID;
  if (!donationProductId) {
    throw new Error("Missing BIGCARTEL_DONATION_PRODUCT_ID env var.");
  }

  const orders = await fetchAllOrders();

  let totalDonatedEur = 0;

  for (const order of orders) {
    if (!isCompletedOrder(order)) continue;

    const lineItems = field(order, "line_items") ?? field(order, "items") ?? [];
    for (const item of lineItems) {
      if (String(relatedProductId(item)) === String(donationProductId)) {
        totalDonatedEur += lineItemTotal(item);
      }
    }
  }

  const copiesUnlocked = Math.floor(totalDonatedEur / DONATION_UNIT_EUR);
  const progressToNextCopyEur = Number(
    (totalDonatedEur - copiesUnlocked * DONATION_UNIT_EUR).toFixed(2)
  );

  return {
    totalDonatedEur: Number(totalDonatedEur.toFixed(2)),
    copiesUnlocked,
    progressToNextCopyEur,
    lastUpdated: new Date().toISOString(),
  };
}
