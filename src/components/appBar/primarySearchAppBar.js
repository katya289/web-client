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
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CloseIcon from '@mui/icons-material/Close';
import formatDate from '../formatDate';

export default function PrimarySearchAppBar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
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
        setUsers(users.flat());
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    fetchNotifications();
  }, []);

  const handleDrawerClick = () => {
    setDrawerState(true);
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const getUsersById = async (userId) => {
    try {
      const response = await api.get(`users/get/${userId}`);
      console.log(response.data.user)
      return response.data.user;
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  }
  const handleAccountClick = () => {
    navigate('/account');
  };

  const handleNotificationsClose = () => {
    setNotificationsAnchorEl(null);
  };

  const handleNotificationsOpen = (event) => {
    if (notifications.length > 0) {
      setNotificationsAnchorEl(event.currentTarget);
    }
  };


  const handleNotificationClose = (notificationId) => {
    setNotifications(prevNotifications => prevNotifications.filter(notification => notification.id !== notificationId));
    // Тут вы можете добавить логику для удаления уведомления с сервера, если это необходимо
  }

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
      open={isNotificationsMenuOpen && notifications.length > 0}
      onClose={handleNotificationsClose}
      PaperProps={{
        style: {
          maxHeight: '600px',
          width: '440px',
        },
      }}
    >
      {notifications.map((notification, index) => (
        <MenuItem key={notification.id}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Card variant="outlined" style={{ flexGrow: 1 }}>
              <CardHeader
                avatar={<Avatar src={`${BASE_URL}avatars/${users[index]?.avatar}`} />}
                title={users[index]?.name}
                subheader={`left a comment at your podcast at ${formatDate(notification.createdAt)}`}
              />
            </Card>
            <IconButton
              aria-label="close"
              onClick={() => handleNotificationClose(notification.id)}
            >
              <CloseIcon />
            </IconButton>
          </div>
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
          <Box m={1.5}>
            <Badge
              sx={{ mr: '10px' }}
              badgeContent={hasUnreadNotifications ? notifications.length : 0}
              color="error"
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
