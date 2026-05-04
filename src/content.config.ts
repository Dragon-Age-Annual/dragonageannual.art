import { SocialLinks } from "@fujocoded/zod-transform-socials";
import { avatarUrlForName } from "./utils/avatarURL";
import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { parse } from "csv-parse/sync";
import { z } from "astro/zod";

interface RowData {
  Name: string;
  Events: string;
  "Social 1": string;
  "Social 2"?: string;
  "Social 3"?: string;
  "Social 4"?: string;
  Roles?: string;
  Bio?: string;
}

const modCollection = defineCollection({
  loader: async () => {
    const res = await fetch(
      "https://docs.google.com/spreadsheets/d/1GJP6ADFCmNZAGGZF79CjMcWJYPx1hyHkjy26tOdmsc4/export?format=csv"
    );
    const csv = await res.text();

    const rows: RowData[] = parse(csv, {
      columns: true,
      skip_empty_lines: true,
    });

    return rows.map((row) => {
      const name = row["Name"];
      const bio = row["Bio"];
      const avatar = avatarUrlForName(name);

      const links = [
        row["Social 1"],
        row["Social 2"],
        row["Social 3"],
        row["Social 4"],
      ]
        .map((s) => (typeof s === "string" ? s.trim() : ""))
        .filter((s) => s.length > 0)
        .map((url) => ({ url }));

      const id = name.toLowerCase().replace(/\s+/g, "-");

      const modDuties = row["Events"]
        .split(",")
        .map((d) => d.trim().toLowerCase())
        .filter(Boolean);

      const roles = row["Roles"]!.split(",").map((d) => d.trim().toLowerCase());

      return {
        id,
        name,
        avatar,
        links,
        roles,
        bio,
        mod_duties: modDuties,
      };
    });
  },

  schema: () =>
    z.object({
      id: z.string(),
      name: z.string(),
      avatar: z.url(),
      links: SocialLinks,
      roles: z.array(z.string()),
      bio: z.string(),
      mod_duties: z.array(z.string()),
    }),
});

const pastYearsCollection = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/pastYears/" }),
  schema: ({ image }) =>
    z.object({
      year: z.number().min(2022),
      title: z.string(),
      theme: z.string(),
      charityName: z.string(),
      charityLink: z.url(),
      cover: image(),
      coverAlt: z.string(),
      amountUS: z.union([z.string(), z.number()]),
      amountEU: z.union([z.string(), z.number()]),
      exchangeRate: z.number().positive().optional(),
      exchangeDate: z.string().optional(),
    }),
});

export const collections = {
  mods: modCollection,
  pastYears: pastYearsCollection,
};
