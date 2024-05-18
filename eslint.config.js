const { FlatCompat } = require('@eslint/eslintrc');
const js = require('@eslint/js');

/** @type {import('eslint').Linter.Config} */
const config = {
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
  ],
  ignorePatterns: [
    'node_modules/',
    'dist/',
    'build/',
    'coverage/',
    'eslint.config.js',
    'vite.config.mts',
    'jest.config.ts'
  ]
};

const compat = new FlatCompat({
  recommendedConfig: js.configs.recommended
});
module.exports = [...compat.config(config)];
