import React, { useState } from 'react';
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
export default function TemporaryDrawer() {
  const [open, setOpen] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const navigate = useNavigate();
  const toggleDrawer = () => {
    setOpen(!open);
  };


  const handleDashboardClick = () => {
    console.log()
  }
  const handleUploadClick = () => {
    setOpenDialog(true);
  }
  
  const icons = {
    'Dashboard': <HomeIcon />,
    'Favorites': <FavoriteIcon />,
    'Search': <SearchIcon />,
    'Upload': <CloudUploadIcon />,
    'Log in': <LoginIcon />,
    'Dark mode': <DarkModeIcon />,
  };

  const eventHandlers = {
    'Dashboard': handleDashboardClick,
    'Upload': handleUploadClick,

  };

  const DrawerList = (
    <Box
      sx={{
        width: 250,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 250,
          boxSizing: 'border-box',
        },
      }}
      role="presentation"
      onClick={toggleDrawer}
    >
      <Divider />
      <List>
        {Object.entries(icons).map(([text, icon]) => (
          <ListItem key={text} disablePadding onClick={() => eventHandlers[text](text)}>
            <ListItemButton>
              <ListItemIcon>{icon}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
    </Box>
  );

  return (
    <div>
      {console.log(open)}
      <Drawer open={open} ModalProps={{ BackdropProps: { invisible: true } }}>
        {DrawerList}
      </Drawer>
    
      <UploadPodcast openDialog={openDialog} setOpenDialog={setOpenDialog} setOpen={setOpen}></UploadPodcast>
    </div>
  );
}
