import { defineCollection, z } from "astro:content";
import { socialsSchema, transformSocial } from "../lib/socials-transformer";

const modCollection = defineCollection({
  type: "content",
  schema: ({ image }) =>
    z.object({
      order: z.number(),
      name: z.string(),
      avatar: image(),
      roles: z.string().array().optional(),
      links: socialsSchema
        .array()
        .default([])
        .transform((links) => links.map(transformSocial)),
    }),
});

const pastYearsCollection = defineCollection({
  type: "content",
  schema: ({ image }) =>
    z.object({
      year: z.number().min(2022),
      title: z.string(),
      theme: z.string(),
      charityName: z.string(),
      charityLink: z.string().url(),
      cover: image(),
      coverAlt: z.string(),
      amountUS: z.number(),
      amountUK: z.number(),
    }),
});

export const collections = {
  mods: modCollection,
  pastYears: pastYearsCollection,
};
