// Default
import JSPlugin from '@eslint/js'
import TSPlugin from 'typescript-eslint'

// Prettier
import PrettierPlugin from 'eslint-config-prettier'

export default [
  // 1. JavaScript & TypeScript (Base)
  {
    name: 'JS_TS_BASE',
    files: ['**/*.{js,ts,jsx,tsx}'],
    languageOptions: {
      parser: TSPlugin.parser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    plugins: {
      '@typescript-eslint': TSPlugin.plugin,
    },
    rules: {
      ...JSPlugin.configs.recommended.rules,
      ...TSPlugin.configs.recommended.rules,
      // Disable rules:
      'no-unused-vars': 'off',
      'no-undef': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
    },
  },

  // 2. Prettier
  {
    name: 'PRETTIER_SCOPE',
    rules: PrettierPlugin.rules,
  },

  // 3. Global Scope
  {
    name: 'GLOBAL_SCOPE',
    ignores: ['**/dist/**', '**/node_modules/**'],
  },
]
