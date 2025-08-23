import React from 'react';

const SearchInput = ({value, onChange, placeholder}) => {
    const handleChange = (e) => {
        onChange(e.target.value);
    };

    return (
        <input 
            id="searchInput"
            type="text" 
            placeholder={placeholder || "Search..."}
            style={{
                width: "16ch",
                padding: "0.5rem 1rem",
                borderRadius: "0.375rem",
                border: "1px solid #e2e8f0",
                outline: "none",
                fontSize: "1rem",
                // marginBottom: "1.5rem",
                fontWeight: "600",
                backgroundColor: "#f7fafc",
                height: "1.5rem",
            }}
            value={value}
            onChange={handleChange}
        />
    );
};

export default SearchInput;