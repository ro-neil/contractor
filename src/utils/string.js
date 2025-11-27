/**
 * Converts a string to title case, capitalizing the first letter of each word.
 *
 * @param {string} str - The input string to convert.
 * @returns {string} The converted string in title case.
 */
const titleCase = (str) => {
  return str.toLowerCase()
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
}

const camelCase = (str) => {
  return str
    .toLowerCase()
    .split(' ')
    .map((word, index) => {
      if (index === 0) return word;
        return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join('');
}

export { titleCase, camelCase };
