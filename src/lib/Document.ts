import * as md from './markdown/markdown';
import { Text, TextNode } from './Text';

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
| Util
|------------------
*/

export type TextInput = string | Text | ((text: Text) => Text | string);

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
    data: TextNode[];
  }> {
  type: 'heading';
}

export interface ParagraphNode extends BaseDocumentNode<TextNode[]> {
  type: 'paragraph';
}

interface TableRow<T extends 'row' | 'header'> {
  type: T;
  order: T extends 'row' ? number : undefined;
  data: TextNode[][];
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

export interface BlockQuoteNode extends BaseDocumentNode<TextNode[]> {
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
  data: TextNode[];
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

export type DocumentNode =
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

function formatTextNode(text: string): TextNode {
  return {
    type: 'plaintext',
    data: text,
    computed: text
  };
}

export function computeNodes(textInput: TextInput): TextNode[] {
  if (typeof textInput === 'string') {
    return [formatTextNode(textInput)];
  } else if (textInput instanceof Text) {
    return textInput.toJSON();
  } else if (typeof textInput === 'function') {
    const result = textInput(new Text());
    return computeNodes(result);
  } else {
    throw new Error('Invalid text type');
  }
}

export function computeText(textInput: TextInput): string {
  if (typeof textInput === 'string') {
    return textInput;
  } else if (textInput instanceof Text) {
    return textInput.toString();
  } else if (typeof textInput === 'function') {
    const result = textInput(new Text());
    return computeText(result);
  } else {
    throw new Error('Invalid text type');
  }
}

/*
|----------------------------------
| Document Class
|----------------------------------
|
| The primary class for building a document. It is a wrapper around the
| markdown functions, and provides a chaining API for building a document.
|
*/

export class Document {
  private nodes: DocumentNode[];

  constructor(documentNodes?: DocumentNode[]) {
    this.nodes = documentNodes ?? [];
  }

  /*
  |------------------
  | Headings
  |------------------
  */

  public h1(text: TextInput) {
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

  public h2(text: TextInput) {
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

  public h3(text: TextInput) {
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

  public h4(text: TextInput) {
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

  public h5(text: TextInput) {
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

  public h6(text: TextInput) {
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

  public paragraph(text: TextInput) {
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

  public table(tableRows: TextInput[][]) {
    const [header, ...rows] = tableRows;
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
      computed: md.table(tableRows.map(row => row.map(computeText)))
    });
    return this;
  }

  public html(html: string) {
    this.nodes.push({
      type: 'html',
      data: html,
      computed: html
    });
    return this;
  }

  public codeBlock(code: string, language?: md.SupportedLanguage) {
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

  public blockQuote(text: TextInput) {
    this.nodes.push({
      type: 'blockQuote',
      data: computeNodes(text),
      computed: md.blockQuote(computeText(text))
    });
    return this;
  }

  public image(text: string, src: string) {
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

  public break() {
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

  public numberList(text: TextInput[]) {
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

  public bulletList(text: TextInput[]) {
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

  public toString() {
    return this.nodes
      .map(section => section.computed)
      .join('\n\n')
      .trim()
      .concat('\n');
  }

  public toJSON() {
    return this.nodes;
  }
}

/*
|----------------------------------
| Public API
|----------------------------------
|
| The public API for creating a document. It is a wrapper around the Document class
| and provides a chaining API for building a document.
|
| NOTE:
| We do export the Document class, types, and interfaces, as we want to allow
| for custom implementations of the Document class.
|
*/

const createDocument = (documentNodes?: DocumentNode[]) =>
  new Document(documentNodes);
export default createDocument;
