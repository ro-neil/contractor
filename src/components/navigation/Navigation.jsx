import React from 'react';
import "./Navigation.css";
import "@/pages/export/PDFView.jsx";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {useOnPage, useShowNav, usePages} from '@/routes/routeConfig.jsx';


const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const onPage = useOnPage(location);
  const showNav = useShowNav(location);
  const pages = usePages();

  /**
   * Navigates the user to the home page (root route '/').
   * @function handleHomeClick
   * @returns {void}
   */
  const handleHomeClick = () => {
    const homePage = pages.home;
    navigate(homePage);
  };

  /**
   * Navigates to the services page
   * @function handleServicesClick
   * @returns {void}
   */
  const handleServicesClick = () => {
    const servicesPage = pages.services;
    navigate(servicesPage);
  }

  /**
   * Navigates to the estimate page
   * @function handleEstimateClick
   * @returns {void}
   */
  const handleEstimateClick = () => {
    const estimatePage = pages.estimate;
    navigate(estimatePage);
  }


  return (
    <nav className={showNav ? 'navigation' : 'invisible'}>
      <div className='nav-container'>
        <div className="nav-left">
          <button type="button" className="home-button border-light" onClick={() => handleHomeClick()}>
            <span className='button-text'>Home</span>
          </button>
        </div>
        <div className="nav-right">
          { (onPage('services') || onPage('preview')) &&
            <Link to={pages.estimate}>
              <button type="button" className="estimate-button" onClick={() => handleEstimateClick()}>
                <span className='button-text'>Estimate</span>
              </button>
            </Link>
          }
              
          { (onPage('estimate') || onPage('preview')) && 
            <Link to={pages.services}>
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