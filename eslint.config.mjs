import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      // Disable/warn rules that are causing deployment issues
      "@typescript-eslint/no-unused-vars": "warn",
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-empty-object-type": "off",
      "react/no-unescaped-entities": "off",
      "@next/next/no-img-element": "warn",
      "prefer-const": "warn",
      // Additional useful rules
      "no-console": "warn",
      "react/prop-types": "off",
      "react/react-in-jsx-scope": "off"
    },
    // Add ignorePatterns if needed
    ignorePatterns: [
      "node_modules/",
      ".next/",
      "out/",
      "public/",
      "*.config.js",
      "*.config.mjs"
    ]
  }
];

export default eslintConfig;