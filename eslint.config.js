import js from "@eslint/js";
import globals from "globals";
import pluginReact, { rules } from "eslint-plugin-react";
import { defineConfig } from "eslint/config";

export default defineConfig([
  { files: ["**/*.{js,mjs,cjs,jsx}"], plugins: { js }, extends: ["js/recommended"], languageOptions: { globals: globals.browser } },
  pluginReact.configs.flat.recommended,
]);

module.exports = {
  rules: {
    'react/react-in-jsx-scope': 'off',
  }
};