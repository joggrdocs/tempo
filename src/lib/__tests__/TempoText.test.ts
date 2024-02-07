import { TempoText } from '../TempoText';
import md from '../markdown';

jest.mock('../markdown/markdown');

let txt: TempoText;

beforeEach(() => {
  txt = new TempoText();
});

afterEach(() => {
  jest.resetAllMocks();
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

    expect(txt.toString()).toContain(emoji);
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
        .plainText(';', { append: true })
        .bold(value)
        .plainText('/', { append: true })
        .italic(value)
        .strikeThrough(value)
        .link(value, value);

      expect(txtReal.toString()).toEqual(
        `${value}; **${value}**/ _${value}_ ~~${value}~~ [${value}](${value})`
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
        .link(value, value);

      expect(txtReal.toJSON()).toEqual([
        {
          type: 'plaintext',
          data: value,
          computed: value
        },
        {
          type: 'bold',
          data: value,
          computed: `**${value}**`
        },
        {
          type: 'italic',
          data: value,
          computed: `_${value}_`
        },
        {
          type: 'strikeThrough',
          data: value,
          computed: `~~${value}~~`
        },
        {
          type: 'link',
          data: {
            src: value,
            alt: value
          },
          computed: `[${value}](${value})`
        }
      ]);
    });
  });
});
