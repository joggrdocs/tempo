import { TempoText, computeNodes, computeText } from '../TempoText';
import md from '../markdown';

jest.mock('../markdown/markdown');

let txt: TempoText;

beforeEach(() => {
  txt = new TempoText();
});

afterEach(() => {
  jest.resetAllMocks();
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
        data: {
          text: 'Hello World!'
        },
        computed: 'Hello World!'
      }
    ]);
  });

  it('should compute nodes from `Text`', () => {
    expect(computeNodes(new TempoText().plainText('Hello World!'))).toEqual([
      {
        type: 'plaintext',
        data: {
          text: 'Hello World!'
        },
        computed: 'Hello World!'
      }
    ]);
  });

  it('should compute nodes from `(Text) => Text | string`', () => {
    expect(computeNodes(text => text.plainText('Hello World!'))).toEqual([
      {
        type: 'plaintext',
        data: {
          text: 'Hello World!'
        },
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


describe('code', () => {
  it('should call md.code with the provided value', () => {
    const value = 'const foo = "bar";';
    txt.code(value);

    expect(md.code).toHaveBeenCalledWith(value);
  });
});

describe('bold', () => {
  it('should call md.bold with the provided value', () => {
    const value = 'Hello';
    txt.bold(value);

    expect(md.bold).toHaveBeenCalledWith(value);
  });
});

describe('italic', () => {
  it('should call md.italic with the provided value', () => {
    const value = 'World';
    txt.italic(value);

    expect(md.italic).toHaveBeenCalledWith(value);
  });
});

describe('strikeThrough', () => {
  it('should call md.strikeThrough with the provided value', () => {
    const value = 'Strike';
    txt.strikeThrough(value);

    expect(md.strikeThrough).toHaveBeenCalledWith(value);
  });
});

describe('link', () => {
  it('should call md.link with the provided value and href', () => {
    const value = 'Joggr.io';
    const href = 'https://joggr.io';
    txt.link(value, href);

    expect(md.link).toHaveBeenCalledWith(value, href);
  });
});

describe('emoji', () => {
  it('should push the provided emoji value to the text', () => {
    const emoji = '👍';
    txt.emoji(emoji);
    expect(md.emoji).toHaveBeenCalledWith(emoji);
  });

  it('should push the provided emoji alias to the text', () => {
    const emoji = 'smile';
    txt.emoji(emoji);
    expect(md.emoji).toHaveBeenCalledWith(emoji);
  });
});

describe('nested', () => {
  let createText: () => TempoText;
  beforeEach(async () => {
    jest.unmock('../markdown/markdown');
    jest.resetModules();
    const textImport = await import('../TempoText');
    createText = () => new textImport.TempoText();
  });

  it('should return the computed value', () => {
    const value = 'Hello World';
    const txt = createText();
    txt.bold(
      t => t.link(value, 'https://example.com')
    );

    expect(txt.toString()).toEqual(`**[${value}](https://example.com)**`);
  });
});


describe('toString', () => {
  it('should return the computed value', () => {
    const value = 'Hello World';
    txt.plainText(value);

    expect(txt.toString()).toEqual(value);
  });
});

describe('outputs', () => {
  let createText: () => TempoText;
  beforeEach(async () => {
    jest.unmock('../markdown/markdown');
    jest.resetModules();
    const textImport = await import('../TempoText');
    createText = () => new textImport.TempoText();
  });

  describe('toString', () => {
    it('should return the computed value', () => {
      const value = 'Hello World';
      const txtReal = createText()
        .plainText(value)
        .plainText(';')
        .bold(value)
        .plainText('/')
        .italic(value)
        .strikeThrough(value)
        .link(value, value);

      expect(txtReal.toString()).toEqual(
        `${value} ; **${value}** / _${value}_ ~~${value}~~ [${value}](${value})`
      );
    });
  });

  describe('toJSON', () => {
    it('should return the nodes', () => {
      const value = 'Hello World';
      const txtReal = createText()
        .plainText(value)
        .bold(value)
        .italic(value)
        .strikeThrough(value)
        .link(value, 'https://example.com');

      expect(txtReal.toJSON()).toEqual([
        {
          type: 'plaintext',
          data: {
            text: value,
          },
          computed: value
        },
        {
          type: 'bold',
          data: [
            {
              type: 'plaintext',
              data: {
                text: value,
              },
              computed: value
            }
          ],
          computed: `**${value}**`
        },
        {
          type: 'italic',
          data: [
            {
              type: 'plaintext',
              data: {
                text: value,
              },
              computed: value
            }
          ],
          computed: `_${value}_`
        },
        {
          type: 'strikeThrough',
          data: [
            {
              type: 'plaintext',
              data: {
                text: value,
              },
              computed: value
            }
          ],
          computed: `~~${value}~~`
        },
        {
          type: 'link',
          data: {
            src: 'https://example.com',
            alt: `Link for ${value}`
          },
          computed: `[${value}](https://example.com)`
        }
      ]);
    });
  });
});
