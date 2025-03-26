import type { JsonObject } from 'type-fest';
import YAML from 'yaml';

export type Frontmatter = JsonObject;

/**
 * Converts a JSON/JS/TS object to a YAML frontmatter string.
 *
 * @param value - JSON object to convert.
 * @returns YAML frontmatter string.
 */
export function frontmatter<T extends Frontmatter>(value: T): string {
  const yaml = YAML.stringify(value);

  return ['---', yaml.trim(), '---'].join('\n');
}
