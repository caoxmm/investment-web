module.exports = {
  env: {
    browser: true,
    node: true,
    es2021: true,
    commonjs: true,
    es6: true,
  },
  globals: {
    window: 'readonly',
  },
  extends: [
    'airbnb',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:react/jsx-runtime',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'react',
    '@typescript-eslint',
  ],
  rules: {
    'import/prefer-default-export': 0,
    'no-underscore-dangle': 0,
    'import/extensions': [2, { ts: 'always', tsx: 'always' }],
    'react/jsx-filename-extension': [1, { extensions: ['.tsx', '.jsx'] }],
    'import/no-unresolved': 0,
    'react/require-default-props': 0,
    'import/order': 0,
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    'no-shadow': 0,
    'no-restricted-syntax': 0,
    'jsx-a11y/click-events-have-key-events': 0,
    'react/display-name': 0,
    'jsx-a11y/no-static-element-interactions': 0,
    'jsx-a11y/anchor-is-valid': 0,
    'no-console': 0,
    'no-unused-vars': 0,

  },
};
