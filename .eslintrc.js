// module.exports = {
//   root: true,
//   parser: '@typescript-eslint/parser',
//   plugins: ['@typescript-eslint'],
//   extends: [
//     'eslint:recommended',
//     'plugin:@typescript-eslint/eslint-recommended',
//     'plugin:@typescript-eslint/recommended',
//     'eslint-config-semistandard'
//   ],
//   ignorePatterns: ['src/**/__tests__/'],
//   rules: {
//     '@typescript-eslint/no-unused-vars': 0,
//     'space-before-function-paren': 0
//   }
// };

module.exports = {
  root: true,
  extends: ['@joggr/eslint-config'],
  overrides: [
    {
      files: [
        'TempoText.ts',
        'TempoDocument.ts',
        'TempoDocument.test.ts',
        'TempoText.test.ts'
      ],
      rules: {
        'filenames-simple/naming-convention': ['error', { rule: 'PascalCase' }]
      }
    }
  ]
};
