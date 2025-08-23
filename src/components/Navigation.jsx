import React, { useState } from 'react';
import SearchInput from "./SearchInput.jsx";

const Navigation = ({ setHomePage, setServicesPage, onServicesPage, search, setSearch }) => {

  const scopedStyles = {
    heading: {
      fontSize: "2rem",
      fontWeight: "bold",
      color: "#1a202c"
    },
    container: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      // marginBottom: "1rem",
      borderBottom: "1px solid #e2e8f0",
      padding: "1rem 2rem"
    },
    button: {
      fontWeight: "bold",
      fontSize: "1.2rem",
      padding: "0.5rem 1rem",
      backgroundColor: "unset",
      // color: "#000",
      border: "2px solid #c6d0ddff",
      borderRadius: "0.375rem",
      cursor: "pointer",
    },
  };

  return (
    <nav>
      <div style={{ ...scopedStyles.container, justifyContent: 'center' }}>
        <div className="left">
          <button type="button" className="button-shadow" onClick={() => setHomePage(false)}>
            <h3 style={{ margin: 0 }}>Home</h3>
          </button>
        </div>
        <div className="right" style={{ display: "flex", flexGrow: 1, justifyContent: "end", alignItems: 'center', gap: "0.8rem" }}>
          
          { onServicesPage &&
            <div className="center-box" >
              <SearchInput value={search} onChange={setSearch} /> 
            </div>
          }
          
          { onServicesPage 
            ? (
            
              <button type="button" className="border-light" onClick={() => setServicesPage(false)}>
                Estimate
              </button>)
            : (<button type="button" className="border-light" onClick={() => setServicesPage(true)}>
                Services
              </button>)
          }
        </div>
      </div>
    </nav>  
  );
};

export default Navigation;