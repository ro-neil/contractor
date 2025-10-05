import React from 'react';

const SearchInput = ({ value, onChange, placeholder, id }) => {
    const handleChange = (e) => {
        onChange(e.target.value);
    };

    const handleClear = () => {
        onChange('');
    };

    return (
        <div
            className="search-input-container"
            style={{
                position: 'relative',
                width: '36ch',
                display: 'flex',
                alignItems: 'center',
            }}
        >
            <input
                id={id || 'searchInput'}
                className="search-input"
                type="search"
                placeholder={placeholder || 'Search...'}
                style={{
                    width: '100%',
                    padding: '0.5rem',
                    paddingRight: '2.5rem', // space for clear button
                    borderRadius: '0.3rem',
                    border: '1px solid #e2e8f0',
                    outline: 'none',
                    fontSize: '1.1em',
                    backgroundColor: '#f7fafc',
                    height: '2.8rem',
                    color: '#606060',
                    fontStyle: 'italic',
                }}
                value={value}
                onChange={handleChange}
            />

            {/* Show Clear Button when value is not empty */}
            {value && (
                <button
                    onClick={handleClear}
                    type="button"
                    aria-label="Clear"
                    style={{
                        position: 'absolute',
                        right: '0.5rem',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        color: '#999',
                        lineHeight: 1,
                        padding: "unset",
                        fontWeight: "bold",
                        display: 'light-dark(none, inline)'
                    }}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" height="16px" viewBox="0 -960 960 960" width="16px" fill="#606060">
                        <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/>
                    </svg>
                </button>
            )}

            {/* Show Search Icon when input is empty */}
            {!value && (
                <div
                    style={{
                        position: 'absolute',
                        right: '0.5rem',
                        pointerEvents: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <svg
                        className="icon"
                        xmlns="http://www.w3.org/2000/svg"
                        height="16"
                        width="16"
                        fill="#606060"
                        viewBox="0 0 24 24"
                    >
                        <path d="M10 2a8 8 0 105.29 14.29l4.7 4.7 1.42-1.42-4.7-4.7A8 8 0 0010 2zm0 2a6 6 0 110 12 6 6 0 010-12z" />
                    </svg>
                </div>
            )}
        </div>
    );
};

export default SearchInput;
