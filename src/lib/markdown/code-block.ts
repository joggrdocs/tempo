import supportedLanguages from './data/supported-languages';

/*
|==========================================================================
| codeBlock
|==========================================================================
*/

/**
 * A language supported by GitHub Linguist
 *
 * @link https://github.com/github-linguist/linguist/blob/master/lib/linguist/languages.yml
 */
export type SupportedLanguage = (typeof supportedLanguages)[number];

/**
 * Assert that a language is supported by the codeblock.
 *
 * @throws if the string is not a valid (supported) language by GitHub-Linguist which is used to provide syntax highlighting for GitHub markdown files.
 */
export function assertSupportedLanguage(language: SupportedLanguage): void {
  if (!supportedLanguages.includes(language)) {
    throw new Error(
      `Invalid language of ${language} passed to a code block, please use one of the supported languages. To see supported languages view this file: https://github.com/github-linguist/linguist/blob/master/lib/linguist/languages.yml`
    );
  }
}
