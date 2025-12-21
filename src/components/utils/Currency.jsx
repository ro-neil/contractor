import React from 'react';

/**
 * Renders a number as a formatted currency value with symbol (e.g., $1,234.56).
 * Uses Intl.NumberFormat for reliable, locale-aware formatting.
 *
 * @param {number|string} figure - The number to format (can be string or number)
 * @param {string} [currency='USD'] - Currency code (ISO 4217)
 * @param {number} [maximumFractionDigits=2] - Max decimal places (0–20)
 * @param {string} [locale='en-US'] - Locale for formatting (affects separators, symbols)
 * @param {boolean} [showSymbol=true] - Whether to show the currency symbol
 * @param {boolean} [showNegative=true] - Whether to show negative values with parentheses or minus
 * @param {string} [className=''] - Optional additional class for styling
 */
const Currency = ({
  figure,
  currency = 'USD',
  maximumFractionDigits = 2,
  locale = 'en-US',
  showSymbol = true,
  showNegative = true,
  className = '',
}) => {
  // Handle invalid or missing input gracefully
  if (!!figure == false || isNaN(figure)) {
    return <span className={`currency-value ${className}`}>-</span>;
  }

  const num = parseFloat(figure);

  const formatter = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    maximumFractionDigits,
    minimumFractionDigits: maximumFractionDigits, // Ensure consistent decimals
    currencyDisplay: showSymbol ? 'symbol' : 'code', // 'USD' or '$'
    useGrouping: true,
  });

  // Handle negative values (common in estimates: red or parentheses)
  const formatted = formatter.format(Math.abs(num));

  return (
    <span
      className={`currency-value ${num < 0 ? 'negative' : ''} ${className}`}
      aria-label={`${num < 0 ? 'Negative' : ''} ${currency} ${Math.abs(num).toFixed(maximumFractionDigits)}`}
    >
      {num < 0 && showNegative ? `(${formatted})` : formatted}
    </span>
  );
};

export default Currency;