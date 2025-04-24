import * as codeBlock from '../code-block';
import supportedLanguages from '../data/supported-languages';
import { describe, it, expect } from 'vitest';

describe('codeBlock', () => {
  supportedLanguages.forEach((language) => {
    it(`should not throw an error for ${language}`, () => {
      expect(() => codeBlock.assertSupportedLanguage(language)).not.toThrow();
    });
  });

  it('should throw an error for an unsupported language', () => {
    expect(() => codeBlock.assertSupportedLanguage('german' as any)).toThrow();
  });
});
