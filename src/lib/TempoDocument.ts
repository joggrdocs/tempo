import * as md from './markdown/markdown';
import {
  computeNodes,
  computeText,
  type PlainTextNode,
  type TempoTextInput,
  type TempoTextNode
} from './TempoText';

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
  | 'bulletList'
  | 'alert';

interface BaseDocumentNode<N extends unknown[], D extends object = object> {
  type: DocumentNodeType;
  data: {
    nodes: N;
  } & D;
  computed: string;
}

export interface HeadingNode
  extends BaseDocumentNode<
    TempoTextNode[],
    {
      level: 1 | 2 | 3 | 4 | 5 | 6;
    }
  > {
  type: 'heading';
}

export interface ParagraphNode extends BaseDocumentNode<TempoTextNode[]> {
  type: 'paragraph';
}

interface TableRow<T extends 'row' | 'header'> {
  type: T;
  order: T extends 'row' ? number : undefined;
  data: {
    nodes: TempoTextNode[][];
  };
  computed: string;
}

export interface TableNode
  extends BaseDocumentNode<[TableRow<'header'>, ...Array<TableRow<'row'>>]> {
  type: 'table';
}

export interface HtmlNode extends BaseDocumentNode<PlainTextNode[]> {
  type: 'html';
}

export interface CodeBlockNode
  extends BaseDocumentNode<PlainTextNode[], {
    code: string;
    language?: md.SupportedLanguage;
  }> {
  type: 'codeBlock';
}

export interface BlockQuoteNode extends BaseDocumentNode<TempoTextNode[]> {
  type: 'blockQuote';
}

export interface ImageNode
  extends BaseDocumentNode<[], {
    alt: string;
    src: string;
  }> {
  type: 'image';
  computed: string;
}

export interface BreakNode extends BaseDocumentNode<[]> {
  type: 'break';
}

interface ListItem<T extends 'numberList' | 'bulletList'> {
  type: 'listItem';
  order: T extends 'numberList' ? number : undefined;
  nodes: TempoTextNode[];
  computed: string;
}

export interface BulletListNode
  extends BaseDocumentNode<Array<ListItem<'bulletList'>>> {
  type: 'bulletList';
}

export interface NumberListNode
  extends BaseDocumentNode<Array<ListItem<'numberList'>>> {
  type: 'numberList';
}

export type AlertType = 'note' | 'important' | 'warning' | 'tip' | 'caution';

