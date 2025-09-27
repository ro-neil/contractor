import { useState } from 'react';
import { BrowserRouter as Router, HashRouter } from 'react-router-dom';
import './App.css';

import Layout from './utils/Layout.jsx';


const App = () => {

  return (
    <>
    {
      <HashRouter>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', margin: '0 auto' }}>
          <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Layout/>
          </div>
        </div>
      </HashRouter>
    }
    </>
  )
}

export default App;
