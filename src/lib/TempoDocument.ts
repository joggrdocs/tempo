import * as md from './markdown/markdown';
import { TempoText, type TempoTextInput, type TempoTextNode } from './TempoText';

/*
|==========================================================================
| Document
|==========================================================================
|
| Wrapper around markdown functions to make it easier to build a document,
| using a chaining API.
|
*/

/*
|------------------
| DocumentNode Types
|------------------
*/

export type DocumentNodeType =
  | 'heading'
  | 'paragraph'
  | 'table'
  | 'html'
  | 'codeBlock'
  | 'blockQuote'
  | 'image'
  | 'break'
  | 'numberList'
  | 'bulletList';

interface BaseDocumentNode<T> {
  type: DocumentNodeType;
  data: T;
  computed: string;
}

export interface HeadingNode
  extends BaseDocumentNode<{
    level: 1 | 2 | 3 | 4 | 5 | 6;
    data: TempoTextNode[];
  }> {
  type: 'heading';
}

export interface ParagraphNode extends BaseDocumentNode<TempoTextNode[]> {
  type: 'paragraph';
}

interface TableRow<T extends 'row' | 'header'> {
  type: T;
  order: T extends 'row' ? number : undefined;
  data: TempoTextNode[][];
  computed: string;
}

export interface TableNode
  extends BaseDocumentNode<[TableRow<'header'>, ...TableRow<'row'>[]]> {
  type: 'table';
}

export interface HtmlNode extends BaseDocumentNode<string> {
  type: 'html';
}

export interface CodeBlockNode
  extends BaseDocumentNode<{
    code: string;
    language?: md.SupportedLanguage;
  }> {
  type: 'codeBlock';
}

export interface BlockQuoteNode extends BaseDocumentNode<TempoTextNode[]> {
  type: 'blockQuote';
}

export interface ImageNode
  extends BaseDocumentNode<{
    alt: string;
    src: string;
  }> {
  type: 'image';
  computed: string;
}

export interface BreakNode extends BaseDocumentNode<null> {
  type: 'break';
}

interface ListItem<T extends 'numberList' | 'bulletList'> {
  type: 'listItem';
  order: T extends 'numberList' ? number : undefined;
  data: TempoTextNode[];
  computed: string;
}

export interface BulletListNode
  extends BaseDocumentNode<ListItem<'bulletList'>[]> {
  type: 'bulletList';
}

export interface NumberListNode
  extends BaseDocumentNode<ListItem<'numberList'>[]> {
  type: 'numberList';
}

export type TempoDocumentNode =
  | HeadingNode
  | ParagraphNode
  | TableNode
  | HtmlNode
  | CodeBlockNode
  | BlockQuoteNode
  | ImageNode
  | BreakNode
  | NumberListNode
  | BulletListNode;


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
| TempoDocument Class
|----------------------------------
|
| The primary class for building a document. It is a wrapper around the
| markdown functions, and provides a chaining API for building a document.
|
*/

/**
 * TempoDocument class.
 *
 * A class for building a document, using a chaining API.
 */
export class TempoDocument {
  private nodes: TempoDocumentNode[];

  constructor(documentNodes?: TempoDocumentNode[]) {
    this.nodes = documentNodes ?? [];
  }

  /*
  |------------------
  | Headings
  |------------------
  */

  /**
   * Append a heading (h1) to the document.
   *
   * @example
   * ```ts
   * const doc = new Document()
   *   .h1('Hello, World!')
   *   .toString();
   * // Output: # Hello, World!
   * ```
   *
   * @param text A TempoTextInput type, which can be a string, Text instance, or a function that returns a string or Text instance.
   * @returns A new Document instance with the heading appended.
   */
  public h1(text: TempoTextInput): this {
    this.nodes.push({
      type: 'heading',
      data: {
        level: 1,
        data: computeNodes(text)
      },
      computed: md.h1(computeText(text))
    });
    return this;
  }

