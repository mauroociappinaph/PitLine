import js from "@eslint/js";
import ts from "typescript-eslint";
import nextConfig from "eslint-config-next/flat";

export default [
  js.configs.recommended,
  ...ts.configs.recommended,
  ...nextConfig,
  {
    rules: {
      "@typescript-eslint/no-unused-vars": "warn",
      "@typescript-eslint/no-explicit-any": "off"
    }
  }
];
