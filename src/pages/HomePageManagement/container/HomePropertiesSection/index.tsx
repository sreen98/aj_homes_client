import React, { useEffect, useState } from 'react';
import { Grid, Link, Typography } from '@mui/material';
import { LoadingIndicator } from 'components';
import PropertyCards from 'pages/PropertyManagement/containers/PropertyCards';

const HomePropertiesSection = ({ title, properties, loading, isFeatured }: any) => {
  const propertiesArray = isFeatured ? properties.filter((property: any) => property.isFeatured === true) : properties;

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
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);

    return viewportSize;
  };
  const viewportSize = useViewportSize();

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
              sx={{ justifyContent: viewportSize.width > 900 ? 'flex-start' : 'center' }}
              container
              spacing={{ xs: 2, md: 3, lg: 4 }}
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
