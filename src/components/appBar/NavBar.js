import React, { useRef, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SearchIcon from '@mui/icons-material/Search';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import LoginIcon from '@mui/icons-material/Login';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { useNavigate } from 'react-router-dom';
import UploadPodcast from '../podcasts/UploadPodcast';
import { useTheme } from '../context/ThemeProvider';
export default function TemporaryDrawer({ open, setOpenDialog }) {
  const navigate = useNavigate();
  const drawerRef = useRef(null);
  const [uploadOpen, setUploadOpen] = useState(false);
  const { toggleTheme } = useTheme();
  useEffect(() => {
    function handleClickOutside(event) {
      if (drawerRef.current && !drawerRef.current.contains(event.target)) {
        setOpenDialog(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [setOpenDialog]);

  const handleItemClick = (action) => {
    action();
    setOpenDialog(false);
  };

  const actions = {
    'Dashboard': () => navigate('/'),
    // 'Favorites': () => navigate('/favorites'),
    'Search': () => navigate('/search'),
    'Upload': () => setUploadOpen(true),
    'Log in': () => navigate('/login'),
    'Light mode': () => toggleTheme(),
  };

  const icons = {
    'Dashboard': <HomeIcon />,
    // 'Favorites': <FavoriteIcon />,
    'Search': <SearchIcon />,
    'Upload': <CloudUploadIcon />,
    'Log in': <LoginIcon />,
    'Light mode': <DarkModeIcon />,
  };

  const DrawerList = (
    <Box
      ref={drawerRef}
      sx={{
        bgcolor: '#222831',
        width: 250,
        flexShrink: 0,
      }}
      role="presentation"
    >
      <Divider />
      <List>
        {Object.entries(icons).map(([text, icon]) => (
          <ListItem key={text} disablePadding onClick={() => handleItemClick(actions[text])}>
            <ListItemButton>
              <ListItemIcon sx={{ color: 'white' }}>{icon}</ListItemIcon>
              <ListItemText sx={{ color: 'white' }} primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
    </Box>
  );

  return (
    <Box>
      <Drawer
        open={open} onClose={() => setOpenDialog(false)}
        ModalProps={{ BackdropProps: { invisible: true } }}
        sx={{
          '& .MuiDrawer-paper': {
            bgcolor: '#222831',
          },
        }}
      >
        {DrawerList}
      </Drawer>

      <UploadPodcast open={uploadOpen} setUploadOpen={setUploadOpen} />
    </Box>
  );
}
