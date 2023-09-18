module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["eslint:recommended"],
  overrides: [
    {
      env: {
        node: true,
      },
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script",
      },
    },
    {
      files: ["*.html"],
      parser: "@html-eslint/parser",
      plugins: ["@html-eslint"],
      extends: ["plugin:@html-eslint/recommended"],
    },
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {
    "@html-eslint/no-duplicate-id": "error",
    "@html-eslint/no-multiple-h1": "error",
    "@html-eslint/no-inline-styles": "error",
    "@html-eslint/require-button-type": "error",
    "@html-eslint/no-obsolete-tags": "error",
    "@html-eslint/require-img-alt": "error",
    "@html-eslint/element-newline": "error",
    "@html-eslint/no-multiple-empty-lines": "error",
    "@html-eslint/no-trailing-spaces": "error",
  },
};
