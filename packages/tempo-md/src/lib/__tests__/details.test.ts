import { describe, expect, it } from 'vitest';
import { details } from '../details';

describe('details', () => {
  it('should return a string', () => {
    expect(details({ summary: 'Click me', content: 'This is the content of the details element.' })).toBe(
      `
<details>
  <summary>Click me</summary>

  This is the content of the details element.

</details>
  `.trim()
    );
  });
});