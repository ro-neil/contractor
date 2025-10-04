import { Routes, Route } from 'react-router-dom';
import routes from '@/routes/routeConfig.jsx';
import Navigation from '@/components/navigation/Navigation.jsx';

const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    margin: '0 auto'
};

const Layout = () => {
    return (
    <>
    <div style={containerStyle}>
        <Navigation/>
        <Routes>
            {routes.map((route, idx) => (
                <Route key={idx} path={route.path} element={route.element()}/>
            ))}
        </Routes>
    </div>
    </>
    );
};

export default Layout;