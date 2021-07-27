import { Navigate, Outlet, useRoutes } from 'react-router-dom';
// layouts
// import DashboardLayout from './layouts/dashboard';
import { useSelector } from 'react-redux';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import Login from './pages/Login';
import LoggedIn from './pages/LoggedIn';
import DashboardLayout from './layouts/dashboard';
import ProductList from './pages/Products/ProductList.container';
// import DashboardLayout from "./layouts/dashboard";

// ----------------------------------------------------------------------

export default function Router() {
  const { is_authenticated } = useSelector((state) => state.auth);
  return useRoutes([
    {
      path: '/',
      element: !is_authenticated ? <LogoOnlyLayout /> : <Navigate to="/dashboard" replace />,
      children: [
        { path: 'login', element: <Login /> },
        { path: '/', element: <Navigate to="/login" replace /> }
      ]
    },
    {
      path: '/dashboard',
      element: is_authenticated ? <DashboardLayout /> : <Navigate to="/login" />,
      children: [
        { path: '/', element: <LoggedIn /> },
        { path: '/products', element: <ProductList /> }
      ]
    },

    { path: '*', element: <Navigate to="/404" replace /> }
  ]);
}
