import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SearchIcon from '@mui/icons-material/Search';
import HomeIcon from '@mui/icons-material/Home';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import LoginIcon from '@mui/icons-material/Login';
import DarkModeIcon from '@mui/icons-material/DarkMode';

export default function TemporaryDrawer() {
  const [open, setOpen] = React.useState(true);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const icons = {
    'Dashboard': <HomeIcon />,
    'Favorites': <FavoriteIcon />,
    'Search': <SearchIcon />,
    'Upload': <CloudUploadIcon />,
    'Log in': <LoginIcon />,
    'Dark mode': <DarkModeIcon />,
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
          <ListItem key={text} disablePadding>
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
      <Drawer open={open} ModalProps={{ BackdropProps: { invisible: true } }}>
        {DrawerList}
      </Drawer>
    </div>
  );
}
