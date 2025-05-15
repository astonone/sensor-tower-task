import { remove as removeDiacritics } from 'diacritics';

const BLACKLISTED_SUFFIXES = [
    'studio', 'inc', 'ltd', 'games', 'entertainment', 'corp', 'co', 'group'
];

export function normalize(name: string): string {
    return removeDiacritics(name)
        .toLowerCase()
        .replace(new RegExp(`\\b(${BLACKLISTED_SUFFIXES.join('|')})\\b`, 'g'), '')
        .replace(/[^a-z0-9\s]/g, '')
        .replace(/\s+/g, ' ')
        .trim();
}

export function isGarbage(normalized: string): boolean {
    return (
        normalized.length < 2 ||
        /^[\s\-_.!?@()#*+0-9]+$/.test(normalized)
    );
}
