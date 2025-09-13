import { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';

// Pages
import Layout from './components/Layout.jsx';


const App = () => {
  const [search, setSearch] = useState("");

  return (
    <>
    {
      <Router basename='/contractor'>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', margin: '0 auto' }}>
          <div style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
            <Layout search={search} setSearch={setSearch}/>
          </div>
        </div>
      </Router>
    }
    </>
  )
}

export default App;
