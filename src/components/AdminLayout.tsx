import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import SubjectIcon from "@mui/icons-material/Subject";
import HomeIcon from "@mui/icons-material/Home";
import BusinessIcon from "@mui/icons-material/Business";
import PolicyIcon from "@mui/icons-material/Policy";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import SportsScoreIcon from "@mui/icons-material/SportsScore";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import ListIcon from "@mui/icons-material/List";
import { useEffect, useState } from "react";
import { AppBar, IconButton, ListSubheader, Toolbar, Typography } from "@mui/material";
import { Link, Outlet, useNavigate } from "react-router-dom";
import UserMenu from "./UserMenu";

const drawerWidth = 240;

const items = [
  {
    items: [{ name: "Admin", link: "/admin", icon: <HomeIcon /> }],
  },
  {
    subheader: "Master Data",
    items: [
      { name: "Business Unit", link: "/admin/bu", icon: <BusinessIcon /> },
      { name: "Terms & PP", link: "/admin/terms-pp", icon: <PolicyIcon /> },
      { name: "Short Brief", link: "/admin/short-brief", icon: <SubjectIcon /> },
      { name: "Series", link: "/admin/series", icon: <FormatListNumberedIcon /> },
      { name: "Criteria", link: "/admin/criteria", icon: <SportsScoreIcon /> },
      { name: "Function Menu", link: "/admin/function-menu", icon: <ListIcon /> },
      { name: "Question", link: "/admin/question", icon: <QuestionAnswerIcon /> },
    ],
  },
];

export default function AdminLayout() {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();

  // PROTECT ROUTES INSIDE ADMIN LAYOUT
  useEffect(() => {
    const authStorage = localStorage.getItem("auth-storage");
    if (!authStorage) {
      navigate("/");
    }
  }, [navigate]);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const DrawerList = (
    <List>
      {items &&
        items.map((menuGroup, index) => (
          <List
            dense
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
    </List>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          transition: (theme) =>
            theme.transitions.create(["width", "margin"], {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.leavingScreen,
            }),
          ...(open && {
            marginLeft: drawerWidth,
            width: `calc(100% - ${drawerWidth}px)`,
          }),
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={toggleDrawer}
              sx={{ mr: 2 }}
            >
              {open ? <ChevronLeftIcon /> : <MenuIcon />}
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              KPN Assessment
            </Typography>
          </Box>
          <UserMenu />
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <Box sx={{ overflow: "auto" }}>{DrawerList}</Box>
      </Drawer>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          padding: 3,
          transition: (theme) =>
            theme.transitions.create("margin", {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.leavingScreen,
            }),
          marginLeft: open ? 0 : `-${drawerWidth}px`,
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
}
