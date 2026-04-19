import { defineConfig, fontProviders } from "astro/config";

import icon from "astro-icon";
import mdx from "@astrojs/mdx";
import metaTags from "astro-meta-tags";
import partytown from "@astrojs/partytown";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";
import robotsTxt from "astro-robots-txt";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  site: "https://www.dragonageannual.art",
  compressHTML: true,
  fonts: [
    {
      provider: fontProviders.fontsource(),
      name: "Lexend",
      cssVariable: "--font-lexend",
      fallbacks: ["sans-serif", "system-ui"],
    },
    {
      provider: fontProviders.fontsource(),
      name: "Atkinson Hyperlegible",
      cssVariable: "--font-atkinson-hyperlegible",
      fallbacks: ["sans-serif", "system-ui"],
    },
    {
      provider: fontProviders.local(),
      name: "DAA Font",
      cssVariable: "--font-daa",
      options: {
        variants: [
          {
            src: ["./src/assets/fonts/daa_font_regular-webfont.woff2"],
            weight: "normal",
            style: "normal",
          },
        ],
      },
    },
  ],
  integrations: [
    mdx(),
    icon(),
    partytown(),
    metaTags(),
    robotsTxt({
      policy: [
        {
          userAgent: "*",
          disallow: ["/search", "/_astro/"],
          crawlDelay: 5,
        },
        {
          userAgent: "Googlebot",
          allow: "/",
          disallow: ["/_astro/"],
          crawlDelay: 5,
        },
        {
          userAgent: "CCBot",
          disallow: "/",
        },
        {
          userAgent: "GPTBot",
          disallow: "/",
        },
        {
          userAgent: "ChatGPT-User",
          disallow: "/",
        },
        {
          userAgent: "Slurp",
          crawlDelay: 30,
        },
      ],
    }),
    sitemap(),
  ],
  markdown: {
    remarkPlugins: [],
    rehypePlugins: [
      rehypeSlug,
      [
        rehypeAutolinkHeadings,
        {
          behavior: "append",
          content: {
            type: "text",
            value: " #",
          },
          properties: {
            className: ["anchor"],
          },
        },
      ],
    ],
  },

  vite: {
		// @ts-expect-error: Vite's type definitions don't include the `plugins` property, but it is valid.
    plugins: [tailwindcss()],
  },
});
