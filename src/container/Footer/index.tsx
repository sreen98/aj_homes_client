import * as React from 'react';
import { Grid, Stack, Typography } from '@mui/material';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PhoneIcon from '@mui/icons-material/Phone';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import messages from './messages';
import logo from '../../assets/images/Original.png';

import { localRedirect } from 'utils';

export default function Footer() {
  const handleClick = (type: string) => {
    if (type === 'whatsapp') {
      window.open('https://wa.me/message/ZU2QD6XT7TCRM1');
      window.location.href = 'https://wa.me/message/ZU2QD6XT7TCRM1';
    } else if (type === 'facebook') {
      window.open('https://www.facebook.com/profile.php?id=100094013497737');
    } else {
      window.open('https://www.instagram.com/aj_homes_lettings/');
    }
  };

  return (
    <Grid sx={{ width: 'auto', backgroundColor: 'darkred', paddingY: 4 }}>
      <Grid container justifyContent="center" mb={4}>
        <Typography variant="h4" color="white" sx={{ textAlign: 'center', width: '100%', fontWeight: 'bold' }}>
          {messages.header}
        </Typography>
      </Grid>

      <Grid
        container
        spacing={{ xs: 2, md: 2, lg: 3 }}
        columns={9}
        paddingX={{ xs: 2, md: 3, lg: 5 }}
        sx={{ paddingTop: 3 }}
        justifyContent={'space-between'}
      >
        {messages.quickLinks.map(item => (
          <Grid item xs={12} sm={4} md={3} lg={1} key={item}>
            <Typography
              color="white"
              sx={{
                textAlign: 'center',
                backgroundColor: '#8B0000',
                borderRadius: 1,
                fontSize: '15px',
                fontWeight: 600
              }}
            >
              {item}
            </Typography>
          </Grid>
        ))}
      </Grid>

      <Grid container sx={{ padding: '30px' }} spacing={3} alignItems="center" mt={3}>
        <Grid item xs={12} md={2} display="flex" justifyContent="center">
          <img
            src={logo}
            alt="AJ Homes Logo"
            style={{ maxHeight: '60px', cursor: 'pointer' }}
            onClick={() => localRedirect('/')}
          />
        </Grid>
        <Grid item xs={12} md={4} display="flex">
          <Typography variant="h6" color="white">
            {messages.aboutUs}
          </Typography>
        </Grid>

        <Grid item xs={12} md={5} display="flex" justifyContent="center">
          <Stack spacing={2}>
            <Grid style={{ display: 'flex', gap: 15, alignItems: 'center', cursor: 'pointer' }}>
              <MailOutlineIcon style={{ color: 'white' }} />
              <Typography color={'white'} fontSize={16}>
                info@ajhomeslettings.co.uk
              </Typography>
            </Grid>

            <Grid style={{ display: 'flex', gap: 15, alignItems: 'center' }}>
              <PhoneIcon style={{ color: 'white' }} />

              <Typography color={'white'} fontSize={16}>
                <a
                  style={{ textDecoration: 'none', display: 'flex', gap: 15, marginBottom: '5px', color: 'white' }}
                  href="tel:+447450238686"
                >
                  +447450238686
                </a>
              </Typography>
            </Grid>

            <Grid
              onClick={() => handleClick('whatsapp')}
              style={{ display: 'flex', gap: 15, alignItems: 'center', cursor: 'pointer' }}
            >
              <WhatsAppIcon style={{ color: 'white' }} />
              <Typography color={'white'} fontSize={16}>
                +447450238686
              </Typography>
            </Grid>

            <Grid
              onClick={() => handleClick('facebook')}
              style={{ display: 'flex', gap: 15, alignItems: 'center', cursor: 'pointer' }}
            >
              <FacebookIcon style={{ color: 'white' }} />
              <Typography color={'white'} fontSize={16}>
                Facebook
              </Typography>
            </Grid>

            <Grid
              onClick={() => handleClick('instagram')}
              style={{ display: 'flex', gap: 15, alignItems: 'center', cursor: 'pointer' }}
            >
              <InstagramIcon style={{ color: 'white' }} />
              <Typography color={'white'} fontSize={16}>
                Instagram
              </Typography>
            </Grid>
          </Stack>
        </Grid>
      </Grid>
    </Grid>
  );
}
