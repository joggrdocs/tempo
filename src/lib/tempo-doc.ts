import type * as TypeFest from 'type-fest';

import * as md from './markdown/markdown';
import {
  type PlainTextNode,
  type TempoTextInput,
  type TempoTextNode,
  computeNodes,
  computeText,
} from './tempo-text';

/*
|==========================================================================
| Document
|==========================================================================
|
| Wrapper around markdown functions to make it easier to build a TempoDoc,
| using a chaining API.
|
*/

export type DocNodeType =
  | 'heading'
  | 'paragraph'
  | 'table'
  | 'html'
  | 'code-block'
  | 'blockquote'
  | 'image'
  | 'break'
  | 'list-number'
  | 'list-bullet'
  | 'alert';

export type HeadingNode = DocNode<
  'heading',
  TempoTextNode[],
  {
    level: 1 | 2 | 3 | 4 | 5 | 6;
  }
>;

export type ParagraphNode = DocNode<'paragraph', TempoTextNode[]>;

export interface TableNodeRow<T extends 'row' | 'header'> {
  type: T;
  order: T extends 'row' ? number : undefined;
  data: {
    nodes: TempoTextNode[][];
  };
  computed: string;
}

export type TableNode = DocNode<
  'table',
  [TableNodeRow<'header'>, ...Array<TableNodeRow<'row'>>]
>;

export type HtmlNode = DocNode<'html', PlainTextNode[]>;

export type CodeBlockNode = DocNode<
  'code-block',
  PlainTextNode[],
  {
    code: string;
    language?: md.CodeBlockLanguage;
  }
>;

export type BlockQuoteNode = DocNode<'blockquote', TempoTextNode[]>;

export type ImageNode = DocNode<
  'image',
  [],
  {
    alt: TempoTextNode[];
    src: string;
    href?: string;
  }
>;

export type BreakNode = DocNode<'break', []>;

export interface ListNodeItem<T extends 'list-number' | 'list-bullet'> {
  type: 'list-item';
  order: T extends 'list-number' ? number : undefined;
  data: {
    nodes: TempoTextNode[];
  };
  computed: string;
}

export type BulletListNode = DocNode<
  'list-bullet',
  ListNodeItem<'list-bullet'>[]
>;

export type NumberListNode = DocNode<
  'list-number',
  ListNodeItem<'list-number'>[]
>;

export type AlertType = 'note' | 'important' | 'warning' | 'tip' | 'caution';

export type AlertNode = DocNode<'alert', TempoTextNode[], { type: AlertType }>;

export type TempoDocNode =
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
| TempoDoc Class
|----------------------------------
|
| The primary class for building a TempoDoc. It is a wrapper around the
| markdown functions, and provides a chaining API for building a TempoDoc.
|
*/

/**
 * TempoDoc class.
 *
 * A class for building a TempoDoc, using a chaining API.
 */
export class TempoDoc {
  private readonly nodes: TempoDocNode[];

  /**
   * Create a new TempoDoc instance with the ability to pre-append nodes.
   *
   * @param nodes An array of TempoDocNode types.
   */
  constructor(nodes?: TempoDocNode[]) {
    this.nodes = nodes ?? [];
  }

  /*
  |------------------
  | Headings
  |------------------
  */

  /**
   * Append a heading (h1) to the TempoDoc.
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
   * @returns The TempoDoc instance with the heading appended.
   */
  public h1(text: TempoTextInput): this {
    this.nodes.push({
      type: 'heading',
      data: {
        level: 1,
        nodes: computeNodes(text),
      },
      computed: md.h1(computeText(text)),
    });
    return this;
  }

  /**
   * Append a heading (h2) to the TempoDoc.
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
   * @returns The TempoDoc instance with the heading appended.
   */
  public h2(text: TempoTextInput): this {
    this.nodes.push({
      type: 'heading',
      data: {
        level: 2,
        nodes: computeNodes(text),
      },
      computed: md.h2(computeText(text)),
    });
    return this;
  }

  /**
   * Append a heading (h3) to the TempoDoc.
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
   * @returns The TempoDoc instance with the heading appended.
   */
  public h3(text: TempoTextInput): this {
    this.nodes.push({
      type: 'heading',
      data: {
        level: 3,
        nodes: computeNodes(text),
      },
      computed: md.h3(computeText(text)),
    });
    return this;
  }

