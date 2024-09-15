import rootConfig from '../../eslint.config.js';

export default [
  ...rootConfig,
  // Override Global Scope
  {
    name: 'SERVER_GLOBAL_SCOPE',
    ignores: [
      'dist/**/*',
      'node_modules/**/*',
    ],
  },
];