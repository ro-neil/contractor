import { Link, useMatches } from 'react-router-dom';
import { usePages } from '@/routing/router.jsx'; 
import { camelCase } from '@/utils/string.js';
import './Navigation.css';


const buttonText = {
  home: 'Home',
  services: 'Services',
  estimate: 'Estimate',
  newService: 'Add Service'
};


const Navigation = () => {
  // Use useMatches to get the 'handle' property from the current route.
  const matches = useMatches();
  const currentHandle = matches[matches.length - 1]?.handle || {};
  
  // Use the current route title for logic, falling back to path if needed.
  const currentPageTitle = currentHandle.title; 
  const pages = usePages(); // Assuming this returns the route targets like { home: '/', services: '/services' }

  // Helper function to determine if a button should show on the current page.
  // We use the known page title from the route handle.
  const shouldShow = (target) => {
    switch (camelCase(currentPageTitle)) {
      case 'services':
        return target === 'newService' || target === 'estimate';
      case 'newService':
        return target === 'services';
      case 'editService':
        return target === 'services';
      case 'estimate':
        return target === 'services';
      case 'estimatePreview':
        return target === 'estimate' || target === 'services';
      default:
        return false;
    }
  };

  // Define button-link elements as an array
  const dynamicButtons = [
    {
      key: 'newService',
      to: pages.newService,
      className: 'new-service-button',
      buttonText: buttonText.newService,
      visible: shouldShow('newService')
    },
    {
      key: 'estimate',
      to: pages.estimate,
      className: 'estimate-button',
      buttonText: buttonText.estimate,
      visible: shouldShow('estimate')
    },
    {
      key: 'services',
      to: pages.services,
      className: 'services-button',
      buttonText: buttonText.services,
      visible: shouldShow('services')
    }
  ];

  return (
    <nav className='navigation'>
      <div className='nav-container'>
        <div className="nav-left">
          <Link to={pages.home}>
            <button type="button" className="home-button">
              <span className='button-text'>{buttonText.home}</span>
            </button>
          </Link>
        </div>
        <div className="nav-right">
          {dynamicButtons.filter(btn => btn.visible).map(btn => (
            <Link to={btn.to} key={btn.key}>
              <button type="button" className={btn.className}>
                <span className='button-text'>{btn.buttonText}</span>
              </button>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;