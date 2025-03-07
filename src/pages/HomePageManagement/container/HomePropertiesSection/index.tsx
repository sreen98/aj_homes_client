import { Grid, Link, Stack, Typography } from '@mui/material';
import { LoadingIndicator } from 'components';
import PropertyCards from 'pages/PropertyManagement/containers/PropertyCards';
import React, { useMemo } from 'react';

const HomePropertiesSection = ({ title, properties, loading, isFeatured }: any) => {
  const propertiesArray = isFeatured ? properties.filter((property: any) => property.isFeatured === true) : properties;
  return (
    <>
      {loading && <LoadingIndicator visible={loading} />}
      <Grid container alignItems={'center'} xs={12} justifyContent={'center'}>
        {propertiesArray?.length > 0 && (
          <Grid container md={10} xs={11}>
            <Grid item md={8} xs={12}>
              <Typography
                sx={{
                  fontWeight: 800,
                  fontSize: '34px',
                  color: 'darkred',
                  marginTop: '0',
                  textAlign: { xs: 'center', md: 'left' }
                }}
              >
                {title}
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              md={4}
              sx={{ display: 'flex', justifyContent: { xs: 'flex-end', md: 'flex-end' }, alignItems: 'flex-start' }}
            >
              {propertiesArray?.length > 3 && (
                <Link
                  href="/properties"
                  sx={{
                    marginTop: '1rem',
                    color: 'darkred',
                    textDecoration: 'none',
                    fontWeight: 700
                  }}
                >
                  {`See all ${isFeatured ? 'featured' : 'new'} properties  >`}
                </Link>
              )}
            </Grid>

            <Grid
              sx={{ justifyContent: 'center' }}
              container
              spacing={{ xs: 2, md: 3, lg: 4 }}
              columns={{ xs: 4, sm: 8, md: 12 }}
              pt={4}
            >
              {loading && <LoadingIndicator visible={loading} />}
              <PropertyCards isHomePage={true} properties={propertiesArray} />
            </Grid>
          </Grid>
        )}
      </Grid>
    </>
  );
};

export default HomePropertiesSection;
