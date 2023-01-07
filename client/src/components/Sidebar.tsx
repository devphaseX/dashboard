import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
} from '@mui/material';

import {
  SettingsOutlined,
  ChevronLeft,
  ChevronRightOutlined,
  HomeOutlined,
  ShoppingCartOutlined,
  Groups2Outlined,
  ReceiptLongOutlined,
  PublicOutlined,
  PointOfSaleOutlined,
  TodayOutlined,
  CalendarMonthOutlined,
  AdminPanelSettingsOutlined,
  TrendingUpOutlined,
  PieChartOutline,
} from '@mui/icons-material';

import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import type { ResolutionMode, SideBarMenuBase } from './Layout';
import { FlexBetween } from './FlexBetween';
import { type ThemeStyle } from '../theme';
import { pathMatch } from '../util';

const navItems = [
  { text: 'Dashboard', icon: <HomeOutlined /> },
  { text: 'Client Facing', icon: null },
  { text: 'Products', icon: <ShoppingCartOutlined /> },
  { text: 'Customers', icon: <Groups2Outlined /> },
  { text: 'Transactions', icon: <ReceiptLongOutlined /> },
  { text: 'Geography', icon: <PublicOutlined /> },
  { text: 'Sales', icon: null },
  { text: 'Overview', icon: <PointOfSaleOutlined /> },
  { text: 'Daily', icon: <TodayOutlined /> },
  { text: 'Monthly', icon: <CalendarMonthOutlined /> },
  { text: 'Breakdown', icon: <PieChartOutline /> },
  { text: 'Management', icon: null },
  { text: 'Admin', icon: <AdminPanelSettingsOutlined /> },
  { text: 'Performance', icon: <TrendingUpOutlined /> },
];

interface SidebarProps extends ResolutionMode, SideBarMenuBase {
  drawerWidth: number | string;
}

const Sidebar = ({
  sideBarOpen,
  setSideBarMode,
  drawerWidth,
  isMobileMode,
}: SidebarProps) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const theme = useTheme<ThemeStyle>();
  return (
    <Box component="nav">
      <Drawer
        open={sideBarOpen}
        onClose={() => setSideBarMode(false)}
        variant="persistent"
        anchor="left"
        sx={{
          width:
            typeof drawerWidth === 'number' ? `${drawerWidth}px` : drawerWidth,
          '& .MuiDrawer-paper': {
            color: theme.palette.secondary[400],
            background: theme.palette.background.alt,
            borderWidth: isMobileMode ? '0' : '2px',
          },
        }}
      >
        <Box width="100%">
          <Box m="1.5rem 2rem 2rem 3rem">
            <FlexBetween>
              <Box display="flex" alignItems="center" gap="0.5rem">
                <Typography variant="h4" fontWeight="bold">
                  ECOMVISIONS
                </Typography>
              </Box>
              {!isMobileMode ? (
                <IconButton onClick={() => setSideBarMode((mode) => !mode)}>
                  <ChevronLeft />
                </IconButton>
              ) : null}
            </FlexBetween>
          </Box>
          <List>
            {navItems.map(({ text, icon }) => {
              if (!icon) {
                return (
                  <Typography key={text} sx={{ m: '2.25rem 0 1rem 3rem' }}>
                    {text}
                  </Typography>
                );
              }

              const lowerCaseText = text.toLowerCase();
              const isActiveRoute = pathMatch(pathname, lowerCaseText);

              return (
                <ListItem key={text} disablePadding>
                  <ListItemButton
                    onClick={() => {
                      navigate(`/${lowerCaseText}`);
                    }}
                    sx={{
                      backgroundColor: isActiveRoute
                        ? theme.palette.secondary[300]
                        : 'transparent',

                      color: isActiveRoute
                        ? theme.palette.primary[600]
                        : theme.palette.secondary[100],
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        ml: '2rem',
                        color: isActiveRoute
                          ? theme.palette.primary[600]
                          : theme.palette.secondary[200],
                      }}
                    >
                      {icon}
                    </ListItemIcon>
                    <ListItemText primary={text}>
                      {isActiveRoute && (
                        <ChevronRightOutlined sx={{ ml: 'auto' }} />
                      )}
                    </ListItemText>
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
        </Box>
      </Drawer>
    </Box>
  );
};

export { Sidebar };
