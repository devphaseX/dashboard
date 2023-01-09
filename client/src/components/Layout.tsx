import { Outlet } from 'react-router-dom';
import { Box, useMediaQuery } from '@mui/material';
import { NavBar } from './NavBar';
import { useState } from 'react';
import { Sidebar } from './Sidebar';
import { useGetUserQuery } from '../store/api/userApi';
import { useAppSelector } from '../store';

interface SideBarMenuBase {
  sideBarOpen: boolean;
  setSideBarMode: (mode: boolean | ((currentMode: boolean) => boolean)) => void;
}

interface ResolutionMode {
  isMobileMode: boolean;
}

const Layout = () => {
  const isNonMobileDevice = useMediaQuery('(min-width: 600px)');
  const [menuOpen, setMenuMode] = useState(true);
  const userId = useAppSelector((state) => state.global.user);
  const { data } = useGetUserQuery(userId!);
  return (
    <Box
      display={isNonMobileDevice ? 'flex' : 'block'}
      width="100vw"
      height="100vh"
    >
      <Sidebar
        isMobileMode={!isNonMobileDevice}
        sideBarOpen={menuOpen}
        setSideBarMode={setMenuMode}
        drawerWidth="250px"
      />
      <Box flexGrow={1}>
        <NavBar sideBarOpen={menuOpen} setSideBarMode={setMenuMode} />
        <Outlet />
      </Box>
    </Box>
  );
};

export { Layout };

export type { SideBarMenuBase, ResolutionMode };
