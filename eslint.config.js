// @ts-check

import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import perfectionist from "eslint-plugin-perfectionist";
import vitest from "@vitest/eslint-plugin";

export default tseslint.config(
  // 1. Base + TS configs
  {
    ignores: ["**/*.js"],
  },
  eslint.configs.recommended,
  tseslint.configs.strictTypeChecked,
  tseslint.configs.stylisticTypeChecked,

  // 2. Language options
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },

  // 3. Perfectionist base config
  perfectionist.configs["recommended-natural"],

  // 4. Global overrides (apply to ALL TS files)
  {
    rules: {
      // Make sure the core rule is off; TS rule handles everything
      "no-empty-function": "off",

      // Allow empty private/protected constructors
      "@typescript-eslint/no-empty-function": [
        "error",
        {
          allow: ["private-constructors", "protected-constructors"],
        },
      ],

      // Don’t force alphabetical enum order
      "perfectionist/sort-enums": "off",

      // Keep semantic order of switch cases
      "perfectionist/sort-switch-case": "off",

      // Still keep these perfectionist rules, but with your options
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

  // 5. Test-only overrides (Vitest)
  {
    files: ["**/*.test.ts", "**/*.spec.ts"],
    plugins: {
      vitest,
    },
    rules: {
      ...vitest.configs.recommended.rules,
      "@typescript-eslint/unbound-method": "off",
    },
  },
);
