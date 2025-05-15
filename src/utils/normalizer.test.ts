import { normalize, isGarbage } from './normalizer';

describe('normalize', () => {
    it('removes accents and blacklisted words', () => {
        const input = 'Ubisoft Montréal Studio Inc.';
        const output = normalize(input);
        expect(output).toBe('ubisoft montreal');
    });

    it('removes punctuation and excessive spaces', () => {
        const input = '  Sony!   Santa   Monica ';
        const output = normalize(input);
        expect(output).toBe('sony santa monica');
    });

    it('handles diacritics correctly', () => {
        const input = 'Zoë Kravitz';
        const output = normalize(input);
        expect(output).toBe('zoe kravitz');
    });

    it('returns empty string for non-letter input', () => {
        const input = '...';
        const output = normalize(input);
        expect(output).toBe('');
    });
});

describe('isGarbage', () => {
    it('returns true for very short strings', () => {
        expect(isGarbage('')).toBe(true);
        expect(isGarbage('-')).toBe(true);
        expect(isGarbage('0')).toBe(true);
    });

    it('returns true for strings with only punctuation or digits', () => {
        expect(isGarbage('...')).toBe(true);
        expect(isGarbage('0000')).toBe(true);
        expect(isGarbage('_-!?')).toBe(true);
    });

    it('returns false for valid normalized names', () => {
        expect(isGarbage('ubisoft montreal')).toBe(false);
        expect(isGarbage('sony')).toBe(false);
    });
});
