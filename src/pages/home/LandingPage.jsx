import React, {useEffect} from 'react';
import brand_logo from '@/assets/brand-logo-bg-white.svg'
import { useNavigate } from 'react-router-dom';
import "./LandingPage.css";



const LandingPage = ({ title, subtitle, action }) => {

  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/services");
  }
  
  return (
    <>
      <div className='landing-page-container'>
        <div>
          <img className='w-100' src={brand_logo} alt="Brand Logo" />
        </div>
        <h1 className='hero-title'>{ title }</h1>
        
        <p className='subtitle'>
          <span>{ subtitle }</span>
        </p>

        <div className="button-container" style={{ textAlign: 'center', padding: '0 1rem' }}>
          <button className='button' style={{padding: '0.75rem 2rem'}} onClick={() => handleGetStarted()}>
            { action }
          </button>
        </div>
      </div>
    </>
  );
};

export default LandingPage;