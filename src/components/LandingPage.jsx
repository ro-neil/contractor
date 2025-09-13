import React, {useEffect} from 'react';
import AppLogo from './AppLogo';

import { setStarted } from './GetStartedSlice';
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';


const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: '44vh',
    background: '1px solid #f5f7fa',
    padding: '3rem',
    borderRadius: '0.75rem',
    boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
    // margin: '1.5rem 0',
    // width: '100%',
    // maxWidth: '48rem',
    margin: '0 2rem',
  },
  heroTitle: {
    color: '#2d3e50',
    fontSize: '2.5rem',
    fontWeight: '700',
    marginBottom: 'unset',
    textAlign: 'center',
    padding: '1rem',
    borderTop: '1px dotted #e2e8f0',
    borderBottom: '1px dotted #e2e8f0',
    // backgroundColor: '#fafcff',
  },
  subtitle: {
    color: '#4a6572',
    fontSize: '1.25rem',
    marginBottom: '24px',
    textAlign: 'center',
    fontWeight: '500',
  },
  
  
};



const LandingPage = ({ title, subtitle, action }) => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGetStarted = () => {
    dispatch(setStarted(true));
    navigate("/services");
  }
  
  return (
    <>
      <div style={styles.container}>
        <div style={styles.logo}>
          <AppLogo/>
        </div>
        <h1 style={styles.heroTitle}>{ title }</h1>
        
        <p style={styles.subtitle}>
          <span>{ subtitle }</span>
        </p>

        <div className="button-container" style={{ textAlign: 'center', padding: '0 1rem' }}>
          <button className='button bg-dark' style={{padding: '0.75rem 2rem'}} onClick={() => handleGetStarted()}>
            { action }
          </button>
        </div>
      </div>
    </>
  );
};

export default LandingPage;