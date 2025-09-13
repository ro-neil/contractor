import { Routes, Route, useLocation } from 'react-router-dom';
import routes from '@/routes/routeConfig.jsx';
import Navigation from '@/components/Navigation.jsx';

const Layout = ({ search, setSearch, hideNav }) => {
    const location = useLocation();

    // Match current route
    const currentRoute = routes.find(r => r.path === location.pathname);
    const shouldHideNav = hideNav || currentRoute?.hideNav;

    const landingPageText = {
        title: "Contractor Estimate",
        subtitle: "Generate estimates for your services with accuracy and precision.",
        action: "Get Started"
    }

    const setRoute = (route, idx) => {
        switch (route.path) {
            case '/':
                return <Route key={idx} path={route.path} element={route.element(landingPageText)} />
            case '/services':
                return <Route key={idx} path={route.path} element={route.element({ search: search })} />
            default:
                return <Route key={idx} path={route.path} element={route.element()} />
        }
    }


    return (
        <>
            {!shouldHideNav && <Navigation search={search} setSearch={setSearch} />}
            <Routes>
                {routes.map((route, idx) => (
                    setRoute(route, idx)
                ))}
            </Routes>
        </>
    );
};

export default Layout;