/* eslint-disable jsx-a11y/img-redundant-alt */
import { Box, Grid, Typography } from '@mui/material';
import { createStructuredSelector } from 'reselect';
import { useDispatch, useSelector } from 'react-redux';

import NavBar from 'container/Navbar';
import Footer from 'container/Footer';
import * as Selectors from './selectors';
import { LoadingIndicator } from 'components';
import React, { useEffect } from 'react';
import { getSiteStatus } from 'pages/AppManagement/slice';
import SearchProperty from './containers/SearchProperty';
import sl1 from '../../assets/images/sl3.jpg';
import PropertyCards from './containers/PropertyCards';
import { getAllProperties } from './slice';
import { getDecodedQueryParams } from 'utils';

const stateSelector = createStructuredSelector({
  loading: Selectors.makeSelectPropertiesLoading(),
  properties: Selectors.makeSelectPropertiesData()
});

export default function PropertyManagement() {
  const dispatch = useDispatch();
  const { properties, loading } = useSelector(stateSelector);
  const { category } = getDecodedQueryParams();

  useEffect(() => {
    dispatch(getSiteStatus());
    dispatch(
      getAllProperties({
        category
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);

  return (
    <>
      <NavBar />
      {loading && <LoadingIndicator visible={loading} />}
      <Grid
        sx={{
          paddingTop: { xs: 5 },
          backgroundImage: `url(${sl1})`,
          justifyContent: 'center',
          height: '60vh',
          marginTop: '90px',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundPositionY: '10%',
          backgroundColor: 'rgba(0, 0, 0, 0.3)',
          backgroundBlendMode: 'overlay'
        }}
        gap={1}
        container
      >
        <Grid item xs={11.5} md={11} paddingTop={{ xs: 25 }}>
          <SearchProperty />
        </Grid>
      </Grid>
      <Box sx={{ padding: '30px' }} mt={2}>
        <Typography
          mb={3}
          sx={{
            fontWeight: 800,
            fontSize: '24px',
            color: 'darkred',
            lineHeight: '1.2',
            textAlign: 'left'
          }}
        >
          242 properties found
        </Typography>
        <Grid container spacing={{ xs: 2, md: 3, lg: 4 }} columns={{ xs: 4, sm: 8, md: 12 }}>
          {loading && <LoadingIndicator visible={loading} />}
          <PropertyCards properties={properties} />
        </Grid>
      </Box>
      <Footer />
    </>
  );
}
