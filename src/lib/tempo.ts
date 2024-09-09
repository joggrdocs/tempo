import { TempoDoc, type TempoDocNode } from './tempo-doc';

/*
|----------------------------------
| Public API
|----------------------------------
|
| The public API for creating a TempoDoc. It is a wrapper around the TempoDoc class
| and provides a chaining API for building a TempoDoc.
|
| NOTE:
| We do export the TempoDoc class, types, and interfaces, as we want to allow
| for custom implementations of the TempoDoc class.
|
*/

/**
 * Create a new TempoDoc instance and build, append, or modify the DocumentNodes.
 *
 * @example
 * ```ts
 * const doc = tempo()
 *  .h1('Hello, World!')
 *  .paragraph((text) => {
 *    return text
 *      .plainText('This is a paragraph with ')
 *      .link({
 *        href: 'https://example.com',
 *        title: 'a link'
 *      });
 *  })
 *  .bulletList([
 *    'Item 1',
 *    (text) => text.bold('Item 2'),
 *    (text) => text.italic('Item 3')
 *  ])
 *  .toString();
 * ```
 *
 * @param nodes A list of TempoDocNodes to initialize the TempoDoc.
 * @returns A new TempoDoc instance.
 */
export const createTempo = (nodes?: TempoDocNode[]): TempoDoc => {
  return new TempoDoc(nodes);
};
