/* eslint-disable jsx-a11y/img-redundant-alt */
import { Box, Button, Grid, Typography } from '@mui/material';
import { createStructuredSelector } from 'reselect';
import { useDispatch, useSelector } from 'react-redux';

import NavBar from 'container/Navbar';
import Footer from 'container/Footer';
import * as Selectors from './selectors';
import { LoadingIndicator } from 'components';
import React, { useEffect, useState } from 'react';
import { getSiteStatus } from 'pages/AppManagement/slice';
import SearchProperty from './containers/SearchProperty';
import sl1 from '../../assets/images/sl3.jpg';
import PropertyCards from './containers/PropertyCards';
import { getFilteredProperties } from './slice';
import { getDecodedQueryParams, localRedirect } from 'utils';

const stateSelector = createStructuredSelector({
  loading: Selectors.makeSelectPropertiesLoading(),
  properties: Selectors.makeSelectPropertiesData()
});
const initialState = { category: '', bedrooms: '', bathrooms: '', priceFrom: '', priceTo: '' };

export default function PropertyManagement() {
  const dispatch = useDispatch();
  const { properties, loading } = useSelector(stateSelector);
  const { category, bedrooms, bathrooms, priceFrom, priceTo } = getDecodedQueryParams();
  const [state, setState] = useState(initialState);

  useEffect(() => {
    dispatch(getSiteStatus());
    setState({ category, bedrooms, bathrooms, priceFrom, priceTo });

    dispatch(
      getFilteredProperties({
        category,
        bedroom: Number(bedrooms),
        bathroom: Number(bathrooms),
        price: { from: Number(priceFrom), to: Number(priceTo) }
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bedrooms, bathrooms, priceFrom, priceTo, category]);

  return (
    <>
      <NavBar />
      {loading && <LoadingIndicator visible={loading} />}
      <Grid
        sx={{
          paddingTop: { xs: 5 },
          backgroundImage: `url(${sl1})`,
          justifyContent: 'center',
          height: '50vh',
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
        <Grid item xs={10} md={10} lg={10} mt={10}>
          <SearchProperty
            onClickSearch={(searchValues: any) => {
              setState({
                ...state,
                bathrooms: searchValues.bathrooms,
                bedrooms: searchValues.bedrooms,
                priceFrom: searchValues.price.from,
                priceTo: searchValues.price.to
              });
              dispatch(
                getFilteredProperties({
                  category,
                  bedroom: searchValues.bedrooms,
                  bathroom: searchValues.bathrooms,
                  price: { from: searchValues.price.from, to: searchValues.price.to }
                })
              );
            }}
            search={state}
          />
        </Grid>
      </Grid>
      <Box sx={{ padding: '30px' }} mt={2}>
        <Grid container>
          <Grid md={6} xs={12} item>
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
              {`${properties.length} ${properties.length === 1 ? 'Property' : 'Properties'} Found`}
            </Typography>
          </Grid>
          <Grid
            xs={12}
            md={6}
            item
            justifyContent={'flex-end'}
            sx={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}
          >
            <Button
              size="small"
              sx={{
                backgroundColor: '#cf1313',
                paddingLeft: '15px',
                paddingRight: '15px',
                fontWeight: 600,
                color: 'white',
                borderRadius: '10px',
                '&:hover': {
                  backgroundColor: '#cf1313',
                  transition: 'all 0.3s ease-in-out',
                  transform: 'scale(1.07)'
                }
              }}
              onClick={() => {
                setState(initialState);
                dispatch(
                  getFilteredProperties({
                    category: state.category,
                    price: { from: null, to: null },
                    bedroom: null,
                    bathroom: null
                  })
                );
                localRedirect('/properties');
              }}
            >
              Reset Filter
            </Button>
          </Grid>
        </Grid>

        <Grid container spacing={{ xs: 2, md: 3, lg: 4 }}>
          {loading && <LoadingIndicator visible={loading} />}
          {properties.length > 0 ? (
            <PropertyCards properties={properties} />
          ) : (
            <Box sx={{ backgroundColor: '#f5f5f5', margin: '30px' }}>
              <Typography
                mb={3}
                sx={{
                  fontWeight: 800,
                  fontSize: '20px',
                  padding: '50px',
                  lineHeight: '1.4',
                  textAlign: 'center'
                }}
              >
                We couldn't find any properties matching your search at the moment. Try adjusting your search criteria
                or check back later for new listings!
              </Typography>
            </Box>
          )}
        </Grid>
      </Box>
      <Footer />
    </>
  );
}
