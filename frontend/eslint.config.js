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
    files: ["**/__tests__/**/*.cjs", "**/tests/**/*.cjs", "**/*.test.cjs"],
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
