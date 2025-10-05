import React from 'react';
import './IncrementDecrementInput.css';

const NumberInput = ({
  id,
  className,
  name,
  value,
  onChange,
  onBlur,
  placeholder
}) => (
  <input
    id={id}
    name={name}
    className={`number-input ${className}`}
    type="text"
    value={value}
    onChange={onChange}
    onBlur={onBlur}
    placeholder={placeholder || 'Value'}
    pattern="^\d{0,6}$"
  />
);

const IncrementDecrementInput = ({
  id,
  name,
  value,
  onChange,
  onBlur,
  onPlus,
  onMinus,
  placeholder
}) => (
  <div className="increment-decrement-input">
    <button className="operator decrement-operator" title='Decrement Operator' onClick={onMinus}>
      <svg xmlns="http://www.w3.org/2000/svg" height="16px" viewBox="0 -960 960 960" width="16px" fill="currentColor"><path d="M200-440v-80h560v80H200Z"/></svg>
    </button>
    <NumberInput
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      placeholder={placeholder}
      inputMode="numeric"
    />
    <button className="operator increment-operator" title='Increment Operator' onClick={onPlus}>
      <svg xmlns="http://www.w3.org/2000/svg" height="16px" viewBox="0 -960 960 960" width="16px" fill="currentColor"><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/></svg>
    </button>

  </div>
);

export { IncrementDecrementInput as default, NumberInput };
