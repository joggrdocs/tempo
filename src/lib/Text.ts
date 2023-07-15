import * as md from './markdown/markdown';

/*
|==========================================================================
| Text
|==========================================================================
|
| A collection of functions to generate markdown strings, with a chaining
| API for building a collection of TextNodes.
|
*/

/*
|------------------
| TextNode Types
|------------------
*/

export type TextNodeType =
  | 'plaintext'
  | 'code'
  | 'bold'
  | 'italic'
  | 'strikeThrough'
  | 'link'
  | 'emoji';

interface BaseTextNode<T> {
  type: TextNodeType;
  data: T;
  computed: string;
}

export interface PlainTextNode extends BaseTextNode<string> {
  type: 'plaintext';
}

export interface CodeTextNode extends BaseTextNode<string> {
  type: 'code';
}

export interface BoldTextNode extends BaseTextNode<string> {
  type: 'bold';
}

export interface ItalicTextNode extends BaseTextNode<string> {
  type: 'italic';
}

export interface StrikeThroughTextNode extends BaseTextNode<string> {
  type: 'strikeThrough';
}

export interface LinkTextNode extends BaseTextNode<{ alt: string; src: string }> {
  type: 'link';
}

export interface EmojiTextNode extends BaseTextNode<string> {
  type: 'emoji';
}

export type TextNode =
  | PlainTextNode
  | CodeTextNode
  | BoldTextNode
  | ItalicTextNode
  | StrikeThroughTextNode
  | LinkTextNode
  | EmojiTextNode;

/*
|----------------------------------
| Text Class
|----------------------------------
|
| The primary class for building a set of TextNodes. This is used as the basis of
| certain Node within the Document class.
|
*/

export class Text {
  private nodes: TextNode[] = [];

  public plainText(value: string) {
    this.nodes.push({
      type: 'plaintext',
      data: value,
      computed: value
    });
    return this;
  }

  public code(value: string) {
    this.nodes.push({
      type: 'code',
      data: value,
      computed: md.code(value)
    });
    return this;
  }

  public bold(value: string) {
    this.nodes.push({
      type: 'bold',
      data: value,
      computed: md.bold(value)
    });
    return this;
  }

  public italic(value: string) {
    this.nodes.push({
      type: 'italic',
      data: value,
      computed: md.italic(value)
    });
    return this;
  }

  public strikeThrough(value: string) {
    this.nodes.push({
      type: 'strikeThrough',
      data: value,
      computed: md.strikeThrough(value)
    });
    return this;
  }

  public link(value: string, href: string) {
    this.nodes.push({
      type: 'link',
      data: {
        alt: value,
        src: href
      },
      computed: md.link(value, href)
    });
    return this;
  }

  public emoji(value: md.EmojiAlias | md.EmojiUnicode) {
    this.nodes.push({
      type: 'emoji',
      data: value.toString(),
      computed: value.toString()
    });
    return this;
  }

  /*
  |------------------
  | Outputs
  |------------------
  */

  public toJSON() {
    return this.nodes;
  }

  public toString() {
    return this.nodes.map(section => section.computed).join(' ');
  }
}

const createText = () => new Text();
export default createText;
