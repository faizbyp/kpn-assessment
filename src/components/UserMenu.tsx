import { Avatar, Box, IconButton, Menu, MenuItem, Typography } from "@mui/material";
import { useState } from "react";

const UserMenu = () => {
  const [anchorEl, setAnchorEl] = useState<EventTarget | Element | null>(null);

  const handleClick = (event: any): any => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    console.log("logout");
  };

  const open = Boolean(anchorEl);
  const id = open ? "user-popover" : undefined;

  return (
    <>
      <IconButton onClick={handleClick}>
        <Avatar sx={{ width: 32, height: 32 }} />
      </IconButton>
      <Menu
        id={id}
        anchorEl={anchorEl as Element}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "center",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
      >
        <MenuItem sx={{ width: "10rem" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "100%",
            }}
          >
            <IconButton>
              {/* <Avatar>{session?.user?.username.slice(0, 1).toUpperCase()}</Avatar> */}
              <Avatar>AA</Avatar>
            </IconButton>
            {/* <Typography>{session?.user?.username}</Typography> */}
            <Typography>User</Typography>
          </Box>
        </MenuItem>
        <MenuItem onClick={handleLogout} sx={{ width: "10rem" }}>
          Logout
        </MenuItem>
      </Menu>
    </>
  );
};
export default UserMenu;
