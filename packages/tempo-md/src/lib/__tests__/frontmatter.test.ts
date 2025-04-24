import { describe, it, expect } from 'vitest';
import { frontmatter } from '../frontmatter';

describe('frontmatter', () => {
  it('should convert a JSON object to a YAML frontmatter string', () => {
    const value = { title: 'Hello, World!' };
    const result = frontmatter(value);

    expect(result).toBe('---\ntitle: Hello, World!\n---');
  });
});