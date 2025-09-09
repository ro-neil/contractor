import React, { useState } from 'react';

const QuantityInput = ({ value, onChange, placeholder, id, name, operators=true, onPlus, onMinus }) => {

  const handleChange = (e) => {
    // Only allow numeric input and limit to 10 digits
    let inputValue = e.target.value.replace(/\D/g, '').slice(0, 6);
    onChange(inputValue);
  };

  return (
    <>
    {operators && <button className="operator minus-operator" onClick={onMinus}>&#45;</button>}
    <input
        id={id}
        name={name}
        type="text"
        value={value}
        onChange={handleChange}
        placeholder={placeholder || 'Value'}
        pattern='^\d{0,6}$'
        style={{
            padding: '0.35rem 0.5rem',
            borderRadius: '0.9rem',
            border: '1px solid #e2e8f0',
            outline: 'none',
            fontSize: '1em',
            fontWeight: '600',
            backgroundColor: '#f7fafc',
            textAlign: 'center',
            color: '#2d3748'         
        }}
    />
    {operators && <button className="operator plus-operator" onClick={onPlus}>&#43;</button>}
    </>
  );
};

export default QuantityInput;