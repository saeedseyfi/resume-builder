module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'import', 'sort-keys-fix'],
  extends: [
    'next',
    'next/core-web-vitals',
    'prettier',
    'eslint:recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:@typescript-eslint/recommended',
  ],
  rules: {
    '@typescript-eslint/no-unused-vars': ['error'],
    'comma-dangle': [
      'error',
      {
        arrays: 'only-multiline',
        exports: 'only-multiline',
        functions: 'never',
        imports: 'only-multiline',
        objects: 'only-multiline',
      },
    ],
    'import/newline-after-import': ['error', { count: 1 }],
    'import/no-cycle': ['error'],
    'import/no-useless-path-segments': [
      'error',
      {
        noUselessIndex: true,
      },
    ],
    'no-restricted-imports': [
      'error',
      {
        patterns: [
          {
            group: ['../*'],
            message: 'Usage of relative parent imports is not allowed.',
          },
        ],
      },
    ],
    'no-else-return': [
      'error',
      {
        allowElseIf: false,
      },
    ],
    'no-unused-vars': 'off',
    'no-warning-comments': [
      'error',
      {
        location: 'start',
        terms: ['fixme'],
      },
    ],
    'prefer-template': 'error',
    'react/jsx-no-bind': [
      'error',
      {
        allowArrowFunctions: false,
        allowBind: false,
        allowFunctions: false,
        ignoreDOMComponents: true,
        ignoreRefs: false,
      },
    ],
    'react/jsx-sort-props': [
      'error',
      {
        callbacksLast: true,
        ignoreCase: false,
        noSortAlphabetically: false,
        reservedFirst: true,
        shorthandFirst: false,
        shorthandLast: true,
      },
    ],
    'sort-imports': [
      'error',
      {
        allowSeparatedGroups: true,
        ignoreCase: false,
        ignoreDeclarationSort: false,
        ignoreMemberSort: false,
        memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
      },
    ],
    'sort-keys': [
      'error',
      'asc',
      {
        caseSensitive: true,
        minKeys: 2,
        natural: false,
      },
    ],
    'sort-keys-fix/sort-keys-fix': 'warn',
    'object-shorthand': ['error', 'always'],
  },
  overrides: [
    {
      files: ['**/*.js'],
      rules: {
        '@typescript-eslint/no-var-requires': 'off',
      },
    },
  ],
};
