import { Container, Grid } from '@mui/material';
import { createStructuredSelector } from 'reselect';

import NavBar from 'container/Navbar';
import Footer from 'container/Footer';
import * as Selectors from './selectors';
import { useEffect } from 'react';
import { getPropertyDetails } from './slice';
import { useDispatch, useSelector } from 'react-redux';
import { getDecodedQueryParams } from 'utils';
import { LoadingIndicator } from 'components';
import PropertyView from './containers/PropertyView';

const stateSelector = createStructuredSelector({
  loading: Selectors.makeSelectPropertiesLoading()
});

export default function PropertyDetails() {
  const dispatch = useDispatch();
  const { loading } = useSelector(stateSelector);

  const { propertyId } = getDecodedQueryParams();

  useEffect(() => {
    if (propertyId) {
      dispatch(getPropertyDetails(propertyId));
    }
  }, [dispatch, propertyId]);
  // #ededed
  return (
    <>
      <NavBar />
      {loading && <LoadingIndicator visible={loading} />}
      <div style={{ backgroundColor: '#ededed' }}>
        <PropertyView />
      </div>
      <Footer />
    </>
  );
}
