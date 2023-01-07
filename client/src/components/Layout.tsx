import { Outlet } from 'react-router-dom';
import { Box, useMediaQuery } from '@mui/material';
import { useSelector } from 'react-redux';

const Layout = () => {
  return (
    <Box width="100%" height="100%">
      <Box>
        <Outlet />
      </Box>
    </Box>
  );
};

export { Layout };
