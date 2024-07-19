import compress from "astro-compress";
import { defineConfig } from "astro/config";
import icon from "astro-icon";
import mdx from "@astrojs/mdx";
import metaTags from "astro-meta-tags";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  compressHTML: true,
  integrations: [
    mdx(),
    icon(),
    tailwind({
      applyBaseStyles: false,
    }),
    compress(),
    metaTags(),
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
});
