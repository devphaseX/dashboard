import { Outlet } from 'react-router-dom';
import { Box, useMediaQuery } from '@mui/material';
import { useSelector } from 'react-redux';
import { NavBar } from './NavBar';

const Layout = () => {
  return (
    <Box width="100vw" height="100vh">
      <Box>
        <NavBar />
        <Outlet />
      </Box>
    </Box>
  );
};

export { Layout };
