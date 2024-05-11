import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import MailIcon from '@mui/icons-material/Mail';
import Avatar from '@mui/material/Avatar';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useNavigate } from 'react-router-dom';
import MoreIcon from '@mui/icons-material/MoreVert';
import TemporaryDrawer from './NavBar';
import { BASE_URL } from '../constants';
import api from "../../api";

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

export default function PrimarySearchAppBar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [notificationsAnchorEl, setNotificationsAnchorEl] = React.useState(null);
  const [notifications, setNotifications] = React.useState([]);
  const [users, setUsers] = React.useState({});
  const [hasUnreadNotifications, setHasUnreadNotifications] = React.useState(false);

  const [drawerState, setDrawerState] = useState(false);
  const isMenuOpen = Boolean(anchorEl);
  const isNotificationsMenuOpen = Boolean(notificationsAnchorEl);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await api.get(`users/get/notifications`);
        setNotifications(response.data.comments || []);
        setHasUnreadNotifications(response.data.comments && response.data.comments.length > 0);
        const users = await Promise.all(response.data.comments.map(comment => getUsersById(comment.userId)));
        setUsers(users.flat()); // Объединяем массивы пользователей
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    fetchNotifications();
  }, []);


  const getUsersById = async (userId) => {
    try {
      const response = await api.get(`users/get/${userId}`);
      console.log(response.data.user)
      return response.data.user;
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  }

  const handleDrawerClick = () => {
    setDrawerState(true);
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleAccountClick = () => {
    navigate('/account');
  };

  const handleNotificationsClose = () => {
    setNotificationsAnchorEl(null);
  };

  const handleNotificationsOpen = async (event) => {
    setNotificationsAnchorEl(event.currentTarget);

    try {
      const response = await api.get(`users/get/notifications`)
      setNotifications(response.data.comments || []);
      setHasUnreadNotifications(response.data.comments && response.data.comments.length > 0);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleAccountClick}>My account</MenuItem>
    </Menu>
  );

  const notificationsMenuId = 'primary-search-notifications-menu';
  const renderNotificationsMenu = (
    <Menu
      anchorEl={notificationsAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={notificationsMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isNotificationsMenuOpen}
      onClose={handleNotificationsClose}
      PaperProps={{
        style: {
          maxHeight: '600px',
          width: '500px',
        },
      }}
    >
      {notifications.map((notification, index) => (
        <MenuItem key={notification.id}>
          <Typography>{notification.commentText}</Typography>
          {/* Отображаем информацию о пользователе, написавшем комментарий */}
          <Typography>{users[index]?.name}</Typography>
        </MenuItem>
      ))}
    </Menu>
  );


  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: '#222831' }}>
        <Toolbar>
          <IconButton
            onClick={handleDrawerClick}
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>

          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <Badge
              badgeContent={hasUnreadNotifications ? notifications.length : 0}
              color="error"
              sx={{ marginTop: '10px', marginRight: '3px' }}
            >
              <IconButton
                size="large"
                aria-label="show 17 new notifications"
                color="inherit"
                onClick={handleNotificationsOpen}
              >
                <NotificationsIcon />
              </IconButton>
            </Badge>


            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <Avatar src={`${BASE_URL}avatars/${localStorage.getItem('avatar')}`} />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {renderMenu}
      {renderNotificationsMenu}
      {localStorage.getItem('token') ? (
        <TemporaryDrawer open={drawerState} setOpenDialog={setDrawerState} />
      ) : null}
    </Box>
  );
}
