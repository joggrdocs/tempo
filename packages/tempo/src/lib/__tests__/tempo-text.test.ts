import { describe , it, expect, beforeEach, afterEach, vi } from 'vitest';


import { TempoText, computeNodes, computeText } from '../tempo-text';
import * as md from '@joggr/tempo-md';

let txt: TempoText;
beforeEach(() => {
  txt = new TempoText();
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe('computeText', () => {
  it('should compute text from `string`', () => {
    expect(computeText('Hello World!')).toEqual('Hello World!');
  });

  it('should compute text from `Text`', () => {
    expect(computeText(new TempoText().plainText('Hello World!'))).toEqual(
      'Hello World!'
    );
  });

  it('should compute text from `(Text) => Text | string`', () => {
    expect(computeText((text) => text.plainText('Hello World!'))).toEqual(
      'Hello World!'
    );
  });

  it('should throw for invalid text type', () => {
    expect(() => {
      computeText(1 as any);
    }).toThrow('Invalid text type');
  });
});

describe('computeNodes', () => {
  it('should compute nodes from `string`', () => {
    expect(computeNodes('Hello World!')).toEqual([
      {
        type: 'plaintext',
        data: undefined,
        computed: 'Hello World!',
      },
    ]);
  });

  it('should compute nodes from `Text`', () => {
    expect(computeNodes(new TempoText().plainText('Hello World!'))).toEqual([
      {
        type: 'plaintext',
        data: undefined,
        computed: 'Hello World!',
      },
    ]);
  });

  it('should compute nodes from `(Text) => Text | string`', () => {
    expect(computeNodes((text) => text.plainText('Hello World!'))).toEqual([
      {
        type: 'plaintext',
        data: undefined,
        computed: 'Hello World!',
      },
    ]);
  });

  it('should throw for invalid text type', () => {
    expect(() => {
      computeNodes(1 as any);
    }).toThrow('Invalid text type');
  });
});

describe('code', () => {
  it('should call md.code with the provided value', () => {
    const spy = vi.spyOn(md, 'code');
    const value = 'const foo = "bar";';
    txt.code(value);

    expect(spy).toHaveBeenCalledWith(value);
  });
});

describe('bold', () => {
  it('should call md.bold with the provided value', () => {
    const spy = vi.spyOn(md, 'bold');
    const value = 'Hello';
    txt.bold(value);

    expect(spy).toHaveBeenCalledWith(value);
  });
});

describe('italic', () => {
  it('should call md.italic with the provided value', () => {
    const spy = vi.spyOn(md, 'italic');
    const value = 'World';
    txt.italic(value);

    expect(spy).toHaveBeenCalledWith(value);
  });
});

describe('strikeThrough', () => {
  it('should call md.strikeThrough with the provided value', () => {
    const spy = vi.spyOn(md, 'strikeThrough');
    const value = 'Strike';
    txt.strikeThrough(value);

    expect(spy).toHaveBeenCalledWith(value);
  });
});

describe('link', () => {
  it('should call md.link with the provided value and href', () => {
    const spy = vi.spyOn(md, 'link');
    const value = 'Joggr.io';
    const href = 'https://joggr.io';
    txt.link(value, href);

    expect(spy).toHaveBeenCalledWith(value, href);
  });
});

describe('emoji', () => {
  it('should push the provided emoji value to the text', () => {
    const spy = vi.spyOn(md, 'emoji');
    const emoji = '👍';
    txt.emoji(emoji);
    expect(spy).toHaveBeenCalledWith(emoji);
  });

  it('should push the provided emoji alias to the text', () => {
    const spy = vi.spyOn(md, 'emoji');
    const emoji = 'smile';
    txt.emoji(emoji);
    expect(spy).toHaveBeenCalledWith(emoji);
  });
});

describe('nested', () => {
  let createText: () => TempoText;
  beforeEach(async () => {
    vi.restoreAllMocks();
    vi.resetModules();
    const textImport = await import('../tempo-text');
    createText = () => new textImport.TempoText();
  });

  it('should return the computed value', () => {
    const value = 'Hello World';
    const txt = createText();
    txt.bold((t) => t.link(value, 'https://example.com'));

    expect(txt.toString()).toEqual(`**[${value}](https://example.com)**`);
  });
});

describe('toString', () => {
  it('should return the computed value', () => {
    const value = 'Hello World';
    txt.plainText(value);

    expect(txt.toString()).toEqual(value);
  });
});

describe('outputs', () => {
  let createText: () => TempoText;
  beforeEach(async () => {
    vi.restoreAllMocks();
    vi.resetModules();
    const textImport = await import('../tempo-text');
    createText = () => new textImport.TempoText();
  });

  describe('toString', () => {
    it('should return the computed value', () => {
      const value = 'Hello World';
      const txtReal = createText()
        .plainText(value)
        .plainText(';')
        .bold(value)
        .plainText('/')
        .italic(value)
        .strikeThrough(value)
        .link(value, value);

      expect(txtReal.toString()).toEqual(
        `${value} ; **${value}** / _${value}_ ~~${value}~~ [${value}](${value})`
      );
    });
  });

  describe('toJSON', () => {
    it('should return the nodes', () => {
      const value = 'Hello World';
      const txtReal = createText()
        .plainText(value)
        .bold(value)
        .italic(value)
        .strikeThrough(value)
        .link(value, 'https://example.com');

      expect(txtReal.toJSON()).toEqual([
        {
          type: 'plaintext',
          data: undefined,
          computed: value,
        },
        {
          type: 'bold',
          data: {
            nodes: [
              {
                type: 'plaintext',
                data: undefined,
                computed: value,
              },
            ],
          },
          computed: `**${value}**`,
        },
        {
          type: 'italic',
          data: {
            nodes: [
              {
                type: 'plaintext',
                data: undefined,
                computed: value,
              },
            ],
          },
          computed: `_${value}_`,
        },
        {
          type: 'strikeThrough',
          data: {
            nodes: [
              {
                type: 'plaintext',
                data: undefined,
                computed: value,
              },
            ],
          },
          computed: `~~${value}~~`,
        },
        {
          type: 'link',
          data: {
            href: 'https://example.com',
            nodes: [
              {
                type: 'plaintext',
                data: undefined,
                computed: value,
              },
            ],
          },
          computed: `[${value}](https://example.com)`,
        },
      ]);
    });
  });
});
