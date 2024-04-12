import tseslint from "typescript-eslint";

import pluginJs from "@eslint/js";

export default tseslint.config(
  pluginJs.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  {
    ignores: [
      "**/dist/**",
      "**/*.spec.ts",
      "coverage",
      "**/coverage/",
      "eslint.config.mjs",
      "jest.config.js",
      ".prettierrc.js",
      ".yarn"
    ]
  },
  {
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.lint.json", "./packages/*/tsconfig.json"],
        tsconfigRootDir: import.meta.dirname
      }
    },
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-base-to-string": "off"
    }
  }
);
