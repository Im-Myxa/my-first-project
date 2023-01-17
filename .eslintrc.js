module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: ['eslint:recommended', 'plugin:react/recommended'],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  plugins: ['react'],
  rules: {
    indent: ['error', 2],
    semi: [2, 'always'],
    'space-before-function-paren': [
      'error',
      { anonymous: 'always', named: 'never' }
    ],
    'multiline-ternary': ['off'],
    quotes: [
      'error',
      'single',
      { allowTemplateLiterals: true, avoidEscape: true }
    ],
    'no-console': 'warn'
  }
};
