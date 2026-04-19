// import { SocialLinks } from "@fujocoded/zod-transform-socials";

import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

// const modCollection = defineCollection({
//   loader: glob({ pattern: '**/*.md', base: "./src/content/mods/" }),
//   schema: ({ image }) =>
//     z.object({
//       order: z.number(),
//       name: z.string(),
//       avatar: image(),
//       roles: z.string().array().optional(),
//       links: SocialLinks,
//     }),
// });

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
      amountUS: z.number(),
      amountUK: z.number(),
    }),
});

export const collections = {
  // mods: modCollection,
  pastYears: pastYearsCollection,
};
