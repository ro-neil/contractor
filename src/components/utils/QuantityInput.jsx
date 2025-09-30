import React, { useState } from 'react';

const QuantityInput = ({ value, onChange, onBlur, placeholder, id, name, operators=true, onPlus, onMinus }) => {

  return (
    <>
    {operators && <button className="operator minus-operator" onClick={onMinus}>&#45;</button>}
    <input
        id={id}
        name={name}
        className='input-field'
        type="text"
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder || 'Value'}
        pattern='^\d{0,6}$'
        style={{
            padding: '0.35rem 0.5rem',
            borderRadius: '0.9rem',
            border: '1px solid #e2e8f0',
            outline: 'none',
            fontSize: '1em',
            fontWeight: '600',
            // backgroundColor: '#f7fafc',
            textAlign: 'center',
            color: 'var(--color-dark)'         
        }}
    />
    {operators && <button className="operator plus-operator" onClick={onPlus}>&#43;</button>}
    </>
  );
};

export default QuantityInput;