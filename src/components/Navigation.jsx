import React, { useState } from 'react';
import SearchInput from "./SearchInput.jsx";
import Dropdown from "./Dropdown.jsx";
import { setStarted } from './GetStartedSlice';
import { useDispatch } from "react-redux";
import "./Navigation.css";
import "./PDFView.jsx";
import { Link, useNavigate, useLocation } from 'react-router-dom';


const Navigation = ({ search, setSearch }) => {

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  // Determine if on services page based on URL
  const onServicesPage = location.pathname === "/services";
  const onEstimatePage = location.pathname === "/estimate";
  const onPDFPage = location.pathname === "/estimate/pdf";

  // Handlers
  const handleExportClick = () => {
    setDropdownOpen((open) => !open);
  };

  const handleExportPDF = () => {
    setDropdownOpen(false);
    navigate("/estimate/pdf");
  };

  const handleHomeClick = () => {
    navigate("/");
    dispatch(setStarted(false));
  }

  const handleServicesClick = () => {
    navigate("/services");
  }

  const handleEstimateClick = () => {
    navigate("/estimate");
  }

  // const showComponent = (component) => {
  //   switch(component) {
  //     case "services":
  //   }
  // }

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
      padding: "1rem",
      minHeight: "2rem"
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
    rightButtons: {
      display: "flex",
      justifyContent: onPDFPage ? "end" : "space-between",
      gap: "0.5rem",
      flexGrow: 1
    }
  };

  return (
    <nav className='navigation'>
      <div style={{ ...scopedStyles.container }}>
        <div className="left">
          {/* <button type="button" className="button-shadow" onClick={() => handleHomeClick()}>
            <h3 style={{ margin: 0 }}>Home</h3>
          </button> */}
        </div>
        <div className="right" style={{ display: "flex", flexGrow: 1, justifyContent: "space-between", alignItems: 'center', gap: "0.8rem" }}>
          { onServicesPage &&
            <div className="center-box">
              <SearchInput value={search} onChange={setSearch}/> 
            </div>
          }
          { (onServicesPage || onPDFPage) &&
              <Link to="/estimate">
                <button type="button" className="border-light" onClick={() => handleEstimateClick()}>
                  <span className='button-text'>Estimate</span>
                </button>
              </Link>
          }
              
          { (onEstimatePage || onPDFPage) && 
              <div className='right-buttons' style={{ ...scopedStyles.rightButtons, position: "relative" }}>
                <Link to="/services">
                  <button type="button" className="services-button border-light" onClick={() => handleServicesClick()}>
                    <span className='button-text'>Services</span>
                  </button>
                </Link>
                { onEstimatePage &&
                  <div className='dropdown-button-container' style={{ position: "relative" }}>
                    <button
                      type="button"
                      className="dropdown-button border-light"
                      onClick={handleExportClick}
                    >
                      <span className='button-text'>Export</span>
                      <div className='button-icon'>
                        <svg xmlns="http://www.w3.org/2000/svg" height="14px" viewBox="0 -960 960 960" width="16px" fill="#1f1f1f">
                          <path d="M480-360 280-560h400L480-360Z"/>
                        </svg>
                      </div>
                    </button>
                    {dropdownOpen && (
                      <div style={{ position: "relative", zIndex: 20 }}>
                        <Dropdown
                          options={{
                            "Export as PDF": handleExportPDF,
                            // "Print": () => alert("Printing..."),
                          }}
                        />
                      </div>
                    )}
                  </div>
           }
              </div>
            
          }
        </div>
      </div>
    </nav>  
  );
};

export default Navigation;