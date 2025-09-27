import React from 'react';

const SearchInput = ({ value, onChange, placeholder, id }) => {
    const handleChange = (e) => {
        onChange(e.target.value);
    };

    return (
        <div className='search-input-container' style={{
            position: 'relative',
            width: '40ch',
            display: 'flex',
            alignItems: 'center',
        }}>
        
            <input
                id={id || "searchInput"}
                className='search-input'
                type="search"
                placeholder={placeholder || "Search..."}
                style={{
                    width: '100%',
                    padding: '0.5rem',
                    borderRadius: '0.3rem',
                    border: '1px solid #e2e8f0',
                    outline: 'none',
                    fontSize: '1rem',
                    backgroundColor: '#f7fafc',
                    height: '2.5rem',
                    color: '#606060',
                    fontStyle: 'italic',
                }}
                value={value}
                onChange={handleChange}
            />

            {/* Magnifying Glass Icon */}
            {!value && (
                <div style={{
                position: 'absolute',
                right: '0.5rem',
                pointerEvents: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="16"
                    width="16"
                    fill="#606060"
                    viewBox="0 0 24 24"
                >
                    <path d="M10 2a8 8 0 105.29 14.29l4.7 4.7 1.42-1.42-4.7-4.7A8 8 0 0010 2zm0 2a6 6 0 110 12 6 6 0 010-12z" />
                </svg>
            </div>)}
        </div>
    );
};

export default SearchInput;