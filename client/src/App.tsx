import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from 'react-router-dom';
import type { StoreState } from './store/index';
import { themeSettings } from './theme';
import { Layout } from './components/Layout';
import { Dashboard } from './page';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Navigate to="dashboard" replace /> },
      { path: '/dashboard', element: <Dashboard /> },
    ],
  },
]);

const App = () => {
  const mode = useSelector((state: StoreState) => state.global.themeMode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return (
    <div>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <RouterProvider router={router} />
      </ThemeProvider>
    </div>
  );
};

export { App };