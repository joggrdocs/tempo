import * as emoji from '../emoji';

describe('codeBlock', () => {
  emoji.supportedEmojis.forEach(emo => {
    it(`should not throw an error for ${emo.alias}`, () => {
      expect(() => emoji.assertSupportedEmoji(emo.alias)).not.toThrow();
    });

    if (emo.unicode !== false) {
      it(`should not throw an error for ${emo.unicode}`, () => {
        expect(() => emoji.assertSupportedEmoji(emo.unicode)).not.toThrow();
      });
    }
  });

  it('should throw an error for an unsupported emoji', () => {
    expect(() => emoji.assertSupportedEmoji(':--)' as any)).toThrow();
  });
});
