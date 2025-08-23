import { useState } from 'react'
import './App.css'
import LandingPage from './components/LandingPage.jsx';
import Navigation from './components/Navigation.jsx';
import Display from './components/Display.jsx';


const App = () => {
  const [onHomePage, setOnHomePage] = useState(false);
  const [onServicesPage, setOnServicesPage] = useState(true);
  const [search, setSearch] = useState("");

  const landingPageText = {
    title: "The Independendent Contractor",
    subtitle: "Generate estimates for your services with ease and accuracy",
    action: "Get Started"
  }
  

  return (
    <>
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', margin: '0 auto' }}>
      { onHomePage 
        ? (<div>
            <Navigation 
              key="navigation" 
              setHomePage={setOnHomePage} 
              setServicesPage={setOnServicesPage}
              onServicesPage={onServicesPage}
              search={search} 
              setSearch={setSearch}
            />

            <Display
              key="main-display"
              onServicesPage={onServicesPage}
              search={search} 
            />
          </div>)
        : <LandingPage 
            key="landing-page"
            title={landingPageText.title}
            subtitle={landingPageText.subtitle}
            action={landingPageText.action}
            setHomePage={setOnHomePage}
          />
      }
    </div>
    </>
  )
}

export default App
