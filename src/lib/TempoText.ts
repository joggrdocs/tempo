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
  data: BaseTextNode<T>[] | BaseTextNode<T> | T;
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

export interface EmojiTextNode extends BaseTextNode<string> {
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

export type TempoTextInput =
  | string
  // eslint-disable-next-line no-use-before-define
  | TempoText
  // eslint-disable-next-line no-use-before-define
  | ((text: TempoText) => TempoText | string);


/*
|----------------------------------
| Utils
|----------------------------------
|
| Utility functions for working with DocumentNodes, Documents, TextNodes, and
| other base types.
|
*/

function formatTextNode(text: string): TempoTextNode {
  return {
    type: 'plaintext',
    data: text,
    computed: text
  };
}

export function computeNodes(tempoTextInput: TempoTextInput): TempoTextNode[] {
  if (typeof tempoTextInput === 'string') {
    return [formatTextNode(tempoTextInput)];
  } else if (tempoTextInput instanceof TempoText) {
    return tempoTextInput.toJSON();
  } else if (typeof tempoTextInput === 'function') {
    const result = tempoTextInput(new TempoText());
    return computeNodes(result);
  } else {
    throw new TypeError(`Invalid text type: ${typeof tempoTextInput}`);
  }
}

export function computeText(tempoTextInput: TempoTextInput): string {
  if (typeof tempoTextInput === 'string') {
    return tempoTextInput;
  } else if (tempoTextInput instanceof TempoText) {
    return tempoTextInput.toString();
  } else if (typeof tempoTextInput === 'function') {
    const result = tempoTextInput(new TempoText());
    return computeText(result);
  } else {
    throw new TypeError(`Invalid text type: ${typeof tempoTextInput}`);
  }
}

/*
|----------------------------------
| TempoText Class
|----------------------------------
|
| The primary class for building a set of TextNodes. This is used as the basis of
| certain Node within the Document class.
|
*/

/**
 * TempoText
 *
 * Build a collection of TextNodes, with a chaining API for building markdown strings.
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
   * @returns A new instance of the Text class, with the appended plaintext string.
   */
  public plainText(value: string): this {
    this.nodes.push({
      type: 'plaintext',
      data: value,
      computed: computeText(value),
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
   * @param text A TempoTextInput type, which can be a string, Text instance, or a function that returns a string or Text instance.
   * @returns A new instance of the Text class, with the appended code string.
   */
  public code(text: TempoTextInput) {
    this.nodes.push({
      type: 'code',
      data: computeNodes(text),
      computed: md.code(computeText(text))
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
   * @param text A TempoTextInput type, which can be a string, Text instance, or a function that returns a string or Text instance.
   * @returns A new instance of the Text class, with the appended bold string.
   */
  public bold(text: TempoTextInput) {
    this.nodes.push({
      type: 'bold',
      data: computeNodes(text),
      computed: md.bold(computeText(text))
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
   * @param text A TempoTextInput type, which can be a string, Text instance, or a function that returns a string or Text instance.
   * @returns A new instance of the Text class, with the appended italic string.
   */
  public italic(text: TempoTextInput) {
    this.nodes.push({
      type: 'italic',
      data: computeNodes(text),
      computed: md.italic(computeText(text))
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
   * @param text A TempoTextInput type, which can be a string, Text instance, or a function that returns a string or Text instance.
   * @returns A new instance of the Text class, with the appended strikethrough string.
   */
  public strikeThrough(text: TempoTextInput) {
    this.nodes.push({
      type: 'strikeThrough',
      data: computeNodes(text),
      computed: md.strikeThrough(computeText(text))
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
   * @param text A TempoTextInput type, which can be a string, Text instance, or a function that returns a string or Text instance.
   * @param href The href for the link.
   * @param alt An optional alt text for the link.
   * @returns A new instance of the Text class, with the appended link.
   */
  public link(text: TempoTextInput, href: string, alt?: string) {
    this.nodes.push({
      type: 'link',
      data: {
        alt: alt || md.cleanText(text),
        src: href
      },
      computed: md.link(computeText(text), href)
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
   * @param emoji An emoji alias or unicode string to append to the collection of TextNodes.
   * @returns A new instance of the Text class, with the appended emoji.
   */
  public emoji(emoji: md.EmojiAlias | md.EmojiUnicode) {
    this.nodes.push({
      type: 'emoji',
      data: emoji,
      computed: md.emoji(emoji)
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
      output += ` ${node.computed}`;
    }

    return output.trim();
  }
}
