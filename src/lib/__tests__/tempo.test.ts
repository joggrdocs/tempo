import { describe , it, expect } from 'vitest';

import { TempoDoc } from '../tempo-doc';
import tempo from '../tempo';

describe('tempo', () => {
  it('should return a doc', () => {
    expect(tempo()).toBeInstanceOf(TempoDoc);
  });
});
