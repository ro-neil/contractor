import React from 'react';

const formatCurrency = (figure, currency = 'USD', separator = ',') => {
  const num = parseFloat(figure);
  const formattedNum = num.toLocaleString('en-US', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
    currencyDisplay: 'symbol',
    useGrouping: true,
    groupingSeparator: separator
  });

  return formattedNum;
}

const Currency = ({ figure, currency = 'USD', separator = ',', fontSize = '1.1rem' }) => {
  const formattedValue = formatCurrency(figure, currency, separator);
  return (
    <>
        <span style={{ fontWeight: 'bold', color: '#229d3cff', fontSize: fontSize }}>
            {formattedValue}
        </span>
    </>
  );
};

export default Currency;