import { describe , it, expect } from 'vitest';

import { TempoDoc, type TempoDocNode } from '../tempo-doc';

describe('initialization', () => {
  it('should prebuild nodes based off input', () => {
    const initJSON: TempoDocNode[] = [
      {
        type: 'heading',
        data: {
          level: 1,
          nodes: [
            {
              type: 'plaintext',
              data: undefined,
              computed: 'Hello World!',
            },
          ],
        },
        computed: '# Hello World!',
      },
      {
        type: 'paragraph',
        data: {
          nodes: [
            {
              type: 'plaintext',
              data: undefined,
              computed: 'Hello World!',
            },
          ],
        },
        computed: 'Hello World!',
      },
    ];
    const document = new TempoDoc(initJSON);
    expect(document.toJSON()).toEqual(initJSON);
  });

  it('should return empty nodes if no input', () => {
    const document = new TempoDoc();
    expect(document.toJSON()).toEqual([]);
  });
});

describe('Headings', () => {
  const getResult = (level: number, text: string) => {
    return [
      {
        type: 'heading',
        data: {
          level,
          nodes: [
            {
              type: 'plaintext',
              data: undefined,
              computed: text,
            },
          ],
        },
        computed: `#`.repeat(level).concat(' ', text),
      },
    ];
  };

  it('should add a h1 heading', () => {
    const document = new TempoDoc().h1('Hello World!');
    expect(document.toJSON()).toEqual(getResult(1, 'Hello World!'));
  });

  it('should add a h2 heading', () => {
    const document = new TempoDoc().h2('Hello World!');
    expect(document.toJSON()).toEqual(getResult(2, 'Hello World!'));
  });

  it('should add a h3 heading', () => {
    const document = new TempoDoc().h3('Hello World!');
    expect(document.toJSON()).toEqual(getResult(3, 'Hello World!'));
  });

  it('should add a h4 heading', () => {
    const document = new TempoDoc().h4('Hello World!');
    expect(document.toJSON()).toEqual(getResult(4, 'Hello World!'));
  });

  it('should add a h5 heading', () => {
    const document = new TempoDoc().h5('Hello World!');
    expect(document.toJSON()).toEqual(getResult(5, 'Hello World!'));
  });

  it('should add a h6 heading', () => {
    const document = new TempoDoc().h6('Hello World!');
    expect(document.toJSON()).toEqual(getResult(6, 'Hello World!'));
  });
});

describe('Text Elements', () => {
  it('should add a paragraph', () => {
    const document = new TempoDoc().paragraph('Hello World!');
    expect(document.toJSON()).toEqual([
      {
        type: 'paragraph',
        data: {
          nodes: [
            {
              type: 'plaintext',
              data: undefined,
              computed: 'Hello World!',
            },
          ],
        },
        computed: 'Hello World!',
      },
    ]);
  });
});

describe('Special Elements', () => {
  it('should add a table', () => {
    const document = new TempoDoc().table({
      header: ['Hello World!', 'Hello 2 World!'],
      rows: [
        ['Hello 3 World!', 'Hello 4 World!'],
      ]
    });
    expect(document.toJSON()).toEqual([
      {
        type: 'table',
        data: {
          nodes: [
            {
              type: 'header',
              order: undefined,
              data: {
                nodes: [
                  [
                    {
                      type: 'plaintext',
                      data: undefined,
                      computed: 'Hello World!',
                    },
                  ],
                  [
                    {
                      type: 'plaintext',
                      data: undefined,
                      computed: 'Hello 2 World!',
                    },
                  ],
                ],
              },
              computed: [
                '| Hello World! | Hello 2 World! |',
                '| ------------ | -------------- |',
              ].join('\n'),
            },
            {
              type: 'row',
              order: 0,
              data: {
                nodes: [
                  [
                    {
                      type: 'plaintext',
                      data: undefined,
                      computed: 'Hello 3 World!',
                    },
                  ],
                  [
                    {
                      type: 'plaintext',
                      data: undefined,
                      computed: 'Hello 4 World!',
                    },
                  ],
                ],
              },
              computed: '| Hello 3 World! | Hello 4 World! |',
            },
          ],
        },
        computed: [
          '| Hello World! | Hello 2 World! |',
          '| ------------ | -------------- |',
          '| Hello 3 World! | Hello 4 World! |',
        ].join('\n'),
      },
    ]);
  });

  it('should add html', () => {
    const document = new TempoDoc().html('<div>Hello World!</div>');
    expect(document.toJSON()).toEqual([
      {
        type: 'html',
        data: {
          nodes: [
            {
              type: 'plaintext',
              data: undefined,
              computed: '<div>Hello World!</div>',
            },
          ],
        },
        computed: '<div>Hello World!</div>',
      },
    ]);
  });

  it('should add a code-block', () => {
    const document = new TempoDoc().codeBlock(
      'console.log("Hello World!");',
      'javascript'
    );
    expect(document.toJSON()).toEqual([
      {
        type: 'code-block',
        data: {
          language: 'javascript',
          code: 'console.log("Hello World!");',
          nodes: [
            {
              type: 'plaintext',
              data: undefined,
              computed: 'console.log("Hello World!");',
            },
          ],
        },
        computed: ['```javascript', 'console.log("Hello World!");', '```'].join(
          '\n'
        ),
      },
    ]);
  });

  it('should add a blockquote', () => {
    const document = new TempoDoc().blockQuote('Hello World!');
    expect(document.toJSON()).toEqual([
      {
        type: 'blockquote',
        data: {
          nodes: [
            {
              type: 'plaintext',
              data: undefined,
              computed: 'Hello World!',
            },
          ],
        },
        computed: '> Hello World!',
      },
    ]);
  });

  it('should add an image', () => {
    const document = new TempoDoc().image({
      alt: 'example',
      src: 'https://example.com/image.png',
    });

    expect(document.toJSON()).toEqual([
      {
        type: 'image',
        data: {
          src: 'https://example.com/image.png',
          nodes: [{
            type: 'plaintext',
            data: undefined,
            computed: 'example',
          }],
        },
        computed: '![example](https://example.com/image.png)',
      },
    ]);
  });

  it('should add an image with a link', () => {
    const document = new TempoDoc().image({
      alt: 'example',
      src: 'https://example.com/image.png',
      href: 'https://example.com',
    });

    expect(document.toJSON()).toEqual([
      {
        type: 'image',
        data: {
          src: 'https://example.com/image.png',
          nodes: [{
            type: 'plaintext',
            data: undefined,
            computed: 'example',
          }],
        },
        computed: '[![example](https://example.com/image.png)](https://example.com)',
      },
    ]);
  });

  it('should add a horizontal rule (break)', () => {
    const document = new TempoDoc().break();
    expect(document.toJSON()).toEqual([
      {
        type: 'break',
        data: {
          nodes: [],
        },
        computed: '---',
      },
    ]);
  });

  it ('should proxy hr to break', () => {
    const document = new TempoDoc().hr();
    expect(document.toJSON()).toEqual([
      {
        type: 'break',
        data: {
          nodes: [],
        },
        computed: '---',
      },
    ]);
  });


  (
    [
      { severity: 'note', expected: 'NOTE' },
      { severity: undefined, expected: 'NOTE' },
      { severity: 'tip', expected: 'TIP' },
      { severity: 'warning', expected: 'WARNING' },
      { severity: 'caution', expected: 'CAUTION' },
      { severity: 'important', expected: 'IMPORTANT' },
    ] as const
  ).forEach(({ severity, expected }) => {
    it(`should return a ${expected} alert`, () => {
      const document = new TempoDoc().alert('Hello World!', severity);
      expect(document.toJSON()).toEqual([
        {
          type: 'alert',
          data: {
            severity: severity === undefined ? 'note' : severity,
            nodes: [
              {
                type: 'plaintext',
                data: undefined,
                computed: 'Hello World!',
              },
            ],
          },
          computed: `> [!${expected}]\n> Hello World!`,
        },
      ]);
    });
  });
});

