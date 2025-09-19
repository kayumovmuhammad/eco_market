import { lazy } from 'react';

// project imports
import Loadable from 'components/Loadable';
import DashboardLayout from 'layout/Dashboard';

// render- Dashboard
const Home = Loadable(lazy(() => import('pages/home')));
const ItemPage = Loadable(lazy(() => import('pages/item-page')));
const Categories = Loadable(lazy(() => import('pages/categories')));
const Publications = Loadable(lazy(() => import('pages/publications')));
const AddPublication = Loadable(lazy(() => import('pages/add_page')));

// render - color
const Color = Loadable(lazy(() => import('pages/component-overview/color')));
const Typography = Loadable(lazy(() => import('pages/component-overview/typography')));
const Shadow = Loadable(lazy(() => import('pages/component-overview/shadows')));

// render - sample page
const SamplePage = Loadable(lazy(() => import('pages/extra-pages/sample-page')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <DashboardLayout />,
  children: [
    {
      path: '/',
      element: <Home />
    },
    {
      path: '/categories/:category',
      element: <Categories />
    },
    {
      path: '/item/:id',
      element: <ItemPage />
    },
    {
        path: "/publications",
        element: <Publications />
    },
    {
        path: "/add_publication",
        element: <AddPublication />
    },
  ]
};

export default MainRoutes;
