module.exports = {
  env: {
    browser: true,
    node: true
  },
  extends: [
    'eslint:recommended'
  ],
  parserOptions: {
    ecmaVersion: 6,
    sourceType: "module"
  },
  rules: {
    indent: ['error', 2],
    semi: [2, 'never'],
    camelcase: 2,
    'no-console': 0,
    'comma-dangle': [2, 'never'],
    'comma-spacing': [1, {before: false, after: true}],
    'computed-property-spacing': [1, 'always'],
    'import/extensions': ['off', 'never'],
    "space-before-function-paren": [2, {"anonymous": "always", "named": "never"}]
  }
}
