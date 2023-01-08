/* Icons */
import {
  LightModeOutlined,
  DarkModeOutlined,
  Menu as MenuIcon,
  SettingsOutlined,
  ArrowDropDownOutlined,
  Search,
} from '@mui/icons-material';
import React from 'react';
import {
  AppBar,
  IconButton,
  Toolbar,
  useTheme,
  InputBase,
  Button,
  Typography,
  Box,
  Menu,
  MenuItem,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { FlexBetween } from './FlexBetween';
import type { ThemeStyle } from '../theme';
import { setMode } from '../store/state/global';
import type { SideBarMenuBase } from './Layout';
import { StoreState } from '../store';
import { useGetUserQuery } from '../store/api';
import profileImage from '../assets/profile.jpeg';
import { useState } from 'react';

interface NavBarProps extends SideBarMenuBase {}

const NavBar = ({ setSideBarMode, sideBarOpen }: NavBarProps) => {
  const theme = useTheme<ThemeStyle>();
  const dispatch = useDispatch();
  const userId = useSelector((state: StoreState) => state.global.user);
  const { data } = useGetUserQuery(userId!);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const dropDownMenuOpened = !!anchorEl;
  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) =>
    setAnchorEl(event.currentTarget as HTMLElement);
  const handleClose = () => setAnchorEl(null);

  return (
    <AppBar sx={{ position: 'static', background: 'none', boxShadow: 'none' }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <FlexBetween>
          <IconButton onClick={() => setSideBarMode(true)}>
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
        <FlexBetween sx={{ gap: '1.5rem' }}>
          <IconButton onClick={() => dispatch(setMode())}>
            {theme.palette.mode == 'dark' ? (
              <LightModeOutlined sx={{ fontSize: '25px' }} />
            ) : (
              <DarkModeOutlined sx={{ fontSize: '25px' }} />
            )}
          </IconButton>
          <IconButton>
            <SettingsOutlined sx={{ fontSize: '25px' }} />
          </IconButton>
          <FlexBetween>
            {data && (
              <>
                <Button
                  onClick={handleOpen}
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    textTransform: 'none',
                    gap: '1rem',
                  }}
                >
                  <Box
                    component="img"
                    alt="profile image"
                    src={profileImage}
                    height="32px"
                    width="32px"
                    borderRadius="50%"
                    sx={{ objectFit: 'cover' }}
                  ></Box>
                  <Box textAlign="left">
                    <Typography
                      fontWeight="bold"
                      fontSize="0.85rem"
                      sx={{ color: theme.palette.secondary[100] }}
                    >
                      {data.data.name}
                    </Typography>
                    <Typography
                      fontSize="0.75rem"
                      sx={{ color: theme.palette.secondary[200] }}
                    >
                      {data.data.occupation}
                    </Typography>
                  </Box>
                  <ArrowDropDownOutlined
                    sx={{
                      color: theme.palette.secondary[300],
                      fontSize: '25px',
                    }}
                  />
                </Button>
                <Menu
                  anchorEl={anchorEl}
                  open={dropDownMenuOpened}
                  onClose={handleClose}
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                >
                  <MenuItem onClick={handleClose}>Log out</MenuItem>
                </Menu>
              </>
            )}
          </FlexBetween>
        </FlexBetween>
      </Toolbar>
    </AppBar>
  );
};

export { NavBar };
