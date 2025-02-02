import * as React from 'react';
import { Grid, Typography } from '@mui/material';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PhoneIcon from '@mui/icons-material/Phone';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';

import { localRedirect } from 'utils';

export default function Footer() {
  const [state, setState] = React.useState({ isMobileDevice: false });
  const handleClick = (type: string) => {
    if (type === 'whatsapp') {
      window.location.href = 'https://wa.me/message/ZU2QD6XT7TCRM1';
    } else if (type === 'facebook') {
      window.location.href = 'https://www.facebook.com/profile.php?id=100094013497737';
    } else {
      window.location.href = 'https://www.instagram.com/aj_homes_lettings/';
    }
  };

  React.useEffect(() => {
    if (/Android|iPhone/i.test(navigator.userAgent)) {
      setState({ isMobileDevice: true });
    }
  }, []);
  return (
    <Grid sx={{ width: 'auto' }} style={{ backgroundColor: 'darkred' }}>
      <Grid
        container
        spacing={{ xs: 2, md: 3, lg: 4 }}
        justifyContent={'left'}
        pl={{ xs: 2, md: 3, lg: 10 }}
        style={{ paddingBottom: '60px' }}
      >
        <Grid xs={12} sm={6} lg={4} md={4} justifyContent={'left'} p={{ xs: 2, md: 3, lg: 4 }}>
          <Typography color={'white'} fontWeight={600}>
            About Site
          </Typography>
          <Typography color={'white'} maxWidth="xs" fontSize={16} style={{ width: '300px', marginTop: '20px' }}>
            Welcome to AJ Homes & Lettings Ltd, where we redefine the letting experience with a fresh perspective and a
            commitment to bridging the gap in the market.
          </Typography>
        </Grid>
        <Grid xs={12} sm={6} lg={4} md={4} justifyContent={'left'} p={{ xs: 2, md: 3, lg: 4 }}>
          <Typography color={'white'} fontWeight={600} marginBottom={2}>
            Quick Links
          </Typography>
          <Typography sx={{ cursor: 'pointer' }} color={'white'} fontSize={16} onClick={() => localRedirect('/home')}>
            Home
          </Typography>
          <Typography
            sx={{ cursor: 'pointer' }}
            color={'white'}
            fontSize={16}
            onClick={() => localRedirect('/properties')}
          >
            Properties
          </Typography>
          <Typography sx={{ cursor: 'pointer' }} color={'white'} fontSize={16} onClick={() => localRedirect('/about')}>
            About
          </Typography>
          <Typography
            sx={{ cursor: 'pointer' }}
            color={'white'}
            fontSize={16}
            onClick={() => localRedirect('/maintenance')}
          >
            Maintenance
          </Typography>
          <Typography
            sx={{ cursor: 'pointer' }}
            color={'white'}
            fontSize={16}
            onClick={() => localRedirect('/contact')}
          >
            Contact
          </Typography>
          <Typography sx={{ cursor: 'pointer' }} color={'white'} fontSize={16} onClick={() => localRedirect('/faq')}>
            FAQ
          </Typography>
          <Typography
            sx={{ cursor: 'pointer' }}
            color={'white'}
            fontSize={16}
            onClick={() => localRedirect('/privacy-policy')}
          >
            Privacy and Policy
          </Typography>
        </Grid>
        <Grid xs={12} sm={6} lg={4} md={4} justifyContent={'left'} p={{ xs: 2, md: 3, lg: 4 }}>
          <Typography color={'white'} fontWeight={600} marginBottom={2}>
            Contact Us
          </Typography>
          <div style={{ display: 'flex', gap: 15, marginBottom: '5px', cursor: 'pointer' }}>
            <MailOutlineIcon style={{ color: 'white' }} />
            <Typography color={'white'} fontSize={16}>
              info@ajhomeslettings.co.uk
            </Typography>
          </div>
          {!state.isMobileDevice ? (
            <div style={{ display: 'flex', gap: 15, marginBottom: '5px', cursor: 'pointer' }}>
              <PhoneIcon style={{ color: 'white' }} />
              <Typography color={'white'} fontSize={16} marginTop="5px">
                +447450238686
              </Typography>
            </div>
          ) : (
            <a
              style={{ textDecoration: 'none', display: 'flex', gap: 15, marginBottom: '5px' }}
              href="tel:+447450238686"
            >
              <PhoneIcon style={{ color: 'white' }} />
              <Typography color={'white'} fontSize={16} marginTop="5px">
                +447450238686
              </Typography>
            </a>
          )}
          <div
            onClick={() => handleClick('whatsapp')}
            style={{ display: 'flex', cursor: 'pointer', gap: 15, marginBottom: '5px' }}
          >
            <WhatsAppIcon style={{ color: 'white', marginTop: '2px' }} />
            <Typography color={'white'} fontSize={16} marginTop="5px">
              +447450238686
            </Typography>
          </div>
          <div
            onClick={() => handleClick('facebook')}
            style={{ display: 'flex', cursor: 'pointer', gap: 15, marginBottom: '5px' }}
          >
            <FacebookIcon style={{ color: 'white', marginTop: '2px' }} />
            <Typography color={'white'} fontSize={16} marginTop="5px">
              Facebook
            </Typography>
          </div>
          <div onClick={() => handleClick('instagram')} style={{ display: 'flex', cursor: 'pointer', gap: 15 }}>
            <InstagramIcon style={{ color: 'white', marginTop: '2px' }} />
            <Typography color={'white'} fontSize={16} marginTop="5px">
              Instagram
            </Typography>
          </div>
        </Grid>
      </Grid>
      <Grid container justifyContent="center">
        <Typography style={{ paddingBottom: '20px' }} color={'white'} fontSize={16}>
          © 2024 AJ Homes. All Right Reserved.
        </Typography>
      </Grid>
    </Grid>
  );
}
