import * as React from 'react';
import { AppBar, Button, Grid, Menu, MenuItem, Stack, Toolbar, Typography } from '@mui/material';

import { localRedirect } from 'utils';
import messages from './messages';
import { useEffect, useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import logo from '../../assets/images/Original.png';
// import messages from './messages';

const useViewportSize = () => {
  const [viewportSize, setViewportSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  useEffect(() => {
    const handleResize = () => {
      setViewportSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); // Empty dependency array ensures that the effect runs only once, similar to componentDidMount

  return viewportSize;
};

export default function NavBar() {
  const viewportSize = useViewportSize();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <AppBar
      sx={{ width: '100%', paddingTop: '10px', paddingBottom: '10px' }}
      position="absolute"
      style={{ backgroundColor: 'darkred' }}
    >
      <Toolbar
        sx={{
          pr: '24px' // keep right padding when drawer closed
        }}
      >
        <Grid sx={{ paddingLeft: { md: '40px' }, paddingTop: '5px', flexGrow: 1, justifyContent: { lg: 'center' } }}>
          <img
            style={{ maxHeight: '50px', flexGrow: 1, justifyContent: 'center' }}
            src={logo}
            alt="aj homes logo"
          ></img>
        </Grid>
        {viewportSize.width > 600 ? (
          <Stack direction="row" spacing={2}>
            <Typography
              style={{ cursor: 'pointer' }}
              component="h1"
              variant="h5"
              color="white"
              noWrap
              sx={{ flexGrow: 1 }}
              onClick={() => localRedirect('/home')}
            >
              {messages.home}
            </Typography>
            <Typography
              style={{ cursor: 'pointer' }}
              component="h1"
              variant="h5"
              color="white"
              noWrap
              sx={{ flexGrow: 1 }}
              onClick={() => localRedirect('/about')}
            >
              {messages.about}
            </Typography>
            <Typography
              style={{ cursor: 'pointer' }}
              component="h1"
              variant="h5"
              color="white"
              noWrap
              sx={{ flexGrow: 1 }}
              onClick={() => localRedirect('/properties')}
            >
              {messages.properties}
            </Typography>
            {/* <Typography
              style={{ cursor: 'pointer' }}
              component="h1"
              variant="h6"
              color="white"
              noWrap
              sx={{ flexGrow: 1 }}
              onClick={() => localRedirect('/testimonials')}
            >
              {messages.testimonials}
            </Typography> */}
            <Typography
              style={{ cursor: 'pointer' }}
              component="h1"
              variant="h5"
              color="white"
              noWrap
              sx={{ flexGrow: 1 }}
              onClick={() => localRedirect('/contact')}
            >
              {messages.contact}
            </Typography>
          </Stack>
        ) : (
          <div>
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
                  onClick={() => localRedirect('/home')}
                >
                  {messages.home}
                </Typography>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <Typography
                  component="h1"
                  variant="h6"
                  color="black"
                  noWrap
                  sx={{ flexGrow: 1 }}
                  onClick={() => localRedirect('/about')}
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
                  onClick={() => localRedirect('/properties')}
                >
                  {messages.properties}
                </Typography>
              </MenuItem>
              {/* <MenuItem onClick={handleClose}>
                <Typography
                  component="h1"
                  variant="h6"
                  color="black"
                  noWrap
                  sx={{ flexGrow: 1 }}
                  onClick={() => localRedirect('/testimonials')}
                >
                  {messages.testimonials}
                </Typography>
              </MenuItem> */}
              <MenuItem onClick={handleClose}>
                <Typography
                  component="h1"
                  variant="h6"
                  color="black"
                  noWrap
                  sx={{ flexGrow: 1 }}
                  onClick={() => localRedirect('/contact')}
                >
                  {messages.contact}
                </Typography>
              </MenuItem>
            </Menu>
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
}
