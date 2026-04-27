import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import globals from "globals";

const importSortGroups = [
  ["^react$", "^next"],
  ["^@", "^\\w"],
  ["^@/features/"],
  ["^(@)(?!/features/)(/.*|$)"],
  ["^\\.\\.(?!/?$)", "^\\.\\./?$"],
  ["^\\./(?=.*/)(?!/?$)", "^\\.(?!/?$)", "^\\./?$"],
];

export default tseslint.config(
  { settings: { react: { version: "detect" } } },
  {
    ignores: [
      "**/node_modules/**",
      "dist/**",
      "coverage/**",
      ".next/**",
      "@mf-types/**",
      "**/*.d.ts",
      "src/trpc/types.d.ts",
    ],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  react.configs.flat["jsx-runtime"],
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      "simple-import-sort": simpleImportSort,
    },
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
    rules: {
      ...reactHooks.configs.flat.recommended.rules,
      ...reactRefresh.configs.vite.rules,
      "no-console": "warn",
      "react/prop-types": "off",
      "react/display-name": "off",
      "@typescript-eslint/consistent-type-imports": [
        "warn",
        { prefer: "type-imports", fixStyle: "inline-type-imports" },
      ],
      "react-refresh/only-export-components": "warn",
      "simple-import-sort/imports": ["warn", { groups: importSortGroups }],
    },
  },
);
