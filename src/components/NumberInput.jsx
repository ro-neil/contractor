import React, { useState } from 'react';

const NumberInput = ({ value, onChange, placeholder, id, name }) => {

  const handleChange = (e) => {
    // Only allow numeric input and limit to 10 digits
    let inputValue = e.target.value.replace(/\D/g, '').slice(0, 6);
    onChange(inputValue);
  };

  return (
    <input
        id={id}
        name={name}
        type="text"
        value={value}
        onChange={handleChange}
        placeholder={placeholder || 'Measurement'}
        pattern='^\d{0,6}$'
        style={{
            maxWidth: '14ch',
            padding: '0.35rem 0.5rem',
            borderRadius: '0.375rem',
            border: '1px solid #e2e8f0',
            outline: 'none',
            fontSize: '1em',
            fontWeight: '600',
            backgroundColor: '#f7fafc',
            textAlign: 'center',
            color: '#2d3748'         
        }}
    />
  );
};

export default NumberInput;