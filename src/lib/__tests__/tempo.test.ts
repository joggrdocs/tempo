import { TempoDocument } from '../TempoDocument';
import tempo from '../tempo';

describe('tempo', () => {
  it('should return a document', () => {
    expect(tempo()).toBeInstanceOf(TempoDocument);
  });
});
