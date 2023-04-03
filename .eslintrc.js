module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: "airbnb-base",
  overrides: [],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {
    devDependencies: true,
    quotes: ["error", "double"],
    "no-console": "off",
    "no-underscore-dangle": ["error", { allow: ["_id"] }],
  },
};