  /**
   * Append a heading (h2) to the document.
   *
   * @example
   * ```ts
   * const doc = new Document()
   *   .h2('Hello, World!')
   *   .toString();
   * // Output: ## Hello, World!
   * ```
   *
   * @param text A TempoTextInput type, which can be a string, Text instance, or a function that returns a string or Text instance.
   * @returns A new Document instance with the heading appended.
   */
  public h2(text: TempoTextInput): this {
    this.nodes.push({
      type: 'heading',
      data: {
        level: 2,
        data: computeNodes(text)
      },
      computed: md.h2(computeText(text))
    });
    return this;
  }

  /**
   * Append a heading (h3) to the document.
   *
   * @example
   * ```ts
   * const doc = new Document()
   *   .h3('Hello, World!')
   *   .toString();
   * // Output: ### Hello, World!
   * ```
   *
   * @param text A TempoTextInput type, which can be a string, Text instance, or a function that returns a string or Text instance.
   * @returns A new Document instance with the heading appended.
   */
  public h3(text: TempoTextInput): this {
    this.nodes.push({
      type: 'heading',
      data: {
        level: 3,
        data: computeNodes(text)
      },
      computed: md.h3(computeText(text))
    });
    return this;
  }

  /**
   * Append a heading (h4) to the document.
   *
   * @example
   * ```ts
   * const doc = new Document()
   *   .h4('Hello, World!')
   *   .toString();
   * // Output: #### Hello, World!
   * ```
   *
   * @param text A TempoTextInput type, which can be a string, Text instance, or a function that returns a string or Text instance.
   * @returns A new Document instance with the heading appended.
   */
  public h4(text: TempoTextInput): this {
    this.nodes.push({
      type: 'heading',
      data: {
        level: 4,
        data: computeNodes(text)
      },
      computed: md.h4(computeText(text))
    });
    return this;
  }

  /**
   * Append a heading (h5) to the document.
   *
   * @example
   * ```ts
   * const doc = new Document()
   *   .h5('Hello, World!')
   *   .toString();
   * // Output: ##### Hello, World!
   * ```
   *
   * @param text A TempoTextInput type, which can be a string, Text instance, or a function that returns a string or Text instance.
   * @returns A new Document instance with the heading appended.
   */
  public h5(text: TempoTextInput): this {
    this.nodes.push({
      type: 'heading',
      data: {
        level: 5,
        data: computeNodes(text)
      },
      computed: md.h5(computeText(text))
    });
    return this;
  }

  /**
   * Append a heading (h6) to the document.
   *
   * @example
   * ```ts
   * const doc = new Document()
   *   .h6('Hello, World!')
   *   .toString();
   * // Output: ##### Hello, World!
   * ```
   *
   * @param text A TempoTextInput type, which can be a string, Text instance, or a function that returns a string or Text instance.
   * @returns A new Document instance with the heading appended.
   */
  public h6(text: TempoTextInput): this {
    this.nodes.push({
      type: 'heading',
      data: {
        level: 6,
        data: computeNodes(text)
      },
      computed: md.h6(computeText(text))
    });
    return this;
  }

  /*
  |------------------
  | Text Elements
  |------------------
  */

  /**
   * Append a paragraph to the document.
   *
   * @example
   * ```ts
   * const doc = new Document()
   *  .paragraph('This is a paragraph of text.')
   *  .toString();
   * // Output: This is a paragraph of text.
   * ```
   *
   * @param text A TempoTextInput type, which can be a string, Text instance, or a function that returns a string or Text instance.
   * @returns A new Document instance with the paragraph appended.
   */
  public paragraph(text: TempoTextInput): this {
    this.nodes.push({
      type: 'paragraph',
      data: computeNodes(text),
      computed: md.paragraph(computeText(text))
    });
    return this;
  }

  /*
  |------------------
  | Special Elements
  |------------------
  */

