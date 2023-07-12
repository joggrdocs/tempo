import createText, { Text } from '../Text'
import md from '../markdown';

jest.mock('./markdown/markdown');

let text: Text;

beforeEach(() => {
  text = createText();
});

afterEach(() => {
  jest.resetAllMocks();
});

describe('paragraph', () => {
  it('should call md.paragraph with the provided value', () => {
    const value = 'Lorem ipsum';
    text.paragraph(value);

    expect(md.paragraph).toHaveBeenCalledWith(value);
  });
});

describe('code', () => {
  it('should call md.code with the provided value', () => {
    const value = 'const foo = "bar";';
    text.code(value);

    expect(md.code).toHaveBeenCalledWith(value);
  });
});

describe('bold', () => {
  it('should call md.bold with the provided value', () => {
    const value = 'Hello';
    text.bold(value);

    expect(md.bold).toHaveBeenCalledWith(value);
  });
});

describe('italic', () => {
  it('should call md.italic with the provided value', () => {
    const value = 'World';
    text.italic(value);

    expect(md.italic).toHaveBeenCalledWith(value);
  });
});

describe('strikeThrough', () => {
  it('should call md.strikeThrough with the provided value', () => {
    const value = 'Strike';
    text.strikeThrough(value);

    expect(md.strikeThrough).toHaveBeenCalledWith(value);
  });
});

describe('underline', () => {
  it('should call md.underLine with the provided value', () => {
    const value = 'Underline';
    text.underline(value);

    expect(md.underLine).toHaveBeenCalledWith(value);
  });
});

describe('link', () => {
  it('should call md.link with the provided value and href', () => {
    const value = 'OpenAI';
    const href = 'https://openai.com';
    text.link(value, href);

    expect(md.link).toHaveBeenCalledWith(value, href);
  });
});

describe('emoji', () => {
  it('should push the provided emoji value to the text', () => {
    const emoji = '👍';
    text.emoji(emoji);

    expect(text.toString()).toContain(emoji);
  });
});

describe('toString', () => {
  it('should join the text values with a space', () => {
    text.paragraph('Lorem ipsum')
      .code('const foo = "bar";')
      .bold('Hello')
      .italic('World');

    expect(text.toString()).toBe('Lorem ipsum `const foo = "bar";` **Hello** *World*');
  });
});