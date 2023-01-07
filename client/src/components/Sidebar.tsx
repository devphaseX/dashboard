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
  ShoppingCartCheckoutOutlined,
  Groups2Outlined,
  ReceiptLongOutlined,
  PublicOffOutlined,
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

interface SidebarProps extends ResolutionMode, SideBarMenuBase {
  drawerWidth: number | string;
}

const Sidebar = ({}: SidebarProps) => <div></div>;

export { Sidebar };
