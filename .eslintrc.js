module.exports = {
  plugins: ['fsd'],
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'airbnb-base',
    'plugin:fsd/all',
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  rules: {
    'no-underscore-dangle': 0,
    'linebreak-style': 0,
  },
  settings: {
    'import/extensions': { js: 'always' },
  },
};
