import { Outlet, useMatches } from 'react-router-dom';
import Navigation from '@/components/navigation/Navigation.jsx';



const RootLayout = () => {
    // The useMatches hook retrieves the 'handle' property from the currently matched route.
    const matches = useMatches();
    const currentMatch = matches[matches.length - 1];
    const showNav = currentMatch?.handle?.showNav;

    return (
        <>
            {/* Conditionally render Navigation based on the route's handle property */}
            {showNav && <Navigation />} 
            
            <div className="root-layout-content"> 
                {/* The Outlet renders the currently matched route's element */}
                <Outlet /> 
            </div>
        </>
    );
};

export default RootLayout;
