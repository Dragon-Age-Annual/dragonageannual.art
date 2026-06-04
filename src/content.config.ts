import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const pastYearsCollection = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/pastYears/" }),
  schema: ({ image }) =>
    z.object({
      year: z.number().min(2022),
      title: z.string(),
      theme: z.string(),
      charityName: z.string(),
      charityLink: z.url(),
      receiptLink: z.string().optional(),
      cover: image(),
      coverAlt: z.string(),
      amountSEK: z.union([z.string(), z.number()]).optional(),
      amountUS: z.union([z.string(), z.number()]),
      amountEU: z.union([z.string(), z.number()]),
      exchangeRate: z.union([
        z.number().positive(),
        z
          .object({
            usdToEur: z.number().positive(),
            usdToSek: z.number().positive(),
          })
          .optional(),
      ]),
      exchangeDate: z.string().optional(),
    }),
});

export const collections = { pastYears: pastYearsCollection };
