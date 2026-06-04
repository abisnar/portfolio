/** Up to `max` uppercase initials from a name, e.g. "Allan Bisnar" → "AB". */
export function initials(name: string, max = 2): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => word[0])
    .join('')
    .slice(0, max)
    .toUpperCase();
}