export interface AlertNode extends BaseDocumentNode<TempoTextNode[], { type: AlertType }> {
  type: 'alert';
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
  | BulletListNode
  | AlertNode;

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
  private readonly nodes: TempoDocumentNode[];

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
   * const doc = tempo()
   *   .h1('Hello, World!')
   *   .toString();
   * // Output: # Hello, World!
   * ```
   *
   * @param text A TempoTextInput type, which can be a string, Text instance, or a function that returns a string or Text instance.
   * @returns The TempoDocument instance with the heading appended.
   */
  public h1(text: TempoTextInput): this {
    this.nodes.push({
      type: 'heading',
      data: {
        level: 1,
        nodes: computeNodes(text)
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
   * const doc = tempo()
   *   .h2('Hello, World!')
   *   .toString();
   * // Output: ## Hello, World!
   * ```
   *
   * @param text A TempoTextInput type, which can be a string, Text instance, or a function that returns a string or Text instance.
   * @returns The TempoDocument instance with the heading appended.
   */
  public h2(text: TempoTextInput): this {
    this.nodes.push({
      type: 'heading',
      data: {
        level: 2,
        nodes: computeNodes(text)
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
   * const doc = tempo()
   *   .h3('Hello, World!')
   *   .toString();
   * // Output: ### Hello, World!
   * ```
   *
   * @param text A TempoTextInput type, which can be a string, Text instance, or a function that returns a string or Text instance.
   * @returns The TempoDocument instance with the heading appended.
   */
  public h3(text: TempoTextInput): this {
    this.nodes.push({
      type: 'heading',
      data: {
        level: 3,
        nodes: computeNodes(text)
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
   * const doc = tempo()
   *   .h4('Hello, World!')
   *   .toString();
   * // Output: #### Hello, World!
   * ```
   *
   * @param text A TempoTextInput type, which can be a string, Text instance, or a function that returns a string or Text instance.
   * @returns The TempoDocument instance with the heading appended.
   */
  public h4(text: TempoTextInput): this {
    this.nodes.push({
      type: 'heading',
      data: {
        level: 4,
        nodes: computeNodes(text)
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
   * const doc = tempo()
   *   .h5('Hello, World!')
   *   .toString();
   * // Output: ##### Hello, World!
   * ```
   *
   * @param text A TempoTextInput type, which can be a string, Text instance, or a function that returns a string or Text instance.
   * @returns The TempoDocument instance with the heading appended.
   */
  public h5(text: TempoTextInput): this {
    this.nodes.push({
      type: 'heading',
      data: {
        level: 5,
        nodes: computeNodes(text)
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
   * const doc = tempo()
   *   .h6('Hello, World!')
   *   .toString();
   * // Output: ##### Hello, World!
   * ```
   *
   * @param text A TempoTextInput type, which can be a string, Text instance, or a function that returns a string or Text instance.
   * @returns The TempoDocument instance with the heading appended.
   */
  public h6(text: TempoTextInput): this {
    this.nodes.push({
      type: 'heading',
      data: {
        level: 6,
        nodes: computeNodes(text)
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
   * const doc = tempo()
   *  .paragraph('This is a paragraph of text.')
   *  .toString();
   * // Output: This is a paragraph of text.
   * ```
   *
   * @param text A TempoTextInput type, which can be a string, Text instance, or a function that returns a string or Text instance.
   * @returns The TempoDocument instance with the paragraph appended.
   */
  public paragraph(text: TempoTextInput): this {
    this.nodes.push({
      type: 'paragraph',
      data: {
        nodes: computeNodes(text)
      },
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
   * const doc = tempo()
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
   * @returns The TempoDocument instance with the table appended.
   */
  public table(tableDefinition: TempoTextInput[][]): this {
    const [header, ...rows] = tableDefinition;
    this.nodes.push({
      type: 'table',
      data: {
        nodes: [
          {
            type: 'header',
            order: undefined,
            data: {
              nodes: header.map(computeNodes)
            },
            computed: md.tableHeader(header.map(computeText))
          },
          ...(rows.map((row, i) => ({
            type: 'row',
            order: i,
            data: {
              nodes: row.map(computeNodes)
            },
            computed: md.tableRow(row.map(computeText))
          })) satisfies Array<TableRow<'row'>>)
        ]
      },
      computed: md.table(tableDefinition.map(row => row.map(computeText)))
    });
    return this;
  }

  /**
   * Append a raw HTML string to the document.
   *
   * @example
   * ```ts
   * const doc = tempo()
   *  .html('<p align="center">Hello, World!</p>')
   *  .toString();
   * // Output: <p align="center">Hello, World!</p>
   * ```
   *
   * @param html A string of raw HTML.
   * @returns The TempoDocument instance with the HTML appended.
   */
  public html(html: string): this {
    this.nodes.push({
      type: 'html',
      data: {
        nodes: computeNodes<'plaintext'>(html)
      },
      computed: html
    });
    return this;
  }

  /**
   * Append a code block to the document.
   *
   * @example
   * ```ts
   * const doc = tempo()
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
   * @returns The TempoDocument instance with the code block appended.
   */
  public codeBlock(code: string, language?: md.SupportedLanguage): this {
    this.nodes.push({
      type: 'codeBlock',
      data: {
        code,
        language,
        nodes: computeNodes<'code'>(code)
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
   * const doc = tempo()
   *   .blockQuote('This is a block quote.')
   *   .toString();
   * // Output: > This is a block quote.
   * ```
   *
   * @param text A TempoTextInput type, which can be a string, Text instance, or a function that returns a string or Text instance.
   * @returns The TempoDocument instance with the block quote appended.
   */
  public blockQuote(text: TempoTextInput): this {
    this.nodes.push({
      type: 'blockQuote',
      data: {
        nodes: computeNodes(text)
      },
      computed: md.blockQuote(computeText(text))
    });
    return this;
  }

  /**
   * Append an image to the document.
   *
   * @example
   * ```ts
   * const doc = tempo()
   *   .image('Alt text', 'https://example.com/image.png')
   *   .toString();
   * // Output: ![Alt text](https://example.com/image.png)
   * ```
   *
   * @param text A TempoTextInput type, which can be a string, Text instance, or a function that returns a string or Text instance.
   * @param src A string of the image source.
   * @returns The TempoDocument instance with the image appended.
   */
  public image(text: string, src: string): this {
    this.nodes.push({
      type: 'image',
      data: {
        alt: text,
        src,
        nodes: []
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
   * const doc = tempo()
   *  .break()
   *  .toString();
   * // Output: ---
   * ```
   *
   * @returns The TempoDocument instance with the thematic break appended.
   */
  public break(): this {
    this.nodes.push({
      type: 'break',
      data: {
        nodes: []
      },
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
   * const doc = tempo()
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
   * @returns The TempoDocument instance with the number list appended.
   */
  public numberList(text: TempoTextInput[]): this {
    this.nodes.push({
      type: 'numberList',
      data: {
        nodes: text.map((t, i) => ({
          order: i,
          type: 'listItem',
          nodes: computeNodes(t),
          computed: md.li(computeText(t), i)
        })),
      },
      computed: md.ol(text.map(computeText))
    });
    return this;
  }

  /**
   * Append a bullet list to the document.
   *
   * @example
   * ```ts
   * const doc = tempo()
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
   * @returns The TempoDocument instance with the bullet list appended.
   */
  public bulletList(text: TempoTextInput[]): this {
    this.nodes.push({
      type: 'bulletList',
      data: {
        nodes: text.map(t => ({
          type: 'listItem',
          order: undefined,
          nodes: computeNodes(t),
          computed: md.li(computeText(t))
        }))
      },
      computed: md.ul(text.map(computeText))
    });
    return this;
  }

  /**
   * Append an [alert](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax#alerts) to the document.
   * 
   * @example
   *  ```ts
   * const doc = tempo()
   *  .alert('This is a note.')
   *  .toString();
   * // Output:
   * // > [!NOTE]
   * // This is a note.
   * 
   * @see https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax#alerts
   * 
   * @param text A TempoTextInput type, which can be a string, Text instance, or a function that returns a string or Text instance.
   * @param type the type of alert to render, defaults to 'note'
   * @returns The TempoDocument instance with the alert appended. 
   */
  public alert(text: TempoTextInput, type: AlertType = 'note'): this {
    this.nodes.push({
      type: 'alert',
      data: {
        type,
        nodes: computeNodes(text)
      },
      computed: md.alert(computeText(text), type)
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
   * const doc = tempo()
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
   * @warning This method is experimental and may change in the future.
   * @example
   * ```ts
   * const doc = tempo()
   *  .h1('Hello, World!')
   *  .paragraph('This is a paragraph of text.')
   *  .toJSON();
   * // Output:
   * // [
   * //   {
   * //     "type": "heading",
   * //     "data": {
   * //       "level": 1,
   * //       "nodes": [
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
   * //     "data": {
   * //       "nodes": [ ... ],
   * //     },
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
