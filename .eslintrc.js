//eslint-disable-next-line no-undef
module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  ignorePatterns: [
    // break
    '**/node_modules/**',
    '**/dist/**',
  ],
  globals: { __dirname: true, process: true },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['prettier', '@typescript-eslint', 'import'],
  rules: {
    //eslint-disable-next-line no-undef
    'prettier/prettier': ['warn', require('./.prettierrc.js')],
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'comma-dangle': [
      'off',
      {
        arrays: 'ignore',
        objects: 'always',
        imports: 'never',
        exports: 'never',
        functions: 'ignore',
      },
    ],
    'import/order': [
      'warn',
      {
        alphabetize: { order: 'asc' },
        groups: [
          ['index', 'external', 'internal', 'builtin', 'object'],
          'parent',
          'sibling',
        ],
      },
    ],
  },
}
