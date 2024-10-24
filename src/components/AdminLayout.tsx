import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import BusinessIcon from "@mui/icons-material/Business";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import { AppBar, IconButton, ListSubheader, Toolbar, Typography } from "@mui/material";
import { Link, Outlet } from "react-router-dom";
import UserMenu from "./UserMenu";

const items = [
  {
    items: [{ name: "Admin", link: "/admin", icon: <HomeIcon /> }],
  },
  {
    subheader: "Master Data",
    items: [{ name: "Business Unit", link: "/admin/bu", icon: <BusinessIcon /> }],
  },
];

export default function AdminLayout() {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      {items &&
        items.map((menuGroup, index) => (
          <List
            subheader={
              menuGroup.subheader && (
                <ListSubheader color="primary">{menuGroup.subheader}</ListSubheader>
              )
            }
            key={index}
          >
            {menuGroup.items.map((item) => (
              <ListItem disablePadding key={item.name}>
                <ListItemButton component={Link} to={item.link}>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.name} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        ))}
    </Box>
  );

  return (
    <div>
      <AppBar position="fixed">
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={toggleDrawer(true)}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              KPN Assessment
            </Typography>
          </Box>
          <UserMenu />
        </Toolbar>
      </AppBar>
      <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8 }}>
        <Outlet />
      </Box>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
}
