import React from 'react';
import { Box, Card, CardMedia, Grid, Typography } from '@mui/material';
import pr1 from '../../../../assets/images/pr1.jpg';
import pr2 from '../../../../assets/images/pr2.jpg';
import pr3 from '../../../../assets/images/pr3.jpg';
import { getEncodedQueryParams, localRedirect } from 'utils';

const properties = [
  { id: 'forSale', image: pr1, title: 'Find Homes For Sale' },
  { id: 'studentLettings', image: pr2, title: 'Student Lettings' },
  { id: 'residentialLettings', image: pr3, title: 'Residential Lettings' }
];

const handleNavItemClick = (id: string) => {
  switch (id) {
    case 'studentLettings':
    case 'residentialLettings':
    case 'forSale': {
      const search = getEncodedQueryParams({ category: id });
      localRedirect('/properties', { search });
      break;
    }
    default:
      break;
  }
};

export default function DiscoverProperties() {
  return (
    <Grid container sx={{ paddingTop: { xs: 20 } }}>
      <Grid item xs={12}>
        <Typography
          mb={3}
          sx={{
            fontWeight: 800,
            fontSize: '34px',
            color: 'darkred',
            lineHeight: '1.2',
            marginTop: '0',
            textAlign: 'center'
          }}
        >
          Discover the Best Properties in Town!
        </Typography>
      </Grid>
      <Grid container item p={0} xs={12} spacing={{ md: 3 }} gap={{ xs: 3, md: 4 }} justifyContent="center">
        {properties.map(property => (
          <Grid
            item
            xs={11}
            sm={6}
            md={3}
            key={property.id}
            onClick={() => {
              handleNavItemClick(property.id);
            }}
          >
            <Card sx={{ position: 'relative', height: 350, borderRadius: 2, overflow: 'hidden', cursor: 'pointer' }}>
              <CardMedia component="img" height="100%" image={property.image} alt="Property" />
              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  backgroundColor: 'rgba(0, 0, 0, 0.5)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center'
                }}
              >
                <Typography
                  variant="h1"
                  sx={{
                    color: 'white',
                    WebkitTextStroke: '1px white',
                    fontWeight: '900',
                    padding: '20px',
                    letterSpacing: '2.3px'
                  }}
                >
                  {property.title}
                </Typography>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
}
