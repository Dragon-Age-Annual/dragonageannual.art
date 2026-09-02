/**
 * Fetches and aggregates "Community Copy Donations" orders from Big Cartel.
 *
 * Every €15 in this product's orders = one free copy donated for the community.
 * This runs server-side only (inside the Astro live loader) — the credentials
 * here must never be bundled into client JS, which is why this whole thing
 * needs an adapter + prerender=false rather than a client-side fetch.
 *
 * Shape reference: https://developers.bigcartel.com/api/v1#orders
 *
 * Key things about Big Cartel's response shape:
 * - Pagination uses `page[limit]` and `page[offset]`.
 * - An order's line items are NOT embedded in the order. The order has
 *   `relationships.items.data` — an array of {type: "order_line_items", id}
 *   stubs — and the actual line item attributes (product_id, quantity, price,
 *   total) live in the response's top-level `included` array, keyed by id.
 * - `payment_status` (flat attribute) has real values: unpaid, pending,
 *   completed, failed, invalid. "completed" = paid and counted.
 */

const DONATION_UNIT_EUR = 15;

export interface DonationStats {
  totalDonatedEur: number;
  copiesUnlocked: number;
  progressToNextCopyEur: number; // how much of the *next* €15 has been collected
  lastUpdated: string;
}

interface FetchOrdersResult {
  orders: any[];
  lineItemsById: Map<string, any>;
}

async function fetchAllOrdersWithLineItems(): Promise<FetchOrdersResult> {
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
    "User-Agent":
      "DragonAgeAnnual Community Copy Counter/1.0 (https://dragonageannual.art)",
  };

  // Step 1: resolve the numeric account ID.
  const accountRes = await fetch("https://api.bigcartel.com/v1/accounts", {
    headers: commonHeaders,
  });
  if (!accountRes.ok) {
    throw new Error(
      `Big Cartel account lookup failed: ${accountRes.status} ${await accountRes.text()}`
    );
  }
  const accountJson = await accountRes.json();
  const accountId = Array.isArray(accountJson.data)
    ? accountJson.data[0]?.id
    : accountJson.data?.id;

  if (!accountId) {
    throw new Error(
      `Could not resolve account ID from response: ${JSON.stringify(accountJson)}`
    );
  }

  // Step 2: paginate orders using page[limit] / page[offset].
  const orders: any[] = [];
  const lineItemsById = new Map<string, any>();
  const limit = 50;
  let offset = 0;

  while (true) {
    const res = await fetch(
      `https://api.bigcartel.com/v1/accounts/${accountId}/orders?page%5Blimit%5D=${limit}&page%5Boffset%5D=${offset}`,
      { headers: commonHeaders }
    );

    if (!res.ok) {
      throw new Error(
        `Big Cartel orders request failed: ${res.status} ${await res.text()}`
      );
    }

    const batch = await res.json();
    const pageOrders = Array.isArray(batch.data) ? batch.data : [];
    const included = Array.isArray(batch.included) ? batch.included : [];

    for (const resource of included) {
      if (resource.type === "order_line_items") {
        lineItemsById.set(String(resource.id), resource);
      }
    }

    if (pageOrders.length === 0) break;

    orders.push(...pageOrders);
    offset += limit;

    if (offset > 50_000) {
      console.warn(
        "fetchAllOrdersWithLineItems: hit safety limit, stopping early."
      );
      break;
    }
  }

  return { orders, lineItemsById };
}

function isCompletedOrder(order: any): boolean {
  const status = String(order?.attributes?.payment_status ?? "").toLowerCase();
  return status === "completed";
}

export async function getDonationStats(): Promise<DonationStats> {
  const donationProductId = import.meta.env.BIGCARTEL_DONATION_PRODUCT_ID;
  if (!donationProductId) {
    throw new Error("Missing BIGCARTEL_DONATION_PRODUCT_ID env var.");
  }

  const { orders, lineItemsById } = await fetchAllOrdersWithLineItems();

  let totalDonatedEur = 0;

  for (const order of orders) {
    if (!isCompletedOrder(order)) continue;

    const itemRefs = order?.relationships?.items?.data ?? [];
    for (const ref of itemRefs) {
      const lineItem = lineItemsById.get(String(ref.id));
      if (!lineItem) continue;

      const productId = lineItem.attributes?.product_id;
      if (String(productId) === String(donationProductId)) {
        totalDonatedEur += Number(lineItem.attributes?.total ?? 0);
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
