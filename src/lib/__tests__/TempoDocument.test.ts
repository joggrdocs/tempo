import {
  computeNodes,
  computeText,
  TempoDocument,
  TempoDocumentNode
} from '../TempoDocument';
import { TempoText } from '../TempoText';

describe('initialization', () => {
  it('should prebuild nodes based off input', () => {
    const initJSON: TempoDocumentNode[] = [
      {
        type: 'heading',
        data: {
          level: 1,
          data: [
            {
              type: 'plaintext',
              data: 'Hello World!',
              computed: 'Hello World!'
            }
          ]
        },
        computed: '# Hello World!'
      },
      {
        type: 'paragraph',
        data: [
          {
            type: 'plaintext',
            data: 'Hello World!',
            computed: 'Hello World!'
          }
        ],
        computed: 'Hello World!'
      }
    ];
    const document = new TempoDocument(initJSON);
    expect(document.toJSON()).toEqual(initJSON);
  });

  it('should return empty nodes if no input', () => {
    const document = new TempoDocument();
    expect(document.toJSON()).toEqual([]);
  });
});

describe('computeText', () => {
  it('should compute text from `string`', () => {
    expect(computeText('Hello World!')).toEqual('Hello World!');
  });

  it('should compute text from `Text`', () => {
    expect(computeText(new TempoText().plainText('Hello World!'))).toEqual(
      'Hello World!'
    );
  });

  it('should compute text from `(Text) => Text | string`', () => {
    expect(computeText(text => text.plainText('Hello World!'))).toEqual(
      'Hello World!'
    );
  });

  it('should throw for invalid text type', () => {
    expect(() => {
      computeText(1 as any);
    }).toThrow('Invalid text type');
  });
});

describe('computeNodes', () => {
  it('should compute nodes from `string`', () => {
    expect(computeNodes('Hello World!')).toEqual([
      {
        type: 'plaintext',
        data: 'Hello World!',
        computed: 'Hello World!'
      }
    ]);
  });

  it('should compute nodes from `Text`', () => {
    expect(computeNodes(new TempoText().plainText('Hello World!'))).toEqual([
      {
        type: 'plaintext',
        data: 'Hello World!',
        computed: 'Hello World!'
      }
    ]);
  });

  it('should compute nodes from `(Text) => Text | string`', () => {
    expect(computeNodes(text => text.plainText('Hello World!'))).toEqual([
      {
        type: 'plaintext',
        data: 'Hello World!',
        computed: 'Hello World!'
      }
    ]);
  });

  it('should throw for invalid text type', () => {
    expect(() => {
      computeNodes(1 as any);
    }).toThrow('Invalid text type');
  });
});

describe('Headings', () => {
  const getResult = (level: number, text: string) => {
    return [
      {
        type: 'heading',
        data: {
          level,
          data: [
            {
              type: 'plaintext',
              data: text,
              computed: text
            }
          ]
        },
        computed: `#`.repeat(level).concat(' ', text)
      }
    ];
  };

  it('should add a h1 heading', () => {
    const document = new TempoDocument().h1('Hello World!');
    expect(document.toJSON()).toEqual(getResult(1, 'Hello World!'));
  });

  it('should add a h2 heading', () => {
    const document = new TempoDocument().h2('Hello World!');
    expect(document.toJSON()).toEqual(getResult(2, 'Hello World!'));
  });

  it('should add a h3 heading', () => {
    const document = new TempoDocument().h3('Hello World!');
    expect(document.toJSON()).toEqual(getResult(3, 'Hello World!'));
  });

  it('should add a h4 heading', () => {
    const document = new TempoDocument().h4('Hello World!');
    expect(document.toJSON()).toEqual(getResult(4, 'Hello World!'));
  });

  it('should add a h5 heading', () => {
    const document = new TempoDocument().h5('Hello World!');
    expect(document.toJSON()).toEqual(getResult(5, 'Hello World!'));
  });

  it('should add a h6 heading', () => {
    const document = new TempoDocument().h6('Hello World!');
    expect(document.toJSON()).toEqual(getResult(6, 'Hello World!'));
  });
});

describe('Text Elements', () => {
  it('should add a paragraph', () => {
    const document = new TempoDocument().paragraph('Hello World!');
    expect(document.toJSON()).toEqual([
      {
        type: 'paragraph',
        data: [
          {
            type: 'plaintext',
            data: 'Hello World!',
            computed: 'Hello World!'
          }
        ],
        computed: 'Hello World!'
      }
    ]);
  });
});

