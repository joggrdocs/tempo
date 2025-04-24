import supportedEmojis from '../data/emojis';
import * as emoji from '../emoji';
import { describe, it, expect } from 'vitest';

describe('codeBlock', () => {
  supportedEmojis.forEach((emo) => {
    describe(`:${emo.aliases[0]}:`, () => {
      emo.aliases.forEach((alias) => {
        it(`should not throw an error for ":${alias}:"`, () => {
          expect(() => emoji.assertSupportedEmoji(alias)).not.toThrow();
        });
      });

      if (emo.unicode !== false) {
        it(`should not throw an error for ${emo.unicode}`, () => {
          expect(() => emoji.assertSupportedEmoji(emo.unicode)).not.toThrow();
        });
      }
    });
  });

  it('should throw an error for an unsupported emoji', () => {
    expect(() => emoji.assertSupportedEmoji(':--)' as any)).toThrow();
  });
});