describe('Lists', () => {
  it('should add an bullet (unordered) list', () => {
    const document = new TempoDoc().bulletList([
      'Hello World!',
      'Hello 2 World!',
      (txt) => txt.bold('Hello 3 World!'),
    ]);
    expect(document.toJSON()).toEqual([
      {
        type: 'list-bullet',
        data: {
          nodes: [
            {
              type: 'list-item',
              order: undefined,
              data: {
                nodes: [
                  {
                    type: 'plaintext',
                    data: undefined,
                    computed: 'Hello World!',
                  },
                ],
              },
              computed: '- Hello World!',
            },
            {
              type: 'list-item',
              order: undefined,
              data: {
                nodes: [
                  {
                    type: 'plaintext',
                    data: undefined,
                    computed: 'Hello 2 World!',
                  },
                ],
              },
              computed: '- Hello 2 World!',
            },
            {
              type: 'list-item',
              order: undefined,
              data: {
                nodes: [
                  {
                    type: 'bold',
                    data: {
                      nodes: [
                        {
                          type: 'plaintext',
                          data: undefined,
                          computed: 'Hello 3 World!',
                        },
                      ],
                    },
                    computed: '**Hello 3 World!**',
                  },
                ],
              },
              computed: '- **Hello 3 World!**',
            },
          ],
        },
        computed: '- Hello World!\n- Hello 2 World!\n- **Hello 3 World!**',
      },
    ]);
  });

  it('should add an number (ordered) list', () => {
    const document = new TempoDoc().numberList([
      'Hello World!',
      'Hello 2 World!',
    ]);
    expect(document.toJSON()).toEqual([
      {
        type: 'list-number',
        data: {
          nodes: [
            {
              type: 'list-item',
              order: 0,
              data: {
                nodes: [
                  {
                    type: 'plaintext',
                    data: undefined,
                    computed: 'Hello World!',
                  },
                ],
              },
              computed: '1. Hello World!',
            },
            {
              type: 'list-item',
              order: 1,
              data: {
                nodes: [
                  {
                    type: 'plaintext',
                    data: undefined,
                    computed: 'Hello 2 World!',
                  },
                ],
              },
              computed: '2. Hello 2 World!',
            },
          ],
        },
        computed: '1. Hello World!\n2. Hello 2 World!',
      },
    ]);
  });
});

describe('Outputs', () => {
  describe('toString', () => {
    it('should return a string', () => {
      const document = new TempoDoc()
        .h1('Hello World!')
        .paragraph('Hello there!');
      expect(document.toString()).toEqual(
        `
# Hello World!

Hello there!
      `
          .trim()
          .concat('\n')
      );
    });
  });

  describe('toJSON', () => {
    const document = new TempoDoc()
      .h1('Hello World!')
      .paragraph('Hello there!');
    it('should return a JSON object', () => {
      expect(document.toJSON()).toEqual([
        {
          type: 'heading',
          data: {
            level: 1,
            nodes: [
              {
                type: 'plaintext',
                data: undefined,
                computed: 'Hello World!',
              },
            ],
          },
          computed: '# Hello World!',
        },
        {
          type: 'paragraph',
          data: {
            nodes: [
              {
                type: 'plaintext',
                data: undefined,
                computed: 'Hello there!',
              },
            ],
          },
          computed: 'Hello there!',
        },
      ]);
    });
  });
});
