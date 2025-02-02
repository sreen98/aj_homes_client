import * as React from 'react';
import { Box, Button, Card, CardMedia, FormControl, Grid, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import NavBar from 'container/Nav';
import Footer from 'container/Footer';
import { Enquiry } from './types';
import { useDispatch } from 'react-redux';
import { createEnquiry } from './slice';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PhoneIcon from '@mui/icons-material/Phone';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import { getDecodedQueryParams } from 'utils';
import { Snackbar } from '@mui/material';
import Alert from '@mui/material/Alert';
import { getSiteStatus } from 'pages/AppManagement/slice';

const initialState = {
  name: '',
  emailId: '',
  subject: '',
  message: '',
  phoneNumber: ''
};

export default function EnquiryManagement() {
  const [formData, setFormData] = useState<Enquiry>(initialState);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [state, setState] = useState({ isMobileDevice: false });

  useEffect(() => {
    if (/Android|iPhone/i.test(navigator.userAgent)) {
      setState({ isMobileDevice: true });
    }
  }, []);

  useEffect(() => {
    dispatch(getSiteStatus());
  });

  const dispatch = useDispatch();
  const { propertyId } = getDecodedQueryParams();

  const handleChange = (e: any) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value
    });
  };
  const handleCloseSnackbar = (_event: any, reason: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };
  const handleCloseAlert = () => {
    setOpenSnackbar(false);
  };

  const handleSubmit = (event: any) => {
    if (!formData?.name || !formData?.emailId || !formData.message || !formData.phoneNumber) {
      setOpenSnackbar(true);
      setAlertMessage('Please provide details to send your message');
      return;
    }
    const response = dispatch(createEnquiry({ ...formData, ...(propertyId && { propertyId }) }));
    if (response.payload) {
      setOpenSnackbar(true);
      setAlertMessage('Enquiry submitted successfully!');
      setFormData(initialState);
    } else {
      setAlertMessage('Failed to submit enquiry. Please try again later.');
      setOpenSnackbar(true);
    }
  };

  const handleClick = (type: string) => {
    if (type === 'whatsapp') {
      window.location.href = 'https://wa.me/message/ZU2QD6XT7TCRM1';
    } else if (type === 'facebook') {
      window.location.href = 'https://www.facebook.com/profile.php?id=100094013497737';
    } else {
      window.location.href = 'https://www.instagram.com/aj_homes_lettings/';
    }
  };

  return (
    <>
      <NavBar />
      <Grid sx={{ paddingTop: { xs: 5 } }}>
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          open={openSnackbar}
          autoHideDuration={4000}
          style={{ justifyContent: 'center' }}
          onClose={handleCloseSnackbar}
        >
          <Alert
            onClose={handleCloseAlert}
            severity={alertMessage.includes('successfully') ? 'success' : 'error'}
            variant="filled"
            sx={{ width: '100%' }}
          >
            {alertMessage}
          </Alert>
        </Snackbar>
        <div style={{ position: 'relative', maxHeight: '380px' }}>
          <CardMedia
            component="img"
            image="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Image Alt Text"
            height="380px"
            sx={{
              maxHeight: { xs: 240, md: 380 }
            }}
          />
          <Typography
            sx={{
              fontSize: { xs: 30, md: 34 }
            }}
            style={{
              position: 'absolute',
              top: '57%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              color: 'white'
            }}
          >
            Contact Us
          </Typography>
        </div>
      </Grid>
      <Grid container my={'6rem'} alignItems="center">
        <Grid
          item
          justifyContent="center"
          container
          sx={{ display: 'flex', paddingInline: { sm: '50px', xs: '10px' } }}
        >
          <Grid item xs={12} sm={6} lg={4} style={{ backgroundColor: 'darkred', padding: '30px' }}>
            <Box>
              <Grid>
                <Typography color="white">Contact Informations</Typography>
                <Typography color="white" fontSize="15px" marginTop="10px">
                  If you have any questions please don’t hesitate to email us at
                </Typography>
              </Grid>
              <Grid style={{ display: 'flex', marginTop: '20px', gap: '20px' }}>
                <MailOutlineIcon style={{ color: 'white' }} />
                <Typography fontSize="15px" color="white">
                  info@ajhomeslettings.co.uk
                </Typography>
              </Grid>
              <Grid style={{ display: 'flex', marginTop: '20px', gap: '20px' }}>
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
              </Grid>
              <Grid style={{ display: 'flex', marginTop: '20px', gap: '20px' }}>
                <WhatsAppIcon style={{ color: 'white' }} />
                <div onClick={() => handleClick('whatsapp')} style={{ cursor: 'pointer' }}>
                  <Typography marginTop="2px" fontSize="15px" color="white">
                    +447450238686
                  </Typography>
                </div>
              </Grid>
              <Grid style={{ display: 'flex', marginTop: '20px', gap: '20px' }}>
                <FacebookIcon style={{ color: 'white' }} />
                <div onClick={() => handleClick('facebook')} style={{ cursor: 'pointer' }}>
                  <Typography marginTop="2px" fontSize="15px" color="white">
                    Facebook
                  </Typography>
                </div>
              </Grid>
              <Grid style={{ display: 'flex', marginTop: '20px', gap: '20px' }}>
                <InstagramIcon style={{ color: 'white' }} />
                <div onClick={() => handleClick('instagram')} style={{ cursor: 'pointer' }}>
                  <Typography marginTop="2px" fontSize="15px" color="white">
                    Instagram
                  </Typography>
                </div>
              </Grid>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Card sx={{ padding: { lg: 7, md: 6, sm: 5, xs: 3 } }}>
              <Typography fontWeight="600" marginBottom="20px">
                We're eager to get your insights!
              </Typography>
              <Grid
                container
                spacing={{ xs: 2, md: 3, lg: 4 }}
                columns={{ xs: 4, sm: 8, md: 12 }}
                pt={4}
                sx={{
                  maxWidth: '600px',
                  marginLeft: { lg: 2 },
                  marginRight: { xs: 2, md: 3, lg: 4 },
                  borderRadius: '10px',
                  padding: 2
                }}
                alignContent={'center'}
              >
                <Grid item xs={12} sm={12} md={6}>
                  <FormControl fullWidth>
                    <TextField label="Name" name="name" value={formData.name} onChange={handleChange} />
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                  <FormControl fullWidth>
                    <TextField
                      label="Email"
                      name="emailId"
                      type="email"
                      value={formData.emailId}
                      onChange={handleChange}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                  <FormControl fullWidth>
                    <TextField label="Subject" name="subject" value={formData.subject} onChange={handleChange} />
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={12} md={6}>
                  <FormControl fullWidth>
                    <TextField
                      label="Phone number"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                    />
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={12} md={12}>
                  <FormControl fullWidth>
                    <TextField label="Message" name="message" value={formData.message} onChange={handleChange} />
                  </FormControl>
                </Grid>
                <Grid item sx={{ width: '100%' }}>
                  <Button sx={{ backgroundColor: 'darkred' }} onClick={handleSubmit} variant="contained" color="error">
                    Send Message
                  </Button>
                </Grid>
              </Grid>
            </Card>
          </Grid>
        </Grid>
      </Grid>
      <Footer />
    </>
  );
}
