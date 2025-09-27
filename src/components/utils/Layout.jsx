import { Routes, Route, useLocation } from 'react-router-dom';
import routes from '@/routes/routeConfig.jsx';
import Navigation from '@/components/navigation/Navigation.jsx';

const Layout = () => {
    const location = useLocation();

    // Match current route
    const currentRoute = routes.find(r => r.path === location.pathname);
    const shouldHideNav = currentRoute?.hideNav == undefined ? 'true' : currentRoute?.hideNav;

    const landingPageText = {
        title: "Swift Estimate",
        subtitle: "Swiftly generate estimates for your services with accuracy and precision.",
        action: "Get Started"
    }

    const setRoute = (route, idx) => {
        switch (route.path) {
            case '/':
                return <Route key={idx} path={route.path} element={route.element(landingPageText)} />
            case '/services':
                return <Route key={idx} path={route.path} element={route.element()} />
            default:
                return <Route key={idx} path={route.path} element={route.element()} />
        }
    }


    return (
        <>
            {!shouldHideNav && <Navigation  />}
            <Routes>
                {routes.map((route, idx) => (
                    setRoute(route, idx)
                ))}
            </Routes>
        </>
    );
};

export default Layout;