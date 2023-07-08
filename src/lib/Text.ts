import * as md from './markdown';

export class Text {
  private value: string[] = [];

  public text(value: string) {
    this.value.push(value);
    return this;
  }

  public code(value: string) {
    this.value.push(md.code(value));
    return this;
  }

  public bold(value: string) {
    this.value.push(md.bold(value));
    return this;
  }

  public italic(value: string) {
    this.value.push(md.italic(value));
    return this;
  }

  public strikeThrough(value: string) {
    this.value.push(md.strikeThrough(value));
    return this;
  }

  public underline(value: string) {
    this.value.push(md.underLine(value));
    return this;
  }

  public link(value: string, href: string) {
    this.value.push(md.link(value, href));
    return this;
  }

  public build() {
    return this.value.join(' ');
  }
}

const createText = () => new Text();
export default createText;
