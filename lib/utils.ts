/**
 * Normalizes a string key by converting it to lowercase,
 * replacing special characters, and standardizing separators.
 * This is a client-safe utility function.
 */
export function normalizeKey(value: string): string {
  return value
    .toLowerCase()
    .replace(/[@&]/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

