module.exports = {
  'env': {
    'browser': true,
    'es2021': true,
    'node': true,
    'jest': true
  },
  'extends': [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:import/recommended',
    'plugin:react-hooks/recommended'
  ],
  'overrides': [
    {
      'env': {
        'node': true
      },
      'files': [
        '.eslintrc.{js,cjs}'
      ],
      'parserOptions': {
        'sourceType': 'script'
      }
    }
  ],
  'parser': '@typescript-eslint/parser',
  'parserOptions': {
    'ecmaVersion': 'latest',
    'ecmaFeatures': {
      'jsx': true
    },
    'sourceType': 'module'
  },
  'plugins': [
    'react',
    '@typescript-eslint'
  ],
  'settings': {
    'import/ignore': ['react-native'],
    'import/resolver': {
      'node': {
        'extensions': ['.js', '.jsx', '.ts', '.tsx']
      }
    }
  },
  'rules': {
    'semi': ['error', 'always'],
    'quotes': ['error', 'single'],
    'object-curly-spacing': ['error', 'always'],
    'array-bracket-spacing': ['error', 'never'],
    'keyword-spacing': ['error'],
    'space-before-blocks': ['error'],
    'comma-spacing': ['error', { 'after': true }],
    'jsx-quotes': ['error', 'prefer-double'],
    'indent': ['error', 2],
    'no-duplicate-imports': 'error',
    'no-multi-spaces': 'error',
    'no-console': 'error',
    'no-trailing-spaces': 'error',
    'no-multiple-empty-lines': ['error', { 'max': 1 }],
    'react/jsx-indent': ['error', 2],
    'react/jsx-indent-props': ['error', 2],
    'import/no-duplicates': 'error',
    'import/no-unresolved': [2],
    'react/prop-types': [0],
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'error'
  }
};
