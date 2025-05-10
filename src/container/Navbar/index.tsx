import * as React from 'react';
import { AppBar, Button, Grid, Menu, MenuItem, Stack, Toolbar, Typography, useMediaQuery } from '@mui/material';
import { useEffect, useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import logo from '../../assets/images/Original.png';
import messages from './messages';
import { getEncodedQueryParams, localRedirect } from 'utils';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const useViewportSize = () => {
  const [viewportSize, setViewportSize] = useState({ width: window.innerWidth, height: window.innerHeight });

  useEffect(() => {
    const handleResize = () => {
      setViewportSize({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return viewportSize;
};

const handleNavItemClick = (id: 'studentLettings' | 'residentialLettings' | 'forSale' | 'about' | 'contact') => {
  switch (id) {
    case 'studentLettings':
    case 'residentialLettings':
    case 'forSale': {
      const search = getEncodedQueryParams({ category: id });
      localRedirect('/properties', { search });
      break;
    }
    case 'about': {
      localRedirect('/about');
      break;
    }
    case 'contact': {
      localRedirect('/contact');
      break;
    }
    default:
      break;
  }
};

export default function NavBar() {
  const viewportSize = useViewportSize();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const isSmallScreen = useMediaQuery('(max-width:1080px)');

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar sx={{ width: '100%', paddingY: '10px', backgroundColor: 'darkred' }} position="absolute">
      <Toolbar sx={{ padding: '10px' }}>
        {viewportSize.width > 650 ? (
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item xs={5} container justifyContent="center">
              <Stack direction="row" spacing={10}>
                <Typography
                  sx={{
                    cursor: 'pointer',
                    color: 'white',
                    fontWeight: 700,
                    fontSize: isSmallScreen ? '14px' : '16px',
                    letterSpacing: '2px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px'
                  }}
                  onClick={handleClick}
                >
                  {messages.toLet}
                  <KeyboardArrowDownIcon sx={{ fontSize: '25px', marginTop: '2px' }} />
                </Typography>

                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                  MenuListProps={{
                    sx: {
                      background: 'rgba(255, 255, 255, 0.9)',
                      backdropFilter: 'blur(10px)',
                      color: '#000',
                      borderRadius: '12px', // Rounded corners for the menu container
                      minWidth: '200px',
                      boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.2)',
                      padding: '5px 0',
                      transition: 'all 0.3s ease-in-out'
                    }
                  }}
                >
                  <MenuItem
                    onClick={() => handleNavItemClick('studentLettings')}
                    sx={{
                      '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.1)', transform: 'scale(1.05)' },
                      padding: '14px 22px',
                      fontSize: '15px',
                      fontWeight: 600,
                      color: '#000',
                      letterSpacing: '1px',
                      borderRadius: '8px', // Rounded corners for menu items
                      margin: '5px' // Add spacing so rounded borders are visible
                    }}
                  >
                    {messages.studentLettings}
                  </MenuItem>
                  <MenuItem
                    onClick={() => handleNavItemClick('residentialLettings')}
                    sx={{
                      '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.1)', transform: 'scale(1.05)' },
                      padding: '14px 22px',
                      fontSize: '15px',
                      fontWeight: 600,
                      color: '#000',
                      letterSpacing: '1px',
                      borderRadius: '8px',
                      margin: '5px'
                    }}
                  >
                    {messages.residentialLettings}
                  </MenuItem>
                </Menu>

                {/* For Sale (No Dropdown) */}
                <Typography
                  sx={{
                    cursor: 'pointer',
                    color: 'white',
                    fontWeight: 700,
                    fontSize: isSmallScreen ? '14px' : '16px',
                    letterSpacing: '2px'
                  }}
                  onClick={() => handleNavItemClick('forSale')}
                >
                  {messages.forSale}
                </Typography>
              </Stack>
            </Grid>
            <Grid item xs={2} container justifyContent="center" sx={{ cursor: 'pointer' }}>
              <img
                src={logo}
                alt="AJ Homes Logo"
                style={{ maxHeight: isSmallScreen ? '50px' : '60px' }}
                onClick={() => localRedirect('/')}
              />
            </Grid>

            <Grid item xs={5} container justifyContent="center">
              <Stack direction="row" spacing={10}>
                <Typography
                  sx={{
                    cursor: 'pointer',
                    color: 'white',
                    fontWeight: 700,
                    fontSize: isSmallScreen ? '14px' : '16px',
                    letterSpacing: '2px'
                  }}
                  onClick={() => handleNavItemClick('about')}
                >
                  {messages.about}
                </Typography>
                <Typography
                  sx={{
                    cursor: 'pointer',
                    color: 'white',
                    fontWeight: 700,
                    fontSize: isSmallScreen ? '14px' : '16px',
                    letterSpacing: '2px'
                  }}
                  onClick={() => handleNavItemClick('contact')}
                >
                  {messages.contact}
                </Typography>
              </Stack>
            </Grid>
          </Grid>
        ) : (
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item xs={2} container justifyContent="center" sx={{ cursor: 'pointer' }}>
              <img
                src={logo}
                alt="AJ Homes Logo"
                style={{ maxHeight: isSmallScreen ? '50px' : '60px' }}
                onClick={() => localRedirect('/')}
              />
            </Grid>
            <Button
              id="basic-button"
              aria-controls={open ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
              style={{ color: 'white' }}
            >
              <MenuIcon />
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button'
              }}
            >
              <MenuItem onClick={handleClose}>
                <Typography
                  component="h6"
                  variant="h6"
                  color="black"
                  noWrap
                  sx={{ flexGrow: 1 }}
                  onClick={() => handleNavItemClick('forSale')}
                >
                  {messages.forSale}
                </Typography>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <Typography
                  component="h1"
                  variant="h6"
                  color="black"
                  noWrap
                  sx={{ flexGrow: 1 }}
                  onClick={() => handleNavItemClick('residentialLettings')}
                >
                  {messages.residentialLettings}
                </Typography>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <Typography
                  component="h1"
                  variant="h6"
                  color="black"
                  noWrap
                  sx={{ flexGrow: 1 }}
                  onClick={() => handleNavItemClick('studentLettings')}
                >
                  {messages.studentLettings}
                </Typography>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <Typography
                  component="h1"
                  variant="h6"
                  color="black"
                  noWrap
                  sx={{ flexGrow: 1 }}
                  onClick={() => handleNavItemClick('about')}
                >
                  {messages.about}
                </Typography>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <Typography
                  component="h1"
                  variant="h6"
                  color="black"
                  noWrap
                  sx={{ flexGrow: 1 }}
                  onClick={() => handleNavItemClick('contact')}
                >
                  {messages.contact}
                </Typography>
              </MenuItem>
            </Menu>
          </Grid>
        )}
      </Toolbar>
    </AppBar>
  );
}
