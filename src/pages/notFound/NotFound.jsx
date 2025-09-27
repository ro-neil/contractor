import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css';

const NotFound = () => {
  return (
    <div className="notfound-container">
      <div className="notfound-icon">🚧</div>
      <h1 className="notfound-title">404 - Page Under Construction</h1>
      <p className="notfound-message">
        Looks like the page you're looking for is still being drafted — or doesn’t exist.
      </p>
      <div className="notfound-button-group">
        <div className="notfound-button-group">
          <Link to="/" className="button notfound-button">
            Go Back Home
          </Link>
          <Link to="/services" className="button notfound-button alt">
            Start a New Estimate
          </Link>
        </div>

      </div>
    </div>
  );
};

export default NotFound;