  /**
   * Append a heading (h4) to the TempoDoc.
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
   * @returns The TempoDoc instance with the heading appended.
   */
  public h4(text: TempoTextInput): this {
    this.nodes.push({
      type: 'heading',
      data: {
        level: 4,
        nodes: computeNodes(text),
      },
      computed: md.h4(computeText(text)),
    });
    return this;
  }

  /**
   * Append a heading (h5) to the TempoDoc.
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
   * @returns The TempoDoc instance with the heading appended.
   */
  public h5(text: TempoTextInput): this {
    this.nodes.push({
      type: 'heading',
      data: {
        level: 5,
        nodes: computeNodes(text),
      },
      computed: md.h5(computeText(text)),
    });
    return this;
  }

  /**
   * Append a heading (h6) to the TempoDoc.
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
   * @returns The TempoDoc instance with the heading appended.
   */
  public h6(text: TempoTextInput): this {
    this.nodes.push({
      type: 'heading',
      data: {
        level: 6,
        nodes: computeNodes(text),
      },
      computed: md.h6(computeText(text)),
    });
    return this;
  }

  /*
  |------------------
  | Text Elements
  |------------------
  */

  /**
   * Append a paragraph to the TempoDoc.
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
   * @returns The TempoDoc instance with the paragraph appended.
   */
  public paragraph(text: TempoTextInput): this {
    this.nodes.push({
      type: 'paragraph',
      data: {
        nodes: computeNodes(text),
      },
      computed: md.paragraph(computeText(text)),
    });
    return this;
  }

  /*
  |------------------
  | Special Elements
  |------------------
  */

  /**
   * Append a table to the TempoDoc.
   *
   * @example
   * ```ts
   * const doc = tempo()
   *  .table({
   *    header: ['Name', 'email'],
   *    rows: [
   *      ['John Doe', 'jdoe@gmail.com'],
   *      ['Jane Doe', 'jane@gmail.com']
   *    ]
   *  })
   *  .toString();
   * // Output:
   * // | Name     | email          |
   * // |----------|----------------|
   * // | John Doe | jdoe@gmail.com |
   * // | Jane Doe | jane@gmail.com |
   * ```
   *
   * @param payload The table payload.
   * @param payload.headers An array of TempoTextInput types, which can be a string, Text instance, or a function that returns a string or Text instance.
   * @param payload.rows An array of arrays of TempoTextInput types, which can be a string, Text instance, or a function that returns a string or Text instance.
   * @returns The TempoDoc instance with the table appended.
   */
  public table(payload: {
    header: TempoTextInput[];
    rows: TempoTextInput[][];
  }): this {
    const { header, rows } = payload;
    this.nodes.push({
      type: 'table',
      data: {
        nodes: [
          {
            type: 'header',
            order: undefined,
            data: {
              nodes: header.map(computeNodes),
            },
            computed: md.tableHeader(header.map(computeText)),
          } satisfies TableNodeRow<'header'>,
          ...(rows.map((row, i) => ({
            type: 'row',
            order: i,
            data: {
              nodes: row.map(computeNodes),
            },
            computed: md.tableRow(row.map(computeText)),
          })) satisfies Array<TableNodeRow<'row'>>),
        ],
      },
      computed: md.table([header, ...rows].map((row) => row.map(computeText))),
    });
    return this;
  }

  /**
   * Append a raw HTML string to the TempoDoc.
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
   * @returns The TempoDoc instance with the HTML appended.
   */
  public html(html: string): this {
    this.nodes.push({
      type: 'html',
      data: {
        nodes: computeNodes<'plaintext'>(html),
      },
      computed: html,
    });
    return this;
  }

  /**
   * Append a code block to the TempoDoc.
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
   * @returns The TempoDoc instance with the code block appended.
   */
  public codeBlock(code: string, language?: md.CodeBlockLanguage): this {
    this.nodes.push({
      type: 'code-block',
      data: {
        code,
        language,
        nodes: computeNodes<'code'>(code),
      },
      computed: md.codeBlock(code, language),
    });
    return this;
  }

  /**
   * Append a block quote to the TempoDoc.
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
   * @returns The TempoDoc instance with the block quote appended.
   */
  public blockQuote(text: TempoTextInput): this {
    this.nodes.push({
      type: 'blockquote',
      data: {
        nodes: computeNodes(text),
      },
      computed: md.blockQuote(computeText(text)),
    });
    return this;
  }

