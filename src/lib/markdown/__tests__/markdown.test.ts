import * as md from '../markdown';

describe('Text Elements', () => {
  it('should return a paragraph', () => {
    expect(md.paragraph('Hello World!')).toBe('Hello World!');
  });

  it('should return a code block', () => {
    expect(md.code('console.log("Hello World!")')).toBe(
      '`console.log("Hello World!")`'
    );
  });

  it('should return a bold text', () => {
    expect(md.bold('Hello World!')).toBe('**Hello World!**');
  });

  it('should return an italic text', () => {
    expect(md.italic('Hello World!')).toBe('_Hello World!_');
  });

  it('should return a strikethrough text', () => {
    expect(md.strikeThrough('Hello World!')).toBe('~~Hello World!~~');
  });

  it('should return a link', () => {
    expect(md.link('Google', 'https://google.com')).toBe(
      '[Google](https://google.com)'
    );
  });
});

describe('Headers', () => {
  it('should return a h1 header', () => {
    expect(md.h1('Hello World!')).toBe('# Hello World!');
  });

  it('should return a h2 header', () => {
    expect(md.h2('Hello World!')).toBe('## Hello World!');
  });

  it('should return a h3 header', () => {
    expect(md.h3('Hello World!')).toBe('### Hello World!');
  });

  it('should return a h4 header', () => {
    expect(md.h4('Hello World!')).toBe('#### Hello World!');
  });

  it('should return a h5 header', () => {
    expect(md.h5('Hello World!')).toBe('##### Hello World!');
  });

  it('should return a h6 header', () => {
    expect(md.h6('Hello World!')).toBe('###### Hello World!');
  });
});

describe('Lists', () => {
  it('should return an unordered list', () => {
    expect(md.ul(['Hello', 'World'])).toBe('- Hello\n- World');
  });

  it('should return an ordered list', () => {
    expect(md.ol(['Hello', 'World'])).toBe('1. Hello\n2. World');
  });
});

describe('Special Elements', () => {
  it('should return a blockquote', () => {
    expect(md.blockQuote('Hello World!')).toBe('> Hello World!');
  });

  it('should return a horizontal rule', () => {
    expect(md.thematicBreak()).toBe('---');
  });

  it('should return a code block', () => {
    expect(md.codeBlock('console.log("Hello World!")')).toBe(
      '```\nconsole.log("Hello World!")\n```'
    );
  });

  it('should return a code block with a language', () => {
    expect(md.codeBlock('console.log("Hello World!")', 'javascript')).toBe(
      '```javascript\nconsole.log("Hello World!")\n```'
    );
  });

  it('should return an image', () => {
    expect(md.image('Google', 'https://google.com')).toBe(
      '![Google](https://google.com)'
    );
  });

  it('should return a shortcode emoji', () => {
    expect(md.emoji('smile')).toBe('😄');
  });

  it('should return a unicode emoji', () => {
    expect(md.emoji('😀')).toBe('😀');
  });

  it('should return a GitHub only emoji', () => {
    expect(md.emoji('atom')).toBe(':atom:');
  });

  [
    { type: 'note', expected: 'NOTE' },
    { type: 'tip', expected: 'TIP' },
    { type: 'warning', expected: 'WARNING' },
    { type: 'danger', expected: 'DANGER' },
    { type: 'important', expected: 'IMPORTANT' }
  ].forEach(({ type, expected }) => {
    it(`should return a ${expected} alert`, () => {
      expect(md.alert('Hello World!', type)).toBe(
        `> [!${expected}]\n> Hello World!`
      );
    });
  });
});

describe('Tables', () => {
  it('should return a table', () => {
    expect(
      md.table([
        ['Name', 'Age'],
        ['John', '20'],
        ['Jane', '19']
      ])
    ).toBe(
      `
| Name | Age |
| ---- | --- |
| John | 20 |
| Jane | 19 |
`.trim()
    );
  });
});

describe('Utils', () => {
  it('should return a clean text', () => {
    expect(
      md.cleanText('_*~~Hello World~~**__! [Google](https://google.com) `code`')
    ).toEqual('Hello World Googlehttpsgooglecom code');
  });

  it('should return a empty string if no valid cleaned text', () => {
    expect(md.cleanText('_*~~')).toEqual('');
  });
});
