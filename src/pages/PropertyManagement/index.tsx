import { Container, Grid } from '@mui/material';
import { createStructuredSelector } from 'reselect';
import { useDispatch, useSelector } from 'react-redux';

import { PropertyCard } from './containers';
import NavBar from 'container/Nav';
import Footer from 'container/Footer';
import PropertyFilter from 'pages/PropertyManagement/containers/PropertyFilter';
import * as Selectors from './selectors';
import { LoadingIndicator } from 'components';
import React, { useEffect } from 'react';
import { getSiteStatus } from 'pages/AppManagement/slice';

const stateSelector = createStructuredSelector({
  loading: Selectors.makeSelectPropertiesLoading(),
  properties: Selectors.makeSelectPropertiesData()
});

export default function PropertyManagement() {
  const dispatch = useDispatch();
  const { properties, loading } = useSelector(stateSelector);

  useEffect(() => {
    dispatch(getSiteStatus());
  });

  return (
    <>
      <NavBar />
      {loading && <LoadingIndicator visible={loading} />}
      <div
        style={{
          display: 'flex',
          paddingTop: '7rem',
          paddingBottom: '7rem',
          justifyContent: 'center',
          width: '100vw',
          background: 'linear-gradient(to top, #ff0000, #c20023, #820327, #420f1d, #000000)',
          borderRadius: '25%',
          position: 'relative'
          // backgroundImage:
          //   'https://images.unsplash.com/photo-1710781404053-dc7ffa39c996?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
        }}
      >
        <div
          style={{ width: '80vw', position: 'absolute', top: '100%', left: '50%', transform: 'translate(-50%, -60%)' }}
        >
          <PropertyFilter />
        </div>
      </div>

      <Container maxWidth="xl" sx={{ marginTop: '7rem', paddingBottom: '3rem' }}>
        <Grid container spacing={{ xs: 2, md: 3, lg: 4 }} columns={{ xs: 4, sm: 8, md: 12 }} pt={4}>
          <PropertyCard properties={properties} />
        </Grid>
      </Container>
      <Footer />
    </>
  );
}
