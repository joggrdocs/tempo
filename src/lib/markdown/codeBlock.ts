/*
|==========================================================================
| codeBlock
|==========================================================================
*/

/**
 * Supported languages by GitHub Linguist
 *
 * @link https://github.com/github-linguist/linguist/blob/master/lib/linguist/languages.yml
 */
export const supportedLanguages = [
  'actionscript3',
  'apache',
  'applescript',
  'asp',
  'brainfuck',
  'c',
  'cfm',
  'clojure',
  'cmake',
  'coffee-script',
  'coffeescript',
  'coffee',
  'cpp',
  'cs',
  'csharp',
  'css',
  'csv',
  'bash',
  'diff',
  'elixir',
  'erb',
  'go',
  'haml',
  'html',
  'http',
  'java',
  'javascript',
  'json',
  'jsx',
  'less',
  'lolcode',
  'make',
  'markdown',
  'matlab',
  'nginx',
  'objectivec',
  'pascal',
  'PHP',
  'Perl',
  'python',
  'profile',
  'rust',
  'salt',
  'shell',
  'sh',
  'zsh',
  'scss',
  'sql',
  'svg',
  'swift',
  'typescript',
  'tsx',
  'rb',
  'jruby',
  'ruby',
  'smalltalk',
  'vim',
  'viml',
  'volt',
  'vhdl',
  'vue',
  'xml',
  'yaml'
] as const;
export type SupportedLanguage = (typeof supportedLanguages)[number];

/**
 * @throws if the string is not a valid (supported) language by GitHub-Linguist which is used to provide
 *  syntax highlighting for GitHub markdown files.
 */
export function assertSupportedLanguage(language: SupportedLanguage) {
  if (!supportedLanguages.includes(language)) {
    throw new Error(
      `Invalid language of ${language} passed to a code block, please use one of the supported languages. To see supported languages view this file: https://github.com/github-linguist/linguist/blob/master/lib/linguist/languages.yml`
    );
  }
}
