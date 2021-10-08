module.exports = {
  plugins: ['import', 'fsd'],
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
    'import/extensions': ['error', 'never', { js: 'ignorePackages', scss: 'always' }],
    'import/no-unresolved': 0,
  },
};
