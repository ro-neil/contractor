

import LandingPage from '@/pages/home/LandingPage.jsx';
import ServicesList from '@/pages/services/Services.jsx';
import Estimate from '@/pages/estimate/Estimate.jsx';
import PDFView from '@/pages/export/PDFView.jsx';
import NotFound from '@/pages/notFound/NotFound.jsx';


const routes = [
  {
    path: '/',
    element:  (props) => <LandingPage {...props}/>,
    label: 'Home',
    showNav: false,
  },
  {
    path: '/services',
    element: (props) => <ServicesList {...props}/>,
    label: 'Services',
    showNav: true,
  },
  {
    path: '/estimate',
    element: (props) => <Estimate />,
    label: 'Services',
    showNav: true,
  },
  {
    path: '/estimate/pdf',
    element: (props) => <PDFView />,
    label: 'Services',
    showNav: true,
  },
  {
    path: '*',
    element: () => <NotFound/>,
    label: 'Not Found',
    showNav: false,
  },

];

const pages = {
  'home': "/",
  'services': "/services",
  'estimate': "/estimate",
  'preview': "/estimate/pdf"
}

const usePages = () => {
  return pages;
}

const useOnPage = (location) => {
    return (page) => {
        const path = pages[page];
        if (!path) return false;
        return location.pathname === path;
    };
};

const useShowNav = (location) => {
    const currentRoute = routes.find(r => r.path === location.pathname);
    return !!currentRoute?.showNav;
}

export { routes as default, useOnPage, useShowNav, usePages };
