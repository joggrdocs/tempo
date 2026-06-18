export interface DetailsConfig {
  summary: string;
  content: string;
}

/**
 * Creates a details element.
 *
 * @example
 * ```ts
 * const details = details({
 *  summary: 'Click me',
 *  content: 'This is the content of the details element.'
 * });
 * ```
 *
 * @param config - The configuration for the details element.
 * @returns The details element as a string.
 */
export function details(config: DetailsConfig): string {
  return `
<details>
  <summary>${config.summary}</summary>

  ${config.content}

</details>
  `.trim();
}
