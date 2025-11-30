import React from 'react';

const formatCurrency = (figure, currency = 'USD', separator = ',', dp = 0) => {
  const num = parseFloat(figure);
  const formattedNum = num.toLocaleString('en-US', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: dp,
    currencyDisplay: 'symbol',
    useGrouping: true,
    groupingSeparator: separator
  });

  return formattedNum;
}

const Currency = ({ figure, currency = 'USD', separator = ',' , dp = 2 }) => {
  const formattedValue = formatCurrency(figure, currency, separator, dp);
  return (
    <>
        <span className='currency-value'>
            {formattedValue}
        </span>
    </>
  );
};

export default Currency;