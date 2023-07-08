/*
|------------------
| Text Elements
|------------------
*/

export function code(value: string) {
  return `\`${value}\``;
}

export function bold(value: string) {
  return `**${value}**`;
}

export function italic(value: string) {
  return `*${value}*`;
}

export function strikeThrough(value: string) {
  return `~~${value}~~`;
}

export function underLine(value: string) {
  return `__${value}__`;
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

export function hr() {
  return `---`;
}

export function blockQuote(value: string) {
  return `> ${value}`;
}

export function image(value: string, src: string) {
  return `![${value}](${src})`;
}

export function codeBlock(value: string, language?: string) {
  return `\`\`\`${language || ''}\n${value}\n\`\`\``;
}

/*
|------------------
| Lists
|------------------
*/

export function ul(value: string[]) {
  return value.map((item) => `- ${item}`).join('\n');
}

export function ol(value: string[]) {
  return value.map((item, index) => `${index + 1}. ${item}`).join('\n');
}

/*
|------------------
| Tables
|------------------
*/

function tableHeader(value: string[]) {
  return [
    `| ${value.join(' | ')} |`,
    `| ${value.map((headerItem) => '-'.repeat(headerItem.length)).join(' | ')} |`
  ].join('\n');
}

function tableRow(value: string[]) {
  return `| ${value.join(' | ')} |`;
}

export function table(value: string[][]) {
  const [header, ...rows] = value;
  return [
    tableHeader(header),
    ...rows.map((row) => tableRow(row))
  ].join('\n');
}
