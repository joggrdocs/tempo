import supportedEmojis from './data/emojis';

/*
|==========================================================================
| emoji
|==========================================================================
*/

/**
 * List of Aliases for emojis, primarily for use with colons, i.e. `:smile:`
 */
export type EmojiAliases = (typeof supportedEmojis)[number]['aliases'];

/**
 * The Alias for an emoji, primarily for use with colons, i.e. `:smile:`
 */
export type EmojiAlias = EmojiAliases[number];

/**
 * The unicode value for emojis
 */
export type EmojiUnicode = Exclude<
  (typeof supportedEmojis)[number]['unicode'],
  boolean
>;

/**
 * @param emoji A unicode emoji
 * @returns indicates whether the given emoji is a supported unicode emoji
 */
export function isSupportedUnicode(
  emoji: EmojiAlias | EmojiUnicode
): emoji is EmojiUnicode {
  return supportedEmojis.some(({ unicode }) => unicode === emoji);
}

/**
 * @param emoji An alias for an emoji (without the colons)
 * @returns indicates whether the given emoji is an alias for a supported emoji
 */
export function isSupportedAlias(
  emoji: EmojiAlias | EmojiUnicode
): emoji is EmojiAlias {
  return supportedEmojis.some(supportedEmoji => {
    return supportedEmoji.aliases.some(alias => alias === emoji);
  });
}

/**
 * Assert that the given emoji is a supported emoji
 *
 * @throws if the given emoji is not valid
 */
export function assertSupportedEmoji(
  emoji: EmojiAlias | EmojiUnicode
): asserts emoji is EmojiAlias | EmojiUnicode {
  if (
    !isSupportedAlias(emoji as EmojiAlias) &&
    !isSupportedUnicode(emoji as EmojiUnicode)
  ) {
    throw new Error(`Invalid emoji: ${emoji}`);
  }
}