describe('Special Elements', () => {
  it('should add a table', () => {
    const document = new TempoDocument().table([
      ['Hello World!', 'Hello 2 World!'],
      ['Hello 3 World!', 'Hello 4 World!']
    ]);
    expect(document.toJSON()).toEqual([
      {
        type: 'table',
        data: [
          {
            type: 'header',
            order: undefined,
            data: [
              [
                {
                  type: 'plaintext',
                  data: 'Hello World!',
                  computed: 'Hello World!'
                }
              ],
              [
                {
                  type: 'plaintext',
                  data: 'Hello 2 World!',
                  computed: 'Hello 2 World!'
                }
              ]
            ],
            computed: [
              '| Hello World! | Hello 2 World! |',
              '| ------------ | -------------- |'
            ].join('\n')
          },
          {
            type: 'row',
            order: 0,
            data: [
              [
                {
                  type: 'plaintext',
                  data: 'Hello 3 World!',
                  computed: 'Hello 3 World!'
                }
              ],
              [
                {
                  type: 'plaintext',
                  data: 'Hello 4 World!',
                  computed: 'Hello 4 World!'
                }
              ]
            ],
            computed: '| Hello 3 World! | Hello 4 World! |'
          }
        ],
        computed: [
          '| Hello World! | Hello 2 World! |',
          '| ------------ | -------------- |',
          '| Hello 3 World! | Hello 4 World! |'
        ].join('\n')
      }
    ]);
  });

  it('should add html', () => {
    const document = new TempoDocument().html('<div>Hello World!</div>');
    expect(document.toJSON()).toEqual([
      {
        type: 'html',
        data: '<div>Hello World!</div>',
        computed: '<div>Hello World!</div>'
      }
    ]);
  });

  it('should add a codeBlock', () => {
    const document = new TempoDocument().codeBlock(
      'console.log("Hello World!");',
      'javascript'
    );
    expect(document.toJSON()).toEqual([
      {
        type: 'codeBlock',
        data: {
          language: 'javascript',
          code: 'console.log("Hello World!");'
        },
        computed: ['```javascript', 'console.log("Hello World!");', '```'].join(
          '\n'
        )
      }
    ]);
  });

  it('should add a blockquote', () => {
    const document = new TempoDocument().blockQuote('Hello World!');
    expect(document.toJSON()).toEqual([
      {
        type: 'blockQuote',
        data: [
          {
            type: 'plaintext',
            data: 'Hello World!',
            computed: 'Hello World!'
          }
        ],
        computed: '> Hello World!'
      }
    ]);
  });

  it('should add an image', () => {
    const document = new TempoDocument().image(
      'example',
      'https://example.com/image.png'
    );

    expect(document.toJSON()).toEqual([
      {
        type: 'image',
        data: {
          alt: 'example',
          src: 'https://example.com/image.png'
        },
        computed: '![example](https://example.com/image.png)'
      }
    ]);
  });

  it('should add a horizontal rule (break)', () => {
    const document = new TempoDocument().break();
    expect(document.toJSON()).toEqual([
      {
        type: 'break',
        data: null,
        computed: '---'
      }
    ]);
  });
});

describe('Lists', () => {
  it('should add an bullet (unordered) list', () => {
    const document = new TempoDocument().bulletList([
      'Hello World!',
      'Hello 2 World!',
      txt => txt.bold('Hello 3 World!')
    ]);
    expect(document.toJSON()).toEqual([
      {
        type: 'bulletList',
        data: [
          {
            type: 'listItem',
            data: [
              {
                type: 'plaintext',
                data: 'Hello World!',
                computed: 'Hello World!'
              }
            ],
            computed: '- Hello World!'
          },
          {
            type: 'listItem',
            data: [
              {
                type: 'plaintext',
                data: 'Hello 2 World!',
                computed: 'Hello 2 World!'
              }
            ],
            computed: '- Hello 2 World!'
          },
          {
            type: 'listItem',
            data: [
              {
                type: 'bold',
                data: 'Hello 3 World!',
                computed: '**Hello 3 World!**'
              }
            ],
            computed: '- **Hello 3 World!**'
          }
        ],
        computed: '- Hello World!\n- Hello 2 World!\n- **Hello 3 World!**'
      }
    ]);
  });

  it('should add an number (ordered) list', () => {
    const document = new TempoDocument().numberList([
      'Hello World!',
      'Hello 2 World!'
    ]);
    expect(document.toJSON()).toEqual([
      {
        type: 'numberList',
        data: [
          {
            type: 'listItem',
            order: 0,
            data: [
              {
                type: 'plaintext',
                data: 'Hello World!',
                computed: 'Hello World!'
              }
            ],
            computed: '1. Hello World!'
          },
          {
            type: 'listItem',
            order: 1,
            data: [
              {
                type: 'plaintext',
                data: 'Hello 2 World!',
                computed: 'Hello 2 World!'
              }
            ],
            computed: '2. Hello 2 World!'
          }
        ],
        computed: '1. Hello World!\n2. Hello 2 World!'
      }
    ]);
  });
});

describe('Outputs', () => {
  describe('toString', () => {
    it('should return a string', () => {
      const document = new TempoDocument()
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
    const document = new TempoDocument()
      .h1('Hello World!')
      .paragraph('Hello there!');
    expect(document.toJSON()).toEqual([
      {
        type: 'heading',
        data: {
          level: 1,
          data: [
            {
              type: 'plaintext',
              data: 'Hello World!',
              computed: 'Hello World!'
            }
          ]
        },
        computed: '# Hello World!'
      },
      {
        type: 'paragraph',
        data: [
          {
            type: 'plaintext',
            data: 'Hello there!',
            computed: 'Hello there!'
          }
        ],
        computed: 'Hello there!'
      }
    ]);
  });
});
