import * as cb from './code-block';
import supportedEmojis from './data/emojis';
import * as emo from './emoji';

/*
|==========================================================================
| markdown
|==========================================================================
|
| A collection of functions to generate markdown strings.
|
*/

export * from './code-block';
export * from './emoji';

/*
|------------------
| Text Elements
|------------------
*/

export function paragraph(value: string): string {
  return value;
}

export function code(value: string): string {
  return `\`${value}\``;
}

export function bold(value: string): string {
  return `**${value}**`;
}

export function italic(value: string): string {
  return `_${value}_`;
}

export function strikeThrough(value: string): string {
  return `~~${value}~~`;
}

export function link(value: string, href: string): string {
  return `[${value}](${href})`;
}

/*
|------------------
| Headers
|------------------
*/

export function h1(value: string): string {
  return `# ${value}`;
}

export function h2(value: string): string {
  return `## ${value}`;
}

export function h3(value: string): string {
  return `### ${value}`;
}

export function h4(value: string): string {
  return `#### ${value}`;
}

export function h5(value: string): string {
  return `##### ${value}`;
}

export function h6(value: string): string {
  return `###### ${value}`;
}

/*
|------------------
| Special Elements
|------------------
*/

export function thematicBreak(): string {
  return '---';
}

export function blockQuote(value: string): string {
  return `> ${value}`;
}

export function image(value: string, src: string): string {
  return `![${value}](${src})`;
}

export function codeBlock(
  value: string,
  language?: cb.SupportedLanguage
): string {
  if (language !== undefined) {
    cb.assertSupportedLanguage(language);
  }
  return `\`\`\`${language ?? ''}\n${value}\n\`\`\``;
}

export function emoji(value: emo.EmojiAlias | emo.EmojiUnicode): string {
  emo.assertSupportedEmoji(value);
  if (emo.isSupportedAlias(value)) {
    const foundEmojiDefinition = supportedEmojis.find(({ aliases }) =>
      aliases.some(alias => alias === value)
    ) as unknown as (typeof supportedEmojis)[number];

    if (foundEmojiDefinition.unicode === false) {
      return `:${value}:`;
    } else {
      return foundEmojiDefinition.unicode;
    }
  } else {
    return value;
  }
}

/*
|------------------
| Lists
|------------------
*/

export function li(value: string, order?: number): string {
  return order === undefined ? `- ${value}` : `${order + 1}. ${value}`;
}

export function ul(value: string[]): string {
  return value.map(txt => li(txt)).join('\n');
}

export function ol(value: string[]): string {
  return value.map(li).join('\n');
}

/*
|------------------
| Tables
|------------------
*/

export function tableHeader(value: string[]): string {
  return [
    `| ${value.join(' | ')} |`,
    `| ${value.map(headerItem => '-'.repeat(headerItem.length)).join(' | ')} |`
  ].join('\n');
}

export function tableRow(value: string[]): string {
  return `| ${value.join(' | ')} |`;
}

export function table(value: string[][]): string {
  const [header, ...rows] = value;
  return [tableHeader(header), ...rows.map(row => tableRow(row))].join('\n');
}
