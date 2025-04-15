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
import { getEncodedQueryParams, localRedirect } from 'utils';
import { isEmpty } from 'lodash';

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

      // Cleanup the event listener on component unmount
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []); // Empty dependency array ensures that the effect runs only once, similar to componentDidMount

    return viewportSize;
  };

  const logoImages = [lg3, lg1, lg2, lg4, lg5];

  const services = ['Lettings', 'Sales', 'Property Management'];
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isSliding, setIsSliding] = useState(false);
  const viewportSize = useViewportSize();

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

  const handleSearchClick = (searchValues: any) => {
    const search = getEncodedQueryParams({
      bedrooms: searchValues.bedrooms,
      bathrooms: searchValues.bathrooms,
      priceFrom: searchValues.price?.from,
      priceTo: searchValues.price?.to,
      category: searchValues?.category
    });
    if (!isEmpty(searchValues)) localRedirect(`/properties`, { search });
  };
  return (
    <>
      <NavBar />
      <Grid
        sx={{
          paddingTop: { xs: 5 },
          backgroundImage: `url(${sl3})`,
          justifyContent: 'center',
          height: viewportSize.width > 780 ? '60vh' : '80vh',
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
        <Grid container justifyContent="center" alignItems="center" alignContent="center" textAlign="center">
          <Grid item xs={12}>
            <Typography
              sx={{
                color: 'white',
                fontSize: viewportSize.width > 500 ? '20px' : '15px',
                fontWeight: 600,
                whiteSpace: 'nowrap',
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                gap: '5px'
              }}
            >
              Get expert assistance with&nbsp;
              <span
                style={{
                  transform: isSliding ? 'translateY(100%)' : 'translateY(0)',
                  transition: 'transform 0.5s ease-in-out',
                  whiteSpace: 'nowrap'
                }}
              >
                {services[currentWordIndex]}
              </span>
              &nbsp;from
            </Typography>
          </Grid>

          <Grid item xs={12} sx={{ mt: 1 }}>
            <Typography
              sx={{
                color: 'white',
                fontSize: viewportSize.width > 500 ? '38px' : '30px',
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
        </Grid>

        <Grid item xs={10} md={10} lg={10} mt={viewportSize.width > 780 ? 1 : 3}>
          <SearchProperty onClickSearch={handleSearchClick} />
        </Grid>
      </Grid>
      <DiscoverProperties />
      <About isHomePage={true} />
      <HomePropertiesSection title="Featured Properties" properties={properties} loading={loading} isFeatured />
      <HomePropertiesSection title="Explore Our Newest Listings" properties={properties} loading={loading} />
      <ServiceBox viewportSize />
      <Grid
        sx={{
          justifyContent: 'space-between',
          alignItems: 'center',
          cursor: 'default',
          padding: '0 100px 40px 100px'
        }}
        container
        marginTop={10}
      >
        {logoImages.map((image, index) => (
          <Grid item key={index} xs={5} md={2} sx={{ display: 'flex', justifyContent: 'center' }}>
            <Box component="img" src={image} alt={`logo ${index + 1}`} sx={{ maxWidth: '180px', maxHeight: '150px' }} />
          </Grid>
        ))}
      </Grid>
      <Divider orientation="horizontal" variant="middle" component={'big'} />
      <Footer />
    </>
  );
}
