import { TempoDocument, type TempoDocumentNode } from './TempoDocument';

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

/**
 * Create a new Document instance and build, append, or modify the DocumentNodes.
 *
 * @example
 * ```ts
 * const doc = tempo()
 *  .h1('Hello, World!')
 *  .paragraph((text) => {
 *    return text
 *      .plainText('This is a paragraph with ')
 *      .link('a link', 'https://example.com')
 *  })
 *  .bulletList([
 *    'Item 1',
 *    (text) => text.bold('Item 2'),
 *    (text) => text.italic('Item 3')
 *  ])
 *  .toString();
 * ```
 *
 * @param documentNodes A list of DocumentNodes to initialize the Document.
 * @returns A new Document instance.
 */
const tempo = (documentNodes?: TempoDocumentNode[]): TempoDocument => {
  return new TempoDocument(documentNodes);
};

export default tempo;
