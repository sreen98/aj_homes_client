import * as React from 'react';
import { Card, CardMedia, Grid, Typography } from '@mui/material';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getSiteStatus } from 'pages/AppManagement/slice';
// import messages from './messages';

export default function About({ isHomePage = false }: { isHomePage?: boolean }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSiteStatus());
  });

  return (
    <>
      {isHomePage === false && (
        <Grid sx={{ paddingTop: { xs: 5 } }}>
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
              variant="h1"
              style={{
                position: 'absolute',
                top: '57%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                color: 'white'
              }}
            >
              About Us
            </Typography>
          </div>
        </Grid>
      )}
      <Grid
        style={{ padding: '20px', marginTop: '15px', marginBottom: '100px' }}
        container
        spacing={5}
        justifyContent="center"
      >
        <Grid sx={{ display: 'flex', alignItems: 'center' }} item xs={12} md={6} lg={6} xl={4}>
          <Card>
            <CardMedia
              style={{ maxHeight: '390px' }}
              component="img"
              image="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" // Replace with the actual path to your image
              alt="Image Alt Text"
            />
          </Card>
        </Grid>
        <Grid
          sx={{ display: 'flex', alignItems: 'center' }}
          item
          xs={12}
          md={6}
          lg={6}
          xl={4}
          // marginTop={{ md: 10 }}
          // marginBottom={{ md: 20 }}
        >
          <Typography>
            <p style={{ marginBottom: '-30px' }}>
              Welcome to AJ Homes & Lettings Ltd, where we redefine the letting experience with a fresh perspective and
              a commitment to bridging the gap in the market. As a letting agency with a difference, we prioritize the
              needs of both tenants and landlords, striving to create a seamless and efficient environment for all.
            </p>
            <br />
            <p style={{ marginBottom: '-10px' }}>
              Whether you’re a landlord seeking assistance with maintenance, building works, management, cleaning, or
              any other aspect of property ownership and letting drop us a message. Our responsive team is ready to
              provide personalized solutions that meet your unique needs
            </p>
            <br />
            We believe in honesty and integrity as core principles alongside providing the highest level of customer
            service for both landlords and tenants out there as we believe having drawn on previous experience that
            property is expensive, service is priceless.
            <br /> At AJ Homes & Lettings, we’re not just a letting agency; we’re your partners in creating a
            hassle-free and rewarding property experience. Welcome to a new era of letting.
          </Typography>
        </Grid>
      </Grid>
    </>
  );
}
