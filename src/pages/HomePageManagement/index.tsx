import * as React from 'react';
import { Box, Divider, Grid, Link, Stack, Typography } from '@mui/material';

import { createStructuredSelector } from 'reselect';

import About from './container/About';
import NavBar from 'container/Nav';
import Footer from 'container/Footer';
import { PropertyCard } from 'pages/PropertyManagement/containers';
import { useDispatch, useSelector } from 'react-redux';
import * as Selectors from './selectors';
import { getAllProperties } from './slice';
import { LoadingIndicator } from 'components';
import { useEffect, useState } from 'react';
import { getSiteStatus } from 'pages/AppManagement/slice';

import lg1 from '../../assets/images/lg1.png';
import lg2 from '../../assets/images/lg2.jpg';
import lg3 from '../../assets/images/lg3.png';
import lg4 from '../../assets/images/lg4.png';

import sl1 from '../../assets/images/sl1.jpg';
import sl2 from '../../assets/images/sl2.jpg';
import sl3 from '../../assets/images/sl3.jpg';
import sl4 from '../../assets/images/sl4.jpg';
import sl5 from '../../assets/images/sl5.jpg';

const stateSelector = createStructuredSelector({
  loading: Selectors.makeSelectPropertiesLoading(),
  properties: Selectors.makeSelectPropertiesData()
});

const styles = {
  slideshowContainer: {
    position: 'relative',
    maxWidth: '100%',
    overflow: 'hidden'
  },
  slide: {
    display: 'none',
    transition: 'opacity 0.5s ease-in-out' // Add this line
  },
  activeSlide: {
    display: 'block'
  },
  image: {
    width: '100%',
    height: 'auto'
  }
};

export default function HomePageManagement() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const dispatch = useDispatch();
  const { properties, loading } = useSelector(stateSelector);
  useEffect(() => {
    const initialState = {
      bathroom: 0,
      bedroom: 0,
      price: { from: null, to: null }
    };
    dispatch(getAllProperties(initialState));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const images = [sl1, sl2, sl3, sl4, sl5];

  const logoImages = [lg3, lg1, lg2, lg4];

  useEffect(() => {
    dispatch(getSiteStatus());
  });

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex(prevIndex => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    }, 3000); // Change the interval as needed (currently set to 5 seconds)

    return () => clearInterval(intervalId);
  }, [images.length]);

  return (
    <>
      <NavBar />
      <Grid sx={{ paddingTop: { xs: 5 } }}>
        <Grid
          sx={{ maxHeight: { md: '600px', xs: '250px', sm: '500px', lg: '800px' } }}
          style={{ position: 'relative', overflow: 'hidden' }}
        >
          {images.map((image, index) => (
            <div
              key={index}
              style={index === currentImageIndex ? { ...styles.slide, ...styles.activeSlide } : styles.slide}
            >
              <img src={image} alt={`Slide ${index}`} style={styles.image} />
            </div>
          ))}
        </Grid>
      </Grid>
      <Stack alignItems={'center'}>
        {properties.length > 0 && (
          <>
            <Typography mt={'6rem'} variant="h2">
              Featured Property
            </Typography>
            <Grid
              sx={{ justifyContent: 'center' }}
              container
              spacing={{ xs: 2, md: 3, lg: 4 }}
              columns={{ xs: 4, sm: 8, md: 12 }}
              pt={4}
            >
              {loading && <LoadingIndicator visible={loading} />}
              <PropertyCard isHomePage={true} properties={properties} />
            </Grid>
            {properties.length > 3 && (
              <Link href="/properties" sx={{ marginTop: '1rem', color: 'red', textDecoration: 'none' }}>
                View More
              </Link>
            )}
          </>
        )}
        <Typography mt={'6rem'} variant="h2">
          About
        </Typography>
        <About isHomePage={true} />
        <Grid container sx={{ paddingBottom: '40px', justifyContent: 'center', alignItems: 'center' }}>
          {logoImages.map((image, index) => (
            <Grid
              item
              key={index}
              sx={{ margin: 6 }} // Adjust margin for spacing between images
            >
              <Box
                component="img"
                src={image}
                alt={`logo ${index + 1}`}
                sx={{ maxWidth: '180px', maxHeight: '150px' }} // Adjust size as needed
              />
            </Grid>
          ))}
        </Grid>
        <Divider orientation="horizontal" variant="middle" component={'big'} />
        {/* <Typography variant="h2">Testimonial</Typography> */}
        {/* <Testimonial isHomePage={true} /> */}
      </Stack>
      <Footer />
    </>
  );
}
