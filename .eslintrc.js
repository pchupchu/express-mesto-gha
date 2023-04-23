module.exports = {
  env: {
    es2021: true,
  },
  extends: 'airbnb-base',
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'import/no-extraneous-dependencies': 'off',
    'comma-dangle': 'off',
    'consistent-return': 'off',
    'no-console': 'off',
    'func-names': 'off',
    'newline-per-chained-call': 'off',
    'implicit-arrow-linebreak': 'off',
    'no-underscore-dangle': ['error', { allow: ['_id'] }],
  },
};
