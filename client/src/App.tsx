import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from 'react-router-dom';
import type { StoreState } from './store/index';
import { themeSettings } from './theme';
import { Layout } from './components/Layout';
import {
  Dashboard,
  Products,
  Customer,
  Transaction,
  Geography,
  Overview,
  DailyStat,
} from './page';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Navigate to="dashboard" replace /> },
      { path: '/dashboard', element: <Dashboard /> },
      { path: '/products', element: <Products /> },
      { path: '/customers', element: <Customer /> },
      { path: '/transactions', element: <Transaction /> },
      { path: '/geography', element: <Geography /> },
      { path: '/overview', element: <Overview /> },
      { path: '/daily', element: <DailyStat /> },
    ],
  },
]);

const App = () => {
  const mode = useSelector((state: StoreState) => state.global.themeMode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return (
    <div className="app">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <RouterProvider router={router} />
      </ThemeProvider>
    </div>
  );
};

export { App };
