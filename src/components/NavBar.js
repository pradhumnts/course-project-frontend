import React, { useContext } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import {Link} from 'react-router-dom'
import useAuth from '../hooks/useAuth';
import { useTheme } from '@mui/material/styles';

const ResponsiveAppBar = () => {

  const theme = useTheme()

  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const { isAuthenticated, logout, user } = useAuth()

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const logoutHandler = async () => {
    await logout()
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  }

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' }, flexGrow: 0 }}
          >
            QBank
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none'},
              }}
            >

              <Link to="/">
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{ color: theme.palette.text.primary, display: 'block', width: "100%", textAlign:"left", px:2 }}
                >
                  Courses
                </Button>
              </Link>
              <Link to="/categories">
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{ color: theme.palette.text.primary, display: 'block', width: "100%", textAlign:"left", px:2 }}
                >
                  Categories
                </Button>
              </Link>
              <Link to="/pricing">
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{ color: theme.palette.text.primary, display: 'block', width: "100%", textAlign:"left", px:2 }}
                >
                  Pricing
                </Button>
              </Link>

            </Menu>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
          >
            QBank
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
        
              <Link to="/">
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  Courses
                </Button>
              </Link>
              <Link to="/categories">
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  Categories
                </Button>
              </Link>
              <Link to="/pricing">
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  Pricing
                </Button>
              </Link>

          </Box>

          <Box sx={{ flexGrow: 0 }}>
            
              {isAuthenticated ?
              <Box sx={{ display: 'flex', }}>
              <Link to="/user/courses/">
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  My Courses
                </Button>
              </Link>
              <Link to="/profile">
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  {user.username}
                </Button>
              </Link>
              <Link to="/">
                <Button
                  onClick={logoutHandler}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  Logout
                </Button>
              </Link>
              </Box>
                : 
                <Box sx={{ display: 'flex' }}>
                  <Link to="/login">
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  Login
                </Button>
              </Link>
              <Link to="/register">
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  Register
                </Button>
              </Link>
               
                  </Box> 
              }

       
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;
