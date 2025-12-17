/**
 * Formats a number as currency using Intl.NumberFormat for proper internationalization.
 * 
 * @param {number|string} figure - The numeric value to format
 * @param {string} currency - ISO currency code (default: 'USD')
 * @param {string} locale - Locale string (default: 'en-US')
 * @param {number} min_dp - Minimum decimal places (default: 2)
 * @param {number} max_dp - Maximum decimal places (default: 2)
 * @returns {string} Formatted currency string or empty string on invalid input
 */
export const formatCurrency = (
  figure,
  currency = 'USD',
  locale = 'en-US',
  minDecimalPlaces = 2,
  maxDecimalPlaces = 2
) => {
  const num = parseFloat(figure);

  // Guard clause: prevent NaN display
  if (isNaN(num)) {
    console.warn(`formatCurrency: Invalid figure provided: ${figure}`);
    return '';
  }

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: minDecimalPlaces,
    maximumFractionDigits: maxDecimalPlaces,
    currencyDisplay: 'symbol',
  }).format(num);
};