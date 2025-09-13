
import LandingPage from '../components/LandingPage.jsx';
import ServicesList from '../components/Services.jsx';
import Estimate from '../components/Estimate.jsx';
import PDFView from '../components/PDFView.jsx';
import NotFound from '../components/NotFound.jsx';


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
