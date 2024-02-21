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

export type TempoTextNodeType =
  | 'plaintext'
  | 'code'
  | 'append'
  | 'bold'
  | 'italic'
  | 'strikeThrough'
  | 'link'
  | 'emoji';

interface BaseTextNode<T> {
  type: TempoTextNodeType;
  data: T;
  computed: string;
}

export interface PlainTextNode extends BaseTextNode<string> {
  type: 'plaintext';
  options?: {
    append?: boolean;
  };
}

export interface AppendTextNode extends BaseTextNode<string> {
  type: 'append';
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

export interface LinkTextNode
  extends BaseTextNode<{ alt: string; src: string }> {
  type: 'link';
}

export interface EmojiTextNode extends BaseTextNode<md.EmojiAlias | md.EmojiUnicode> {
  type: 'emoji';
}

export type TempoTextNode =
  | PlainTextNode
  | CodeTextNode
  | AppendTextNode
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

/**
 * A class for building a collection of TextNodes, using a chaining API.
 */
export class TempoText {
  private nodes: TempoTextNode[] = [];

  /**
   * Append a plaintext string to the collection of TextNodes.
   *
   * @example
   * ```ts
   * const doc = new Text()
   *  .plainText('foobar')
   *  .toString();
   * // Output: 'foobar'
   * ```
   *
   * @param value A plaintext string to append to the collection of TextNodes.
   * @param options An optional object to specify options for the append operation.
   * @returns A new instance of the Text class, with the appended plaintext string.
   */
  public plainText(value: string, options?: { append?: boolean }): this {
    this.nodes.push({
      type: 'plaintext',
      data: value,
      computed: value,
      options
    });
    return this;
  }

  /**
   * Append a code string to the collection of TextNodes.
   *
   * @example
   * ```ts
   * const doc = new Text()
   *  .code('foobar')
   *  .toString();
   * // Output: '`foobar`'
   * ```
   *
   * @param value A code string to append to the collection of TextNodes.
   * @returns A new instance of the Text class, with the appended code string.
   */
  public code(value: string) {
    this.nodes.push({
      type: 'code',
      data: value,
      computed: md.code(value)
    });
    return this;
  }

  /**
   * Append a bold string to the collection of TextNodes.
   *
   * @example
   * ```ts
   * const doc = new Text()
   *  .bold('foobar')
   *  .toString();
   * // Output: '**foobar**'
   * ```
   *
   * @param value A bold string to append to the collection of TextNodes.
   * @returns A new instance of the Text class, with the appended bold string.
   */
  public bold(value: string) {
    this.nodes.push({
      type: 'bold',
      data: value,
      computed: md.bold(value)
    });
    return this;
  }

  /**
   * Append an italic string to the collection of TextNodes.
   *
   * @example
   * ```ts
   * const doc = new Text()
   *  .italic('foobar')
   *  .toString();
   * // Output: '_foobar_'
   * ```
   *
   * @param value An italic string to append to the collection of TextNodes.
   * @returns A new instance of the Text class, with the appended italic string.
   */
  public italic(value: string) {
    this.nodes.push({
      type: 'italic',
      data: value,
      computed: md.italic(value)
    });
    return this;
  }

  /**
   * Append a strikethrough string to the collection of TextNodes.
   *
   * @example
   * ```ts
   * const doc = new Text()
   *   .strikeThrough('foobar')
   *   .toString();
   * // Output: '~~foobar~~'
   * ```
   *
   * @param value A strikethrough string to append to the collection of TextNodes.
   * @returns A new instance of the Text class, with the appended strikethrough string.
   */
  public strikeThrough(value: string) {
    this.nodes.push({
      type: 'strikeThrough',
      data: value,
      computed: md.strikeThrough(value)
    });
    return this;
  }

  /**
   * Append a link to the collection of TextNodes.
   *
   * @example
   * ```ts
   * const doc = new Text()
   *   .link('Google', 'https://www.google.com')
   *   .toString();
   * // Output: '[Google](https://www.google.com)'
   *
   * @param value The alt text for the link.
   * @param href The href for the link.
   * @returns A new instance of the Text class, with the appended link.
   */
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

  /**
   * Append an emoji to the collection of TextNodes.
   *
   * @example
   * ```ts
   * const doc = new Text()
   *  .emoji('smile')
   *  .emoji('🙂')
   *  .toString();
   * // Output: ':smile: 🙂'
   *
   * @param value An emoji alias or unicode string to append to the collection of TextNodes.
   * @returns A new instance of the Text class, with the appended emoji.
   */
  public emoji(value: md.EmojiAlias | md.EmojiUnicode) {
    this.nodes.push({
      type: 'emoji',
      data: value,
      computed: md.emoji(value)
    });
    return this;
  }

  /*
  |------------------
  | Outputs
  |------------------
  */

  /**
   * Convert the text to a JSON representation, that can be used for serialization.
   *
   * @example
   * ```ts
   * const doc = new Text()
   *   .plaintext('Hello, World!')
   *   .code('console.log("foobar")')
   *   .toJSON();
   * // Output:
   * // [
   * //   { type: 'plaintext', data: 'Hello, World!', computed: 'Hello, World!' },
   * //   { type: 'code', data: 'console.log("foobar")', computed: '`console.log("foobar")`' }
   * // ]
   * ```
   *
   * @returns A JSON representation of the text, that can be used for serialization.
   */
  public toJSON() {
    return this.nodes;
  }

  /**
   * Convert the text to string representation, that can be used for rendering.
   *
   * @example
   * ```ts
   * const doc = new Text()
   *  .plaintext('Hello, World!')
   *  .code('console.log("foobar")')
   *  .toString();
   * // Output: 'Hello, World! `console.log("foobar")`'
   * ```
   *
   * @returns A string representation of the document, that can be used for rendering.
   */
  public toString() {
    let output = '';

    for (const node of this.nodes) {
      if (node.type === 'plaintext') {
        if (node.options && node.options.append) {
          output += node.computed;
          continue;
        }
      }

      output += ` ${node.computed}`;
    }

    return output.trim();
  }
}
