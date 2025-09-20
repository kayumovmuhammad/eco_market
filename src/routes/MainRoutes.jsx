import { lazy } from 'react';

// project imports
import Loadable from 'components/Loadable';
import DashboardLayout from 'layout/Dashboard';

// render- Dashboard
const Home = Loadable(lazy(() => import('pages/home')));
const ItemPage = Loadable(lazy(() => import('pages/item-page')));
const Categories = Loadable(lazy(() => import('pages/categories')));
const Orders = Loadable(lazy(() => import('pages/orders')));
const AddOrder = Loadable(lazy(() => import('pages/add_page')));
const AdminView = Loadable(lazy(() => import('pages/admin_view')));

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
      path: '/orders',
      element: <Orders />
    },
    {
      path: '/add_order',
      element: <AddOrder />
    },
    {
      path: '/admin/view',
      element: <AdminView />
    }
  ]
};

export default MainRoutes;
