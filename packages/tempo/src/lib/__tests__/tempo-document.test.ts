import { describe , it, expect, beforeEach } from 'vitest';

import { TempoDocument, type TempoDocumentNode } from '../tempo-document';

describe('initialization', () => {
  it('should prebuild nodes based off input', () => {
    const initJSON: TempoDocumentNode[] = [
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
    const document = new TempoDocument(initJSON);
    expect(document.toJSON().nodes).toEqual(initJSON);
  });

  it('should return empty nodes if no input', () => {
    const document = new TempoDocument();
    expect(document.toJSON().nodes).toEqual([]);
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
    const document = new TempoDocument().h1('Hello World!');
    expect(document.toJSON().nodes).toEqual(getResult(1, 'Hello World!'));
  });

  it('should add a h2 heading', () => {
    const document = new TempoDocument().h2('Hello World!');
    expect(document.toJSON().nodes).toEqual(getResult(2, 'Hello World!'));
  });

  it('should add a h3 heading', () => {
    const document = new TempoDocument().h3('Hello World!');
    expect(document.toJSON().nodes).toEqual(getResult(3, 'Hello World!'));
  });

  it('should add a h4 heading', () => {
    const document = new TempoDocument().h4('Hello World!');
    expect(document.toJSON().nodes).toEqual(getResult(4, 'Hello World!'));
  });

  it('should add a h5 heading', () => {
    const document = new TempoDocument().h5('Hello World!');
    expect(document.toJSON().nodes).toEqual(getResult(5, 'Hello World!'));
  });

  it('should add a h6 heading', () => {
    const document = new TempoDocument().h6('Hello World!');
    expect(document.toJSON().nodes).toEqual(getResult(6, 'Hello World!'));
  });
});

describe('Text Elements', () => {
  it('should add a paragraph', () => {
    const document = new TempoDocument().paragraph('Hello World!');
    expect(document.toJSON().nodes).toEqual([
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
    const document = new TempoDocument().table([
      ['Hello World!', 'Hello 2 World!'],
      ['Hello 3 World!', 'Hello 4 World!'],
    ]);
    expect(document.toJSON().nodes).toEqual([
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
    const document = new TempoDocument().html('<div>Hello World!</div>');
    expect(document.toJSON().nodes).toEqual([
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

  it('should add a codeBlock', () => {
    const document = new TempoDocument().codeBlock(
      'console.log("Hello World!");',
      'javascript'
    );
    expect(document.toJSON().nodes).toEqual([
      {
        type: 'codeBlock',
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
    const document = new TempoDocument().blockQuote('Hello World!');
    expect(document.toJSON().nodes).toEqual([
      {
        type: 'blockQuote',
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
    const document = new TempoDocument().image(
      'example',
      'https://example.com/image.png'
    );

    expect(document.toJSON().nodes).toEqual([
      {
        type: 'image',
        data: {
          alt: 'example',
          src: 'https://example.com/image.png',
          nodes: [],
        },
        computed: '![example](https://example.com/image.png)',
      },
    ]);
  });

  it('should add a horizontal rule (break)', () => {
    const document = new TempoDocument().break();
    expect(document.toJSON().nodes).toEqual([
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
      { type: 'note', expected: 'NOTE' },
      { type: undefined, expected: 'NOTE' },
      { type: 'tip', expected: 'TIP' },
      { type: 'warning', expected: 'WARNING' },
      { type: 'caution', expected: 'CAUTION' },
      { type: 'important', expected: 'IMPORTANT' },
    ] as const
  ).forEach(({ type, expected }) => {
    it(`should return a ${expected} alert`, () => {
      const document = new TempoDocument().alert('Hello World!', type);
      expect(document.toJSON().nodes).toEqual([
        {
          type: 'alert',
          data: {
            type: type === undefined ? 'note' : type,
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
    const document = new TempoDocument().bulletList([
      'Hello World!',
      'Hello 2 World!',
      (txt) => txt.bold('Hello 3 World!'),
    ]);
    expect(document.toJSON().nodes).toEqual([
      {
        type: 'bulletList',
        data: {
          nodes: [
            {
              type: 'listItem',
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
              type: 'listItem',
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
              type: 'listItem',
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
    const document = new TempoDocument().numberList([
      'Hello World!',
      'Hello 2 World!',
    ]);
    expect(document.toJSON().nodes).toEqual([
      {
        type: 'numberList',
        data: {
          nodes: [
            {
              type: 'listItem',
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
              type: 'listItem',
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
    let doc;

    beforeEach(() => {
      doc = new TempoDocument()
        .h1('Hello World!')
        .paragraph('Hello there!');
    });

    it('should return a string without frontmatter', () => {
      expect(doc.toString()).toEqual(
        `
# Hello World!

Hello there!
      `
          .trim()
          .concat('\n')
      );
    });

    it('should return a string with frontmatter', () => {
      doc.frontmatter({
        title: 'Hello World!',
        foobar: 'Hello there!',
      });
      expect(doc.toString()).toEqual(
        `
---
title: Hello World!
foobar: Hello there!
---
# Hello World!

Hello there!
      `
          .trim()
          .concat('\n')
      );
    });
  });

  describe('toJSON', () => {
    let doc;

    beforeEach(() => {
      doc = new TempoDocument()
        .h1('Hello World!')
        .paragraph('Hello there!');
    });

    it('should return a JSON object with metadata', () => {
      doc.frontmatter({
        title: 'Hello World!',
        foobar: 'Hello there!',
      });
      expect(doc.toJSON()).toEqual({
        metadata: {
          title: 'Hello World!',
          foobar: 'Hello there!',
        },
        nodes: [
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
      ]
      });
    });

    it('should return a JSON object without metadata', () => {
      expect(doc.toJSON()).toEqual({
        metadata: null,
        nodes: [
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
      ]
      });
    });
  });
});
