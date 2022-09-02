module.exports = {
  env: {
    node: true,
    browser: true,
  },
  extends: [
    'sanity/react',
    'eslint:recommended',
    'plugin:react/recommended',
  ],
  rules: {
    'comma-dangle': ['error', 'always-multiline'],
    'max-len': ['error', {ignoreStrings: true, ignoreComments: true, ignoreRegExpLiterals: true}],
    semi: ['error', 'always'],
  },
};
