import { describe, expect, it } from 'vitest';

import supportedEmojis from '../../../@generated/emojis';
import { assertEmoji } from '../emoji';

describe('codeBlock', () => {
  for (const emoji of supportedEmojis) {
      describe(`:${emoji.aliases[0]}:`, () => {
      emoji.aliases.forEach((alias) => {
        it(`should not throw an error for ":${alias}:"`, () => {
          expect(() =>assertEmoji(alias)).not.toThrow();
        });
      });

      if (emoji.unicode !== false) {
        it(`should not throw an error for ${emoji.unicode}`, () => {
          expect(() => assertEmoji(emoji.unicode)).not.toThrow();
        });
      }
    });
  }

  it('should throw an error for an unsupported emoji', () => {
    expect(() => assertEmoji(':--)' as any)).toThrow();
  });
});
