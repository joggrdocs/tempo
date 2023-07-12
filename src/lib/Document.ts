import * as md from './markdown/markdown';
import { Text } from './Text';

export type TextCallback = (text: Text) => Text | string;

export interface DocumentSection {
  value: string | string[] | string[][];
  computedValue: string;
}

export class Document {
  private sections: DocumentSection[] = [];

  /*
  |------------------
  | Headers
  |------------------
  */

  public h1(value: string | TextCallback | Text) {
    const val = this.parseText(value);
    this.sections.push({
      value: val,
      computedValue: md.h1(val)
    });
    return this;
  }

  public h2(value: string | TextCallback | Text) {
    const val = this.parseText(value);
    this.sections.push({
      value: val,
      computedValue: md.h2(val)
    });
    return this;
  }

  public h3(value: string | TextCallback | Text) {
    const val = this.parseText(value);
    this.sections.push({
      value: val,
      computedValue: md.h3(val)
    });
    return this;
  }

  public h4(value: string | TextCallback | Text) {
    const val = this.parseText(value);
    this.sections.push({
      value: val,
      computedValue: md.h4(val)
    });
    return this;
  }

  public h5(value: string | TextCallback | Text) {
    const val = this.parseText(value);
    this.sections.push({
      value: val,
      computedValue: md.h5(val)
    });
    return this;
  }

  public h6(value: string | TextCallback | Text) {
    const val = this.parseText(value);
    this.sections.push({
      value: val,
      computedValue: md.h6(val)
    });
    return this;
  }

  /*
  |------------------
  | Text Elements
  |------------------
  */

  public paragraph(value: string | TextCallback | Text) {
    const val = this.parseText(value);
    this.sections.push({
      value: md.paragraph(val),
      computedValue: val
    });
    return this;
  }

  /*
  |------------------
  | Special Elements
  |------------------
  */

  public table(rows: string[][]) {
    this.sections.push({
      value: rows,
      computedValue: md.table(rows)
    });
    return this;
  }

  public html(html: string) {
    this.sections.push({
      value: html,
      computedValue: html
    });
    return this;
  }

  public codeBlock(value: string, language?: md.SupportedLanguage) {
    this.sections.push({
      value,
      computedValue: md.codeBlock(value, language)
    });
    return this;
  }

  public blockQuote(value: string | TextCallback | Text) {
    const val = this.parseText(value);
    this.sections.push({
      value: val,
      computedValue: md.blockQuote(val)
    });
    return this;
  }

  public image(value: string, src: string) {
    this.sections.push({
      value,
      computedValue: md.image(value, src)
    });
    return this;
  }

  public hr() {
    this.sections.push({
      value: md.hr(),
      computedValue: md.hr()
    });
    return this;
  }

  /*
  |------------------
  | Lists
  |------------------
  */

  public numberList(value: string[]) {
    this.sections.push({
      value,
      computedValue: md.ol(value)
    });
    return this;
  }

  public bulletList(value: string[]) {
    this.sections.push({
      value,
      computedValue: md.ul(value)
    });
    return this;
  }

  /*
  |------------------
  | Utils
  |------------------
  */

  public toString() {
    return this.sections.map(section => section.computedValue).join('\n\n');
  }

  private parseText(value: string | TextCallback | Text): string {
    if (typeof value === 'string') {
      return value;
    } else if (value instanceof Text) {
      return value.toString();
    } else if (typeof value === 'function') {
      return value(new Text()).toString();
    } else {
      throw new Error('Invalid value type');
    }
  }
}

const createDocument = () => new Document();
export default createDocument;
