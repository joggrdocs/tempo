import tempo, { Document, Text } from '../index';
import { Document as DocumentClass } from '../lib/Document';
import { Text as TextClass } from '../lib/Text';

describe('tempo', () => {
  it('should export the correct types', () => {
    expect(typeof tempo).toBe('function');
    expect(tempo()).toBeInstanceOf(DocumentClass);
    expect(new Document()).toBeInstanceOf(DocumentClass);
    expect(new Text()).toBeInstanceOf(TextClass);
  });
});