  /**
   * Append a table to the document.
   *
   * @example
   * ```ts
   * const doc = new Document()
   *  .table([
   *    ['Name', 'email'],
   *    ['John Doe', 'jdoe@gmail.com'],
   *    ['Jane Doe', 'jane@gmail.com']
   *  ])
   *  .toString();
   * // Output:
   * // | Name     | email          |
   * // |----------|----------------|
   * // | John Doe | jdoe@gmail.com |
   * // | Jane Doe | jane@gmail.com |
   * ```
   *
   * @param tableDefinition An array of arrays of the TempoTextInput type, which can be a string, Text instance, or a function that returns a string or Text instance. With the first array being the header row.
   * @returns A new Document instance with the table appended.
   */
  public table(tableDefinition: TempoTextInput[][]): this {
    const [header, ...rows] = tableDefinition;
    this.nodes.push({
      type: 'table',
      data: [
        {
          type: 'header',
          order: undefined,
          data: header.map(computeNodes),
          computed: md.tableHeader(header.map(computeText))
        },
        ...(rows.map((row, i) => ({
          type: 'row',
          order: i,
          data: row.map(computeNodes),
          computed: md.tableRow(row.map(computeText))
        })) as TableRow<'row'>[])
      ],
      computed: md.table(tableDefinition.map(row => row.map(computeText)))
    });
    return this;
  }

  /**
   * Append a raw HTML string to the document.
   *
   * @example
   * ```ts
   * const doc = new Document()
   *  .html('<p align="center">Hello, World!</p>')
   *  .toString();
   * // Output: <p align="center">Hello, World!</p>
   * ```
   *
   * @param html A string of raw HTML.
   * @returns A new Document instance with the HTML appended.
   */
  public html(html: string): this {
    this.nodes.push({
      type: 'html',
      data: html,
      computed: html
    });
    return this;
  }

  /**
   * Append a code block to the document.
   *
   * @example
   * ```ts
   * const doc = new Document()
   *  .codeBlock(`
   * const x = 10;
   *
   * console.log(x);
   *   `.trim(),
   *   'javascript'
   *  )
   *  .toString();
   * // Output:
   * // ```javascript
   * // const x = 10;
   * //
   * // console.log(x);
   * // ```
   * ```
   *
   * @param code A string of code.
   * @param language A supported language for the code block.
   * @returns A new Document instance with the code block appended.
   */
  public codeBlock(code: string, language?: md.SupportedLanguage): this {
    this.nodes.push({
      type: 'codeBlock',
      data: {
        code,
        language
      },
      computed: md.codeBlock(code, language)
    });
    return this;
  }

  /**
   * Append a block quote to the document.
   *
   * @example
   * ```ts
   * const doc = new Document()
   *   .blockQuote('This is a block quote.')
   *   .toString();
   * // Output: > This is a block quote.
   * ```
   *
   * @param text A TempoTextInput type, which can be a string, Text instance, or a function that returns a string or Text instance.
   * @returns A new Document instance with the block quote appended.
   */
  public blockQuote(text: TempoTextInput): this {
    this.nodes.push({
      type: 'blockQuote',
      data: computeNodes(text),
      computed: md.blockQuote(computeText(text))
    });
    return this;
  }

  /**
   * Append an image to the document.
   *
   * @example
   * ```ts
   * const doc = new Document()
   *   .image('Alt text', 'https://example.com/image.png')
   *   .toString();
   * // Output: ![Alt text](https://example.com/image.png)
   * ```
   *
   * @param text A TempoTextInput type, which can be a string, Text instance, or a function that returns a string or Text instance.
   * @param src A string of the image source.
   * @returns A new Document instance with the image appended.
   */
  public image(text: string, src: string): this {
    this.nodes.push({
      type: 'image',
      data: {
        alt: text,
        src
      },
      computed: md.image(text, src)
    });
    return this;
  }

