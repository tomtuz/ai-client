import globals from "globals";
import path from "node:path";

// Default
import JSPlugin from "@eslint/js";
import TSPlugin from "typescript-eslint";

// React
import ReactModernPlugin from "@eslint-react/eslint-plugin";
import ReactBasePlugin from "eslint-plugin-react";
import ReactHooksPlugin from "eslint-plugin-react-hooks";
import ReactRefreshPlugin from "eslint-plugin-react-refresh";

// Prettier
import PrettierPlugin from "eslint-config-prettier";

// Debugging:
// - scripts/debug_eslint/eslint_debug.mjs

// Config Scopes:
// 1. JavaScript & TypeScript (Base, no overload)
// 2. React
// 3. Prettier (disables self-relevant rules, must be last)
// 4. Global Scope

export default [
  // 1. JavaScript & TypeScript (Base)
  {
    name: "JS_TS_BASE",
    files: ["**/*.{js,ts,jsx,tsx}"],
    languageOptions: {
      parser: TSPlugin.parser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
    },
    plugins: {
      "@typescript-eslint": TSPlugin.plugin,
    },

    rules: {
      ...JSPlugin.configs.recommended.rules,
      ...TSPlugin.configs.recommended.rules,
      // Disable rules:
      "no-unused-vars": "off",
      "no-undef": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unused-vars": "off",
    },
  },

  // 2. React
  {
    name: "REACT_SCOPE",
    files: ["**/*.{jsx,tsx}"],
    plugins: {
      // @eslint-react
      ...ReactModernPlugin.configs.recommended.plugins,
      // @eslint-react/debug/class-component
      react: ReactBasePlugin,
      "react-hooks": ReactHooksPlugin,
      "react-refresh": ReactRefreshPlugin,
    },
    settings: {
      ...ReactBasePlugin.configs.recommended.settings,
      ...ReactModernPlugin.configs.recommended.settings,
      react: {
        version: "detect",
      },
    },
    languageOptions: {
      parser: TSPlugin.parser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        project: ["./tsconfig.app.json"],
        tsconfigRootDir: path.resolve(),
      },
      globals: {
        ...globals.browser,
        React: "readonly",
      },
    },
    rules: {
      ...ReactBasePlugin.configs.recommended.rules,
      ...ReactModernPlugin.configs.recommended.rules,
      "react/prop-types": "off",
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
      "react-refresh/only-export-components": "warn",
      "@eslint-react/dom/no-dangerously-set-innerhtml": "off",
    },
  },

  // 3. Prettier
  {
    name: "PRETTIER_SCOPE",
    rules: PrettierPlugin.rules,
  },

  // 4. Global Scope
  {
    name: "GLOBAL_SCOPE",
    ignores: [
      "dist/*",
      "docs/**/*",
      "src/assets/icons/*",
      "src/components/cn/ui/*",
      "tailwind.config.ts",
    ],
  },
];
