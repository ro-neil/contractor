

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
    hideNav: true,
  },
  {
    path: '/services',
    element: (props) => <ServicesList {...props}/>,
    label: 'Services',
    hideNav: false,
  },
  {
    path: '/estimate',
    element: (props) => <Estimate />,
    label: 'Services',
    hideNav: false,
  },
  {
    path: '/estimate/pdf',
    element: (props) => <PDFView />,
    label: 'Services',
    hideNav: false,
  },
  {
    path: '*',
    element: () => <NotFound/>,
    label: 'Not Found',
    hideNav: true,
  },

];

export default routes;
