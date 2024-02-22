import * as cb from './codeBlock';
import * as emo from './emoji';
import supportedEmojis from './data/emojis';

/*
|==========================================================================
| markdown
|==========================================================================
|
| A collection of functions to generate markdown strings.
|
*/

export * from './codeBlock';
export * from './emoji';

/*
|------------------
| Text Elements
|------------------
*/

export function paragraph(value: string) {
  return value;
}

export function code(value: string) {
  return `\`${value}\``;
}

export function bold(value: string) {
  return `**${value}**`;
}

export function italic(value: string) {
  return `_${value}_`;
}

export function strikeThrough(value: string) {
  return `~~${value}~~`;
}

export function link(value: string, href: string) {
  return `[${value}](${href})`;
}

/*
|------------------
| Headers
|------------------
*/

export function h1(value: string) {
  return `# ${value}`;
}

export function h2(value: string) {
  return `## ${value}`;
}

export function h3(value: string) {
  return `### ${value}`;
}

export function h4(value: string) {
  return `#### ${value}`;
}

export function h5(value: string) {
  return `##### ${value}`;
}

export function h6(value: string) {
  return `###### ${value}`;
}

/*
|------------------
| Special Elements
|------------------
*/

export function thematicBreak() {
  return '---';
}

export function blockQuote(value: string) {
  return `> ${value}`;
}

export function image(value: string, src: string) {
  return `![${value}](${src})`;
}

export function codeBlock(value: string, language?: cb.SupportedLanguage) {
  if (language) {
    cb.assertSupportedLanguage(language);
  }
  return `\`\`\`${language || ''}\n${value}\n\`\`\``;
}

export function emoji(value: emo.EmojiAlias | emo.EmojiUnicode): string {
  emo.assertSupportedEmoji(value);
  if (emo.isSupportedAlias(value)) {
    const foundEmojiDefinition = supportedEmojis.find(({ aliases }) =>
      aliases.some((alias) => alias === value)
    ) as unknown as (typeof supportedEmojis[number]);

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

export function li(value: string, order?: number) {
  return order === undefined ? `- ${value}` : `${order + 1}. ${value}`;
}

export function ul(value: string[]) {
  return value.map(txt => li(txt)).join('\n');
}

export function ol(value: string[]) {
  return value.map(li).join('\n');
}

/*
|------------------
| Tables
|------------------
*/

export function tableHeader(value: string[]) {
  return [
    `| ${value.join(' | ')} |`,
    `| ${value.map(headerItem => '-'.repeat(headerItem.length)).join(' | ')} |`
  ].join('\n');
}

export function tableRow(value: string[]) {
  return `| ${value.join(' | ')} |`;
}

export function table(value: string[][]) {
  const [header, ...rows] = value;
  return [tableHeader(header), ...rows.map(row => tableRow(row))].join('\n');
}
