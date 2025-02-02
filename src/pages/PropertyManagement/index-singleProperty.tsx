import { Container, Grid } from '@mui/material';
import { createStructuredSelector } from 'reselect';

import NavBar from 'container/Nav';
import Footer from 'container/Footer';
import ViewProperty from './containers/ViewProperty';
import * as Selectors from './selectors';
import { useEffect } from 'react';
import { getPropertyDetails } from './slice';
import { useDispatch, useSelector } from 'react-redux';
import { getDecodedQueryParams } from 'utils';
import { LoadingIndicator } from 'components';

const stateSelector = createStructuredSelector({
  loading: Selectors.makeSelectPropertiesLoading()
});

export default function PropertyDetails() {
  const dispatch = useDispatch();
  const { loading } = useSelector(stateSelector);

  const { propertyId } = getDecodedQueryParams();
  useEffect(() => {
    if (propertyId) dispatch(getPropertyDetails(propertyId));
  }, [propertyId]);

  return (
    <>
      <NavBar />
      {loading && <LoadingIndicator visible={loading} />}
      <Container maxWidth="xl" sx={{ marginLeft: 0, marginBottom: '6rem' }}>
        <Grid container spacing={{ xs: 2, md: 3, lg: 4 }} columns={{ xs: 4, sm: 8, md: 12 }} pt={4}>
          <ViewProperty />
        </Grid>
      </Container>
      <Footer />
    </>
  );
}
