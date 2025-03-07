import * as React from 'react';
import { Box, Divider, Grid, Stack, Typography } from '@mui/material';

import { createStructuredSelector } from 'reselect';

import About from './container/About';
import NavBar from 'container/Navbar';
import Footer from 'container/Footer';
import { useDispatch, useSelector } from 'react-redux';
import * as Selectors from './selectors';
import { getAllProperties } from './slice';
import { useEffect, useState } from 'react';
import { getSiteStatus } from 'pages/AppManagement/slice';

import lg1 from '../../assets/images/lg1.png';
import lg2 from '../../assets/images/lg2.jpg';
import lg3 from '../../assets/images/lg3.png';
import lg4 from '../../assets/images/lg4.png';
import lg5 from '../../assets/images/lg5.png';

import sl3 from '../../assets/images/sl3.jpg';
import SearchProperty from 'pages/PropertyManagement/containers/SearchProperty';
import DiscoverProperties from './container/DiscoverProperties';
import HomePropertiesSection from './container/HomePropertiesSection';
import ServiceBox from './container/ServiceBox';

const stateSelector = createStructuredSelector({
  loading: Selectors.makeSelectPropertiesLoading(),
  properties: Selectors.makeSelectPropertiesData()
});

export default function HomePageManagement() {
  const dispatch = useDispatch();
  const { loading, properties } = useSelector(stateSelector);
  useEffect(() => {
    dispatch(getSiteStatus());
    dispatch(getAllProperties({}));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const logoImages = [lg3, lg1, lg2, lg4, lg5];

  const services = ['Lettings', 'Sales', 'Property Management'];
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isSliding, setIsSliding] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsSliding(true);
      setTimeout(() => {
        setCurrentWordIndex(prevIndex => (prevIndex + 1) % services.length);
        setIsSliding(false);
      }, 500);
    }, 3000);
    return () => clearInterval(interval);
  }, [services.length]);

  return (
    <>
      <NavBar />
      <Grid
        sx={{
          paddingTop: { xs: 5 },
          backgroundImage: `url(${sl3})`,
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
        <Grid item md={4} xs={12} alignContent={'center'}>
          <Typography
            sx={{
              color: 'white',
              fontSize: '20px',
              fontWeight: 600,
              textAlign: { xs: 'center', md: 'right' },
              '& .highlight': {
                background: 'rgba(0, 0, 0, 0.3)',
                borderRadius: '4px',
                boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)'
              }
            }}
          >
            {`Get expert assistance with`}
          </Typography>
        </Grid>
        <Grid item md={3} xs={12} alignContent={'center'}>
          <Typography
            sx={{
              color: 'white',
              fontSize: '20px',
              fontWeight: 600,
              textAlign: 'center',
              transform: isSliding ? 'translateY(100%)' : 'translateY(0)',
              transition: 'transform 0.5s ease-in-out',
              whiteSpace: 'nowrap',
              '& .highlight': {
                background: 'rgba(0, 0, 0, 0.3)',
                borderRadius: '4px',
                boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)'
              }
            }}
          >
            {services[currentWordIndex]}
          </Typography>
        </Grid>
        <Grid item md={3} xs={12} alignContent={'center'}>
          <Typography
            sx={{
              color: 'white',
              fontSize: '20px',
              fontWeight: 600,
              textAlign: { xs: 'center', md: 'left' },
              '& .highlight': {
                background: 'rgba(0, 0, 0, 0.3)',
                borderRadius: '4px',
                boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)'
              }
            }}
          >
            {`from`}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography
            sx={{
              color: 'white',
              fontSize: '40px',
              fontWeight: 600,
              textAlign: 'center',
              '& .highlight': {
                background: 'rgba(0, 0, 0, 0.3)',
                padding: '0 8px',
                borderRadius: '4px',
                boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)'
              }
            }}
          >
            Birmingham's Leading Property Agency
          </Typography>
        </Grid>
        <Grid item xs={11.5} md={11}>
          <SearchProperty />
        </Grid>
      </Grid>
      <DiscoverProperties />
      <About isHomePage={true} />

      {/* Issue when 1 or 2 properties are there */}
      <HomePropertiesSection title="Featured Properties" properties={properties} loading={loading} isFeatured />

      {/* Issue when 1 or 2 properties are there */}
      <HomePropertiesSection title="Explore Our Newest Listings" properties={properties} loading={loading} />

      <ServiceBox />
      <Stack alignItems={'center'}>
        <Grid
          container
          sx={{ paddingBottom: '40px', justifyContent: 'center', alignItems: 'center', cursor: 'default' }}
        >
          {logoImages.map((image, index) => (
            <Grid item key={index} sx={{ margin: 6 }}>
              <Box
                component="img"
                src={image}
                alt={`logo ${index + 1}`}
                sx={{ maxWidth: '180px', maxHeight: '150px' }}
              />
            </Grid>
          ))}
        </Grid>
        <Divider orientation="horizontal" variant="middle" component={'big'} />
      </Stack>
      <Footer />
    </>
  );
}
