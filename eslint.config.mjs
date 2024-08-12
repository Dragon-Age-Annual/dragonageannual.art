import { FlatCompat } from "@eslint/eslintrc";
import { fileURLToPath } from "node:url";
import globals from "globals";
import js from "@eslint/js";
import parser from "astro-eslint-parser";
import path from "node:path";
import tsParser from "@typescript-eslint/parser";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  ...compat.extends(
    "eslint:recommended",
    "plugin:astro/recommended",
    "plugin:astro/jsx-a11y-strict"
  ),
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.browser,
      },

      ecmaVersion: "latest",
      sourceType: "module",
    },

    rules: {},
  },
  {
    files: ["**/*.js"],

    rules: {
      "no-unused-vars": "off",
      "no-mixed-spaces-and-tabs": ["error", "smart-tabs"],
    },
  },
  {
    files: ["**/*.astro"],

    languageOptions: {
      parser: parser,
      ecmaVersion: 5,
      sourceType: "script",

      parserOptions: {
        parser: "@typescript-eslint/parser",
        extraFileExtensions: [".astro"],
      },
    },
    rules: {
      "no-unused-vars": "off",
      "no-mixed-spaces-and-tabs": ["error", "smart-tabs"],
    },
  },
  ...compat.extends("plugin:@typescript-eslint/recommended").map((config) => ({
    ...config,
    files: ["**/*.ts"],
  })),
  {
    files: ["**/*.ts"],

    languageOptions: {
      parser: tsParser,
    },

    rules: {
      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/no-non-null-assertion": "off",
    },
  },
  {
    files: ["**/*.astro/*.js", "*.astro/*.js"],

    languageOptions: {
      parser: tsParser,
    },
  },
  {
    ignores: ["env.d.ts", "*/env.d.ts", ".astro/*", "node_modules/*"],
  },
];
