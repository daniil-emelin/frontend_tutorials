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
      plugins: ["check-brand-title", "@html-eslint"],
      extends: ["plugin:@html-eslint/recommended"],
      rules: {
        "check-brand-title/check-title": "error",
        "@html-eslint/require-title": "off",
        "@html-eslint/indent": ["error", 2]
      },
    },
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {
    "@html-eslint/require-title": "off",
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
