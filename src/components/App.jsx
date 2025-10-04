import { BrowserRouter as Router, HashRouter } from 'react-router-dom';
import './App.css';
import Layout from './utils/Layout.jsx';


const App = () => {

  return (
    <>
    {
      <HashRouter>
        <Layout/>
      </HashRouter>
    }
    </>
  )
}

export default App;
