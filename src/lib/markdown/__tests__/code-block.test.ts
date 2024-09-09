import { describe, expect, it } from 'vitest';

import supportedLanguages from '../../../@generated/languages';
import { assertCodeBlockLanguage } from '../code-block';

describe('codeBlock', () => {
  for (const language of supportedLanguages) {
      it(`should not throw an error for a supported language: ${language}`, () => {
          expect(() => assertCodeBlockLanguage(language)).not.toThrow();
      });
  }

  it('should throw an error for an unsupported language', () => {
    expect(() => assertCodeBlockLanguage('german' as any)).toThrow();
  });
});
