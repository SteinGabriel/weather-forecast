// yarn add --dev prettier eslint-config-airbnb eslint-config-prettier eslint-plugin-prettier eslint-plugin-react eslint-plugin-import eslint-plugin-jsx-a11y
module.exports = {
  env: {
    es6: true,
    node: true,
    browser: true
  },
  parser: `babel-eslint`,
  extends: [`airbnb`, `prettier`, `prettier/react`],
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: `module`,
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
      jsx: true
    }
  },
  plugins: [`react`, 'prettier'],
  rules: {
    indent: [`error`, `tab`],
    'linebreak-style': [0],
    quotes: [`error`, `backtick`],
    semi: [`error`, `never`],
    'no-console': [`warn`, { allow: [`warn`] }],
    'max-len': [2, { code: 95, ignoreComments: true, ignoreUrls: true }],
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }]
  }
}
