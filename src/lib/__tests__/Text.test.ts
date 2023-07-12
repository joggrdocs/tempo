import createText, { Text } from '../Text';
import md from '../markdown';

jest.mock('../markdown/markdown');

let txt: Text;

beforeEach(() => {
  txt = createText();
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
