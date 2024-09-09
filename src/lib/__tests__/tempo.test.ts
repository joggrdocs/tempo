import { describe , it, expect } from 'vitest';

import { TempoDoc } from '../tempo-doc';
import { createTempo } from '../tempo';

describe('tempo', () => {
  it('should return a doc', () => {
    expect(createTempo()).toBeInstanceOf(TempoDoc);
  });
});
