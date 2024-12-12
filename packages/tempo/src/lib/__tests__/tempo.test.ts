import { describe, it, expect } from 'vitest';

import { TempoDocument } from '../tempo-document';
import { tempo } from '../tempo';

describe('tempo', () => {
  it('should return a document', () => {
    expect(tempo()).toBeInstanceOf(TempoDocument);
  });
});
