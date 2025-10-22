import globals from "globals";
import js from "@eslint/js";
import react from "eslint-plugin-react";

export default [
  js.configs.recommended,
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
  },

  {
    files: ["**/*.{js,jsx}"],
    plugins: {
      react: react,
    },
    ...react.configs.flat.recommended,

    rules: {
      "react/prop-types": "off",
      "react/react-in-jsx-scope": "off",
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
  // Provide Jest globals for test files and ignore coverage output
  {
    // match common test file patterns (jest/playwright/mocha style)
    files: [
      "**/__tests__/**/*.{js,cjs,mjs}",
      "**/tests/**/*.{js,cjs,mjs}",
      "**/*.test.{js,cjs,mjs}",
      "**/*.spec.{js,cjs,mjs}",
    ],
    languageOptions: {
      globals: {
        ...globals.jest,
      },
    },
  },
  {
    ignores: ["coverage/**"],
  },
];
