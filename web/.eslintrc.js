module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'next',
    'next/core-web-vitals',
    'eslint:recommended',
    'plugin:react/recommended',
    'airbnb',
    'airbnb/hooks',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/jsx-filename-extension': 'off',
    'react/jsx-props-no-spreading': ['warn', {
      custom: 'ignore',
    }],
    'react/jsx-one-expression-per-line': 'off',
    // Required for Airbnb 9.0.0. Fix incoming: https://github.com/airbnb/javascript/pull/2501
    'react/function-component-definition': ['error', {
      namedComponents: 'arrow-function',
    }],
    'no-underscore-dangle': 'off', // Sanity IDs use this, e.g. doc._id
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
