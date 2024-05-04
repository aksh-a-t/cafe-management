import { AppBar, Toolbar, IconButton, Typography, Button, Menu, MenuItem } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import React from 'react'
import {Link, Outlet, useNavigate } from 'react-router-dom';
const Navbar = ({handleDrawerToggle}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const logout=()=>{
    sessionStorage.removeItem("token");
    navigate('/login');
  }
  return (
    <>
    <> 
    {/* ,zIndex:`${indexZ}` */}
      <AppBar style={{ background: "limegreen" }} position="fixed">
        <Toolbar sx={{justifyContent:'space-between'}}>
          <Typography variant="h6" component="div" sx={{paddingLeft:'5vw'}}>
            <Link className="navLink" to="/">
              CAFE
            </Link>
          </Typography>
          {/* {contextAccess.user ? (
            <div style={{ paddingRight: "10vw" }}>
              <Button onClick={logoutHandler} color="inherit">
                Logout
              </Button>
            </div>
          ) : (
          )} */}
            {/* <div className="hiddenNav" style={{ paddingRight: "10vw" }}>
              <Button color="inherit">
                <Link className="navLink" to="/register">
                  Register
                </Link>
              </Button>
              <Button color="inherit">
                <Link className="navLink" to="/login">
                  Login
                </Link>
              </Button>
            </div> */}
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={logout}>Logout</MenuItem>
              </Menu>
            <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
            </div>
        
        </Toolbar>
      </AppBar>
    </>
    {/* <Outlet/> */}
    </>
  )
}

export default Navbar