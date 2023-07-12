import * as md from './markdown/markdown';

export interface TextSection {
  value: string;
  computedValue: string;
}

export class Text {
  private value: TextSection[] = [];

  public text(value: string) {
    this.value.push({ value, computedValue: value });
    return this;
  }

  public code(value: string) {
    this.value.push({ value, computedValue: md.code(value) });
    return this;
  }

  public bold(value: string) {
    this.value.push({ value, computedValue: md.bold(value) });
    return this;
  }

  public italic(value: string) {
    this.value.push({ value, computedValue: md.italic(value) });
    return this;
  }

  public strikeThrough(value: string) {
    this.value.push({ value, computedValue: md.strikeThrough(value) });
    return this;
  }

  public link(value: string, href: string) {
    this.value.push({ value, computedValue: md.link(value, href) });
    return this;
  }

  public emoji(value: md.EmojiAlias | md.EmojiUnicode) {
    this.value.push({
      value: value.toString(),
      computedValue: value.toString()
    });
    return this;
  }

  public toString() {
    return this.value.map(section => section.computedValue).join(' ');
  }
}

const createText = () => new Text();
export default createText;
