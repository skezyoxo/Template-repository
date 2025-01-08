import { capitalizeFirstLetter } from './string';

describe('capitalizeFirstLetter', () => {
  it('capitalizes the first letter of a string', () => {
    expect(capitalizeFirstLetter('hello')).toBe('Hello');
  });

  it('returns empty string for empty input', () => {
    expect(capitalizeFirstLetter('')).toBe('');
  });

  it('works with already capitalized strings', () => {
    expect(capitalizeFirstLetter('Hello')).toBe('Hello');
  });

  it('handles single letter strings', () => {
    expect(capitalizeFirstLetter('a')).toBe('A');
  });
});
