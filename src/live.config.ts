import type { LiveLoader } from "astro/loaders";
import { SocialLinks } from "@fujocoded/zod-transform-socials/zod4";
import { avatarUrlForName } from "./utils/avatarURL";
import { defineLiveCollection } from "astro:content";
import { getDonationStats } from "./lib/bigCartelDonations";
import { modsLoader } from "./content/loaders/mods-loader";
import { z } from "astro/zod";

// Simple module-scope cache as a fallback for hosts without an adapter-provided
// cache store (e.g. Cloudflare KV). This only helps within a warm instance —
// on serverless hosts with frequent cold starts, lean more on the cacheHint
// below and/or your platform's edge caching for the page itself.
let cached: {
  data: Awaited<ReturnType<typeof getDonationStats>>;
  expiresAt: number;
} | null = null;
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes — tune to taste vs. Big Cartel rate limits

async function getCachedStats() {
  if (cached && cached.expiresAt > Date.now()) {
    return cached.data;
  }
  const data = await getDonationStats();
  cached = { data, expiresAt: Date.now() + CACHE_TTL_MS };
  return data;
}

const communityCopyLoader: LiveLoader = {
  name: "community-copy-donations",
  loadCollection: async () => {
    try {
      const stats = await getCachedStats();
      return {
        entries: [{ id: "community-copies", data: stats }],
        cacheHint: { tags: ["community-copies"], maxAge: CACHE_TTL_MS / 1000 },
      };
    } catch (error) {
      return {
        error: error instanceof Error ? error : new Error(String(error)),
      };
    }
  },
  loadEntry: async () => {
    try {
      const stats = await getCachedStats();
      return { id: "community-copies", data: stats };
    } catch (error) {
      return {
        error: error instanceof Error ? error : new Error(String(error)),
      };
    }
  },
};

export const communityCopies = defineLiveCollection({
  loader: communityCopyLoader,
  schema: z.object({
    totalDonatedEur: z.number(),
    copiesUnlocked: z.number(),
    progressToNextCopyEur: z.number(),
    lastUpdated: z.string(),
  }),
});

export const collections = {
  communityCopies,
  mods: defineLiveCollection({
    loader: modsLoader("daa"),

    schema: z
      .object({
        Name: z.string(),
        Bio: z.string().optional(),
        Events: z.string(),
        Roles: z.string().optional(),
        "Social 1": z.string(),
        "Social 2": z.string().optional(),
        "Social 3": z.string().optional(),
        "Social 4": z.string().optional(),
      })
      .transform((row) => {
        const rawSocials = [
          row["Social 1"],
          row["Social 2"],
          row["Social 3"],
          row["Social 4"],
        ].filter((val): val is string => val != null && val !== "");

        const socials = SocialLinks.parse(rawSocials);

        return {
          id: row.Name.toLowerCase().replace(/\s+/g, "-"),
          name: row.Name,
          avatar: avatarUrlForName(row.Name),
          bio: row.Bio ?? "",
          links: socials,
          roles: row.Roles
            ? row.Roles.split(",").map((r) => r.trim().toLowerCase())
            : [],
          mod_duties: row.Events.split(",")
            .map((d) => d.trim().toLowerCase())
            .filter(Boolean),
        };
      }),
  }),
};
