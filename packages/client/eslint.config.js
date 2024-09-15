import globals from 'globals';
import path from 'node:path';

// React
import ReactModernPlugin from '@eslint-react/eslint-plugin';
import ReactBasePlugin from 'eslint-plugin-react';
import ReactHooksPlugin from 'eslint-plugin-react-hooks';
import ReactRefreshPlugin from 'eslint-plugin-react-refresh';

import rootConfig from '../../eslint.config.js';

export default [
  ...rootConfig,
  // React
  {
    name: 'REACT_SCOPE',
    files: ['**/*.{jsx,tsx}'],
    plugins: {
      // @eslint-react
      ...ReactModernPlugin.configs.recommended.plugins,
      // @eslint-react/debug/class-component
      react: ReactBasePlugin,
      'react-hooks': ReactHooksPlugin,
      'react-refresh': ReactRefreshPlugin,
    },
    settings: {
      ...ReactBasePlugin.configs.recommended.settings,
      ...ReactModernPlugin.configs.recommended.settings,
      react: {
        version: 'detect',
      },
    },
    languageOptions: {
      parser: rootConfig[0].languageOptions.parser,
      parserOptions: {
        ...rootConfig[0].languageOptions.parserOptions,
        ecmaFeatures: {
          jsx: true,
        },
        project: ['./tsconfig.app.json'],
        tsconfigRootDir: path.resolve(),
      },
      globals: {
        ...globals.browser,
        React: 'readonly',
      },
    },
    rules: {
      ...ReactBasePlugin.configs.recommended.rules,
      ...ReactModernPlugin.configs.recommended.rules,
      'react/prop-types': 'off',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'react-refresh/only-export-components': 'warn',
      '@eslint-react/dom/no-dangerously-set-innerhtml': 'off',
    },
  },
  // Override Global Scope
  {
    name: 'CLIENT_GLOBAL_SCOPE',
    ignores: [
      'dist/*',
      'docs/**/*',
      'src/assets/icons/*',
      'src/components/cn/ui/*',
      'src/chroma/test_data/*',
      'tailwind.config.ts',
    ],
  },
];
