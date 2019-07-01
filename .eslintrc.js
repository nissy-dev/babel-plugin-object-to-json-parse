module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier/@typescript-eslint"
  ],
  plugins: ["@typescript-eslint"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    sourceType: "module",
    // cwdからのpath
    project: "./tsconfig.json",
  },
  rules: {
    "@typescript-eslint/no-use-before-define": 0,
  },
  env: {
    node: true,
  },
}
