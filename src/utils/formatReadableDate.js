/**
 * Formats a date into a human-readable string like "Dec 19, 2025"
 * using the user's local timezone.
 *
 * @param {Date|string|number} date - A Date object, ISO string, or timestamp.
 * @returns {string} - Formatted date string, e.g., "Dec 19, 2025".
 */
export const formatReadableDate = (date) => {
  if (!date) return '';
  const dateObj = date instanceof Date ? date : new Date(date);
  if (isNaN(dateObj.getTime())) return '';

  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(dateObj);
};