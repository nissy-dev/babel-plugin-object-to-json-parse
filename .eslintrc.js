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
    "@typescript-eslint/ban-ts-ignore": "warn",
  },
  env: {
    node: true,
  },
}