  /**
   * Append an image to the TempoDoc.
   *
   * @example
   * ```ts
   * const doc = tempo()
   *   .image({
   *     alt: 'Alt text',
   *     src: 'https://example.com/image.png',
   *   })
   *   .toString();
   * // Output: ![Alt text](https://example.com/image.png)
   *
   * const docWithLink = tempo()
   *   .image({
   *     alt: 'Alt text',
   *     src: 'https://example.com/image.png',
   *     href: 'https://example.com',
   *   })
   *   .toString();
   * // Output: [![Alt text](https://example.com/image.png)](https://example.com)
   * ```
   *
   * @param payload The image payload.
   * @param payload.alt A TempoTextInput type, which can be a string, Text instance, or a function that returns a string or Text instance.
   * @param payload.src A string of the image source.
   * @param payload.href An optional string of the image link, this will make the image a link.
   * @returns The TempoDoc instance with the image appended.
   */
  public image(payload: {
    alt: TempoTextInput;
    src: string;
    href?: string;
  }): this {
    this.nodes.push({
      type: 'image',
      data: {
        alt: computeNodes(payload.alt),
        src: payload.src,
        nodes: [],
      },
      computed: payload.href
        ? md.link(md.image(computeText(payload.alt), payload.src), payload.href)
        : md.image(computeText(payload.alt), payload.src),
    });
    return this;
  }

  /**
   * Append a thematic break to the TempoDoc.
   *
   * @example
   * ```ts
   * const doc = tempo()
   *  .break()
   *  .toString();
   * // Output: ---
   * ```
   *
   * @returns The TempoDoc instance with the thematic break appended.
   */
  public break(): this {
    this.nodes.push({
      type: 'break',
      data: {
        nodes: [],
      },
      computed: md.thematicBreak(),
    });
    return this;
  }

  /**
   * Alias to `break`, to append a thematic break to the TempoDoc.
   *
   * @returns The TempoDoc instance with the thematic break appended.
   */
  public hr(): this {
    return this.break();
  }

  /*
  |------------------
  | Lists
  |------------------
  */

  /**
   * Append a number list to the TempoDoc.
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
   * @returns The TempoDoc instance with the number list appended.
   */
  public numberList(text: TempoTextInput[]): this {
    this.nodes.push({
      type: 'list-number',
      data: {
        nodes: text.map((t, i) => ({
          order: i,
          type: 'list-item',
          data: {
            nodes: computeNodes(t),
          },
          computed: md.li(computeText(t), i),
        })),
      },
      computed: md.ol(text.map(computeText)),
    });
    return this;
  }

  /**
   * Append a bullet list to the TempoDoc.
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
   * @returns The TempoDoc instance with the bullet list appended.
   */
  public bulletList(text: TempoTextInput[]): this {
    this.nodes.push({
      type: 'list-bullet',
      data: {
        nodes: text.map((t) => ({
          type: 'list-item',
          order: undefined,
          data: {
            nodes: computeNodes(t),
          },
          computed: md.li(computeText(t)),
        })),
      },
      computed: md.ul(text.map(computeText)),
    });
    return this;
  }

  /**
   * Append an [alert](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax#alerts) to the TempoDoc.
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
   * @returns The TempoDoc instance with the alert appended.
   */
  public alert(text: TempoTextInput, type: AlertType = 'note'): this {
    this.nodes.push({
      type: 'alert',
      data: {
        type,
        nodes: computeNodes(text),
      },
      computed: md.alert(computeText(text), type),
    });
    return this;
  }

  /*
  |------------------
  | Outputs
  |------------------
  */

  /**
   * Convert the TempoDoc to string representation, that can be used for rendering.
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
   * @returns A string representation of the TempoDoc, that can be used for rendering.
   */
  public toString(): string {
    return this.nodes
      .map((section) => section.computed)
      .join('\n\n')
      .trim()
      .concat('\n');
  }

  /**
   * Convert the TempoDoc to a JSON representation, that can be used for serialization.
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
   * @returns A JSON representation of the TempoDoc, that can be used for serialization.
   */
  public toJSON(): TempoDocNode[] {
    return this.nodes;
  }
}

/*
|------------------
| Utils & Helpers
|------------------
*/

type DocNode<
  Type extends DocNodeType,
  Nodes extends unknown[],
  Data extends object = object,
> = TypeFest.Simplify<{
  type: Type;
  data: TypeFest.Merge<Data, { nodes: Nodes }>;
  computed: string;
}>;
