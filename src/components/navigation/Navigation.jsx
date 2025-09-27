import React, { useState } from 'react';
import "./Navigation.css";
import "@/pages/export/PDFView.jsx";
import { Link, useNavigate, useLocation } from 'react-router-dom';


const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Determine if on services page based on URL
  const onServicesPage = location.pathname === "/services";
  const onEstimatePage = location.pathname === "/estimate";
  const onPDFPage = location.pathname === "/estimate/pdf";

  // Handlers
  const handleHomeClick = () => {
    navigate("/");
  };

  const handleServicesClick = () => {
    navigate("/services");
  }

  const handleEstimateClick = () => {
    navigate("/estimate");
  }


  return (
    <nav className='navigation'>
      <div className='nav-container'>
        <div className="nav-left">
          <button type="button" className="home-button border-light" onClick={() => handleHomeClick()}>
            <span className='button-text'>Home</span>
          </button>
        </div>
        <div className="nav-right">
          { (onServicesPage || onPDFPage) &&
            <Link to="/estimate">
              <button type="button" className="estimate-button" onClick={() => handleEstimateClick()}>
                <span className='button-text'>Estimate</span>
              </button>
            </Link>
          }
              
          { (onEstimatePage || onPDFPage) && 
            <Link to="/services">
              <button type="button" className="services-button" onClick={() => handleServicesClick()}>
                <span className='button-text'>Services</span>
              </button>
            </Link>     
          }
        </div>
      </div>
    </nav>  
  );
};

export default Navigation;