import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import customerSupport from '../../../../assets/images/customer-support.png';
import photoCamera from '../../../../assets/images/photo-camera.png';
import socialMedia from '../../../../assets/images/social-media.png';
import tool from '../../../../assets/images/tool.png';

const ServiceBox = ({ viewportSize }: any) => {
  const services: { title: string; logo: string }[] = [
    { title: 'Customer Support', logo: customerSupport },
    { title: 'Professional Photography', logo: photoCamera },
    { title: 'Social Media Marketing', logo: socialMedia },
    { title: 'In-House Maintenance', logo: tool }
  ];

  return (
    <Grid container xs={12} justifyContent={'center'}>
      <Grid
        md={10}
        xs={11}
        container
        justifyContent={'center'}
        sx={{
          width: 'auto',
          backgroundColor: 'darkred',
          paddingY: 4,
          borderRadius: '10px',
          color: 'white'
        }}
      >
        <Grid item mb={4} xs={12}>
          <Typography
            variant={viewportSize.width > 500 ? 'h2' : 'h3'}
            sx={{ textAlign: 'center', fontWeight: 700, lineHeight: '40px', letterSpacing: '1.5px', padding: '10px' }}
          >
            The leading estate agents offering a comprehensive,
            <br /> all in one property marketing solution
          </Typography>
        </Grid>

        {services.map((service, index) => (
          <Grid item key={index} style={{ textAlign: 'center' }} mt={4} mb={4} md={3} lg={3} xs={12}>
            <Box
              component="img"
              src={service.logo}
              sx={{
                maxWidth: '90px',
                maxHeight: '110px',
                transition: 'all 0.3s ease-in-out',
                '&:hover': {
                  transform: 'scale(1.07)',
                  cursor: 'default'
                }
              }}
            />
            <Typography variant="h4" sx={{ letterSpacing: '1.5px', cursor: 'text' }} mt={2}>
              {service.title}
            </Typography>
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};

export default ServiceBox;
