// @ts-check

import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import perfectionist from "eslint-plugin-perfectionist";

export default tseslint.config(
  {
    ignores: ["**/*.js"],
  },
  eslint.configs.recommended,
  tseslint.configs.strictTypeChecked,
  tseslint.configs.stylisticTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  perfectionist.configs["recommended-natural"],
  {
    rules: {
      // Allow empty constructors (singleton, DI, etc.)
      "@typescript-eslint/no-empty-function": [
        "error",
        {
          allow: ["private-constructors", "protected-constructors"],
        },
      ],

      // Don’t force alphabetical enum order (for LogLevel etc.)
      "perfectionist/sort-enums": "off",

      // Keep semantic order of switch cases
      "perfectionist/sort-switch-case": "off",

      // (Optional) keep these, but with only valid options
      "perfectionist/sort-objects": [
        "error",
        {
          type: "natural",
          order: "asc",
          ignoreCase: true,
          partitionByComment: "sort-keys",
        },
      ],
      "perfectionist/sort-interfaces": [
        "error",
        {
          type: "natural",
          order: "asc",
          ignoreCase: true,
        },
      ],
    },
  },
);
