/* Icons */
import {
  LightModeOutlined,
  DarkModeOutlined,
  Menu as MenuIcon,
  SettingsOutlined,
  ArrowDownwardOutlined,
  Search,
} from '@mui/icons-material';
import React from 'react';
import {
  AppBar,
  IconButton,
  Menu,
  Toolbar,
  useTheme,
  InputBase,
} from '@mui/material';
import { FlexBetween } from './FlexBetween';
import type { ThemeStyle } from '../theme';

const NavBar = () => {
  const theme = useTheme<ThemeStyle>();
  return (
    <AppBar sx={{ position: 'static', background: 'none', boxShadow: 'none' }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <FlexBetween>
          <IconButton onClick={() => console.log('open/close menu')}>
            <MenuIcon />
          </IconButton>
          <FlexBetween
            sx={{
              backgroundColor: theme.palette.background.alt,
              borderRadius: '9px',
              gap: '3rem',
              padding: '0.1rem 1.5rem',
            }}
          >
            <InputBase placeholder="Searching..." />
            <IconButton>
              <Search />
            </IconButton>
          </FlexBetween>
        </FlexBetween>
      </Toolbar>
    </AppBar>
  );
};

export { NavBar };
