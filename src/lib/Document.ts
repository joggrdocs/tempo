import * as md from './markdown';
import { Text } from './Text';

export interface DocumentSection {
  value: string | string[] | string[][];
  computedValue: string;
}

export class Document {
  private sections: DocumentSection[] = [];

  public h1 (value: string | ((text: Text) => string)) {
    const val = this.parseText(value);
    this.sections.push({
      value: val,
      computedValue: md.h1(val)
    });
    return this;
  }

  public h2 (value: string | ((text: Text) => string)) {
    const val = this.parseText(value);
    this.sections.push({
      value: val,
      computedValue: md.h2(val)
    });
    return this;
  }

  public h3 (value: string | ((text: Text) => string)) {
    const val = this.parseText(value);
    this.sections.push({
      value: val,
      computedValue: md.h3(val)
    });
    return this;
  }

  public h4 (value: string | ((text: Text) => string)) {
    const val = this.parseText(value);
    this.sections.push({
      value: val,
      computedValue: md.h4(val)
    });
    return this;
  }

  public h5 (value: string | ((text: Text) => string)) {
    const val = this.parseText(value);
    this.sections.push({
      value: val,
      computedValue: md.h5(val)
    });
    return this;
  }

  public h6 (value: string | ((text: Text) => string)) {
    const val = this.parseText(value);
    this.sections.push({
      value: val,
      computedValue: md.h6(val)
    });
    return this;
  }

  public text (value: string | ((text: Text) => string)) {
    const val = this.parseText(value);
    this.sections.push({
      value: val,
      computedValue: val
    });
    return this;
  }

  public codeBlock (value: string, language?: string) {
    this.sections.push({
      value,
      computedValue: md.codeBlock(value, language)
    });
    return this;
  }

  public blockQuote (value: string | ((text: Text) => string)) {
    const val = this.parseText(value);
    this.sections.push({
      value: val,
      computedValue: md.blockQuote(val)
    });
    return this;
  }

  public image (value: string, src: string) {
    this.sections.push({
      value,
      computedValue: md.image(value, src)
    });
    return this;
  }

  public hr () {
    this.sections.push({
      value: md.hr(),
      computedValue: md.hr()
    });
    return this;
  }

  public numberList (value: string[]) {
    this.sections.push({
      value,
      computedValue: md.ol(value)
    });
    return this;
  }

  public bulletList (value: string[]) {
    this.sections.push({
      value,
      computedValue: md.ul(value)
    });
    return this;
  }

  public table (rows: string[][]) {
    this.sections.push({
      value: rows,
      computedValue: md.table(rows)
    });
    return this;
  }

  public build () {
    return this.sections.map(section => section.computedValue).join('\n\n');
  }

  private parseText (value: string | ((text: Text) => string)) {
    return typeof value === 'string' ? value : value(new Text());
  }
}

const createDocument = () => new Document();
export default createDocument;