  /**
   * Append a thematic break to the document.
   *
   * @example
   * ```ts
   * const doc = new Document()
   *  .break()
   *  .toString();
   * // Output: ---
   * ```
   *
   * @returns A new Document instance with the thematic break appended.
   */
  public break(): this {
    this.nodes.push({
      type: 'break',
      data: null,
      computed: md.thematicBreak()
    });
    return this;
  }

  /*
  |------------------
  | Lists
  |------------------
  */

  /**
   * Append a number list to the document.
   *
   * @example
   * ```ts
   * const doc = new Document()
   *   .numberList([
   *     'Item 1',
   *     'Item 2',
   *     'Item 3'
   *   ])
   *   .toString();
   * // Output:
   * // 1. Item 1
   * // 2. Item 2
   * // 3. Item 3
   * ```
   *
   * @param text An array of TempoTextInput types, which can be a string, Text instance, or a function that returns a string or Text instance.
   * @returns A new Document instance with the number list appended.
   */
  public numberList(text: TempoTextInput[]): this {
    this.nodes.push({
      type: 'numberList',
      data: text.map((t, i) => ({
        order: i,
        type: 'listItem',
        data: computeNodes(t),
        computed: md.li(computeText(t), i)
      })),
      computed: md.ol(text.map(computeText))
    });
    return this;
  }

  /**
   * Append a bullet list to the document.
   *
   * @example
   * ```ts
   * const doc = new Document()
   *   .bulletList([
   *     'Item 1',
   *     'Item 2',
   *     'Item 3'
   *   ])
   *   .toString();
   * // Output:
   * // - Item 1
   * // - Item 2
   * // - Item 3
   * ```
   *
   * @param text An array of TempoTextInput types, which can be a string, Text instance, or a function that returns a string or Text instance.
   * @returns A new Document instance with the bullet list appended.
   */
  public bulletList(text: TempoTextInput[]): this {
    this.nodes.push({
      type: 'bulletList',
      data: text.map(t => ({
        type: 'listItem',
        order: undefined,
        data: computeNodes(t),
        computed: md.li(computeText(t))
      })),
      computed: md.ul(text.map(computeText))
    });
    return this;
  }

  /*
  |------------------
  | Outputs
  |------------------
  */

  /**
   * Convert the document to string representation, that can be used for rendering.
   *
   * @example
   * ```ts
   * const doc = new Document()
   *  .h1('Hello, World!')
   *  .paragraph('This is a paragraph of text.')
   *  .toString();
   * // Output:
   * // # Hello, World!
   * //
   * // This is a paragraph of text.
   * ```
   *
   * @returns A string representation of the document, that can be used for rendering.
   */
  public toString(): string {
    return this.nodes
      .map(section => section.computed)
      .join('\n\n')
      .trim()
      .concat('\n');
  }

  /**
   * Convert the document to a JSON representation, that can be used for serialization.
   *
   * @example
   * ```ts
   * const doc = new Document()
   *  .h1('Hello, World!')
   *  .paragraph('This is a paragraph of text.')
   *  .toJSON();
   * // Output:
   * // [
   * //   {
   * //     "type": "heading",
   * //     "data": {
   * //       "level": 1,
   * //       "data": [
   * //         {
   * //           "type": "plaintext",
   * //           "data": "Hello, World!",
   * //           "computed": "Hello, World!"
   * //         }
   * //       ]
   * //     },
   * //     "computed": "# Hello, World!"
   * //   },
   * //   {
   * //     "type": "paragraph",
   * //     "data": [
   * //       {
   * //         "type": "plaintext",
   * //         "data": "This is a paragraph of text.",
   * //         "computed": "This is a paragraph of text."
   * //       }
   * //     ],
   * //     "computed": "This is a paragraph of text."
   * //   }
   * // ]
   * ```
   *
   * @returns A JSON representation of the document, that can be used for serialization.
   */
  public toJSON(): TempoDocumentNode[] {
    return this.nodes;
  }
}
