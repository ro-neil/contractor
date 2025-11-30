/**
 * Converts a string to title case, capitalizing the first letter of each word.
 *
 * @param {string} str - The input string to convert.
 * @returns {string} The converted string in title case.
 */
export const titleCase = (str) => str.replace(/\b\w/g, char => char.toUpperCase());

export const camelCase = (str) => {
  return str
    .toLowerCase()
    .split(' ')
    .map((word, index) => {
      if (index === 0) return word;
        return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join('');
}

export const snakeCase = (str) => {
  return str
    .toLowerCase()
    .trim()
    .replace(/[\s\W-]+/g, '_');
}

export const truncate = (str = '', max = 10, tail = ' …') => {
  if(str.length <= max) {
    return str;
  }
  return str.slice(0, max) + tail;
}

export const slugify = (str) => {
  return str
    .toLowerCase()
    .trim()
    .replace(/[\s\W-]+/g, '-');
}

export const unslugify = (str) => {
  return str
    .replace(/-/g, ' ')
    .replace(/\b\w/g, char => char.toUpperCase());
}
