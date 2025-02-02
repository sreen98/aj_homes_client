import {
  Button,
  Card,
  Chip,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography
} from '@mui/material';
import ReactPlayer from 'react-player';
import BathtubIcon from '@mui/icons-material/Bathtub';
import HouseSidingIcon from '@mui/icons-material/HouseSiding';
import React, { useEffect, useState } from 'react';
import { MeetingRoom } from '@mui/icons-material';
import { createStructuredSelector } from 'reselect';
import * as Selectors from '../../selectors';
import { useSelector } from 'react-redux';
import { getEncodedQueryParams, localRedirect } from 'utils';
import parse from 'html-react-parser';

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

const stateSelector = createStructuredSelector({
  loading: Selectors.makeSelectPropertiesLoading(),
  properties: Selectors.makeSelectPropertiesData(),
  property: Selectors.makeSelectPropertyData()
});

const ViewProperty = () => {
  const viewportSize = useViewportSize();
  const { property } = useSelector(stateSelector);
  const [slideIndex, setSlideIndex] = useState(1);

  const plusDivs = (n: number) => {
    setSlideIndex(prevIndex => {
      let newIndex = prevIndex + n;
      if (newIndex > property?.images?.length) {
        newIndex = 1;
      }
      if (newIndex < 1) {
        newIndex = property?.images?.length;
      }
      return newIndex;
    });
  };

  const handleMakeEnquiry = () => {
    const search = getEncodedQueryParams({ propertyId: property._id });
    localRedirect('/contact', { search });
  };

  const MapComponent = ({ mapLink }: any) => {
    const placeName = mapLink?.split('/place/')[1]?.split('/@')[0];
    const encodedPlaceName = encodeURIComponent(placeName);
    const embedUrl = `https://www.google.com/maps/embed/v1/place?key=${process.env.REACT_APP_MAP_API_KEY}&q=${encodedPlaceName}`;
    return (
      <iframe
        title="Location Map"
        width="100%"
        height="400"
        loading="lazy"
        frameBorder="0"
        style={{ border: 0 }}
        src={embedUrl}
        allowFullScreen
      />
    );
  };

  return (
    <div style={{ marginTop: '90px', position: 'relative' }}>
      <Grid container spacing={2} sx={{ marginBottom: '20px', width: '100vw', paddingLeft: '40px' }}>
        <Grid item xs={12} sm={12} md={8} lg={9} spacing={6}>
          <Typography sx={{ fontSize: '2.4rem', fontWeight: 600 }}>
            {property?.title || 'Title is not specified'}
            <Chip
              label={property.status || 'Available'}
              color="success"
              sx={{ color: 'white', marginLeft: '20px', fontWeight: 600 }}
            />
          </Typography>
          <Typography sx={{ fontSize: '1.4rem' }}>
            {`${property?.address ? property?.address : ''} ${property?.postcode ? property.postcode : ''}`}
          </Typography>
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          md={4}
          lg={3}
          gap={3}
          sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-evenly' }}
        >
          <Grid item xs={4} sm={4} md={4} lg={4} sx={{ display: 'flex' }}>
            <Typography
              sx={{
                fontSize: '1.4rem',
                fontWeight: 600,
                textAlign: 'center'
              }}
            >
              {`£${property.price || '-'}`}
            </Typography>
          </Grid>
          <Grid item xs={8} sm={8} md={8} lg={8} sx={{ display: 'flex' }}>
            <Button
              variant="outlined"
              style={{
                background: '#D03535',
                color: 'white',
                fontWeight: 500,
                padding: '4px',
                fontSize: '.9rem'
              }}
              onClick={handleMakeEnquiry}
            >
              Make an Enquiry
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Grid container>
        {/* Image Grid Item */}
        <Grid
          item
          xs={12}
          width={{ xs: 20 }}
          p={{ xs: 2 }}
          sx={{
            paddingLeft: { sm: '10px', md: '40px', xl: '70px' },
            paddingRight: { xl: '40px' },
            height: { xs: 300, sm: 350, md: 400, lg: 600, xl: 1100 }
          }}
          style={{ position: 'relative', width: '30%', overflow: 'hidden', objectFit: 'contain' }}
        >
          {property?.images?.length > 0 && viewportSize.width > 700 ? (
            <Grid sx={{ display: 'flex', maxHeight: { lg: '100%', md: '100%', sm: '100%' } }}>
              <img
                style={{
                  width: '65%',
                  maxHeight: '82%',
                  maxWidth: '65%',
                  minWidth: '65%',
                  objectFit: 'cover'
                }}
                src={
                  property?.images?.length > 0
                    ? property?.images[slideIndex - 1]
                    : 'https://easyrental.rentalpro.site/easyrental/static/Resources/NoAvaliblePropertyImage.png'
                }
                alt={`Slide ${slideIndex}`}
              />
              <Grid sx={{ marginLeft: '8px', marginBottom: '5px' }}>
                <img
                  style={{
                    width: '100%',
                    height: '50%',
                    maxWidth: '100%',
                    maxHeight: '50%',
                    objectFit: 'cover'
                  }}
                  src={
                    property?.images?.length > 1
                      ? property?.images[1]
                      : 'https://easyrental.rentalpro.site/easyrental/static/Resources/NoAvaliblePropertyImage.png'
                  }
                  alt={`Slide ${slideIndex + 1}`} // Assuming you want to use the second image
                />
                <img
                  style={{
                    width: '100%',
                    height: '50%',
                    maxWidth: '100%',
                    maxHeight: '50%',
                    objectFit: 'cover'
                  }}
                  src={
                    property?.images?.length > 2
                      ? property?.images[2]
                      : 'https://easyrental.rentalpro.site/easyrental/static/Resources/NoAvaliblePropertyImage.png'
                  }
                  alt={`Slide ${slideIndex + 2}`} // Assuming you want to use the third image
                />
              </Grid>
            </Grid>
          ) : property?.images?.length === 0 ? (
            <Grid sx={{ display: 'flex' }}>
              <img
                style={{
                  width: '100%',
                  height: '80vh',
                  objectFit: 'cover',
                  maxWidth: '100%'
                }}
                src={'https://easyrental.rentalpro.site/easyrental/static/Resources/NoAvaliblePropertyImage.png'}
                alt={`Slide ${slideIndex}`}
              />
            </Grid>
          ) : (
            <Grid sx={{ display: 'flex' }}>
              <img
                style={{
                  width: '100%',
                  height: '300px',
                  objectFit: 'fill',
                  // maxHeight: '20%',
                  maxWidth: '100%'
                }}
                src={
                  property?.images?.length > 0
                    ? property?.images[slideIndex - 1]
                    : 'https://easyrental.rentalpro.site/easyrental/static/Resources/NoAvaliblePropertyImage.png'
                }
                alt={`Slide ${slideIndex}`}
              />
            </Grid>
          )}

          {/* Button Grid Item */}
          {property?.images?.length > 1 && (
            <Grid
              container
              item
              justifyContent="space-between"
              alignItems="center"
              width={viewportSize.width > 700 ? '65%' : '100%'}
              xs={12}
              sx={{
                position: 'absolute',
                top: '50%',
                left: '0',
                right: '0',
                paddingLeft: { xs: '24px', md: '44px', lg: '90px' },
                paddingRight: '20px'
              }}
            >
              <Button
                className="w3-button w3-black"
                size="large"
                onClick={() => plusDivs(-1)}
                sx={{
                  backgroundColor: 'rgba(0, 0, 0, 0.5)',
                  color: '#fff',
                  borderRadius: '5px',
                  padding: '10px'
                }}
              >
                &#10094;
              </Button>
              <Button
                className="w3-button w3-black"
                onClick={() => plusDivs(1)}
                sx={{
                  backgroundColor: 'rgba(0, 0, 0, 0.5)',
                  color: '#fff',
                  borderRadius: '5px',
                  padding: '10px'
                }}
              >
                &#10095;
              </Button>
            </Grid>
          )}
        </Grid>
      </Grid>
      <Grid container sx={{ marginTop: '30px', padding: { xs: 4, sm: 6, md: 10, lg: 10 } }} spacing={5}>
        <Grid item xs={12} sm={12} md={7} lg={8}>
          <Card sx={{ height: 'auto', padding: '30px' }}>
            <Typography sx={{ fontSize: '1.5rem', fontWeight: 600 }}>Overview</Typography>
            <div>{parse(property?.description)}</div>
            <Divider color="black" />
            <Typography sx={{ fontSize: '1.5rem', fontWeight: 600, marginTop: '2rem' }}>
              More About the Property
            </Typography>
            <Grid container sx={{ marginTop: '2rem' }}>
              <Grid xs={12} md={6}>
                <Typography sx={{ marginTop: '1rem', marginBottom: '1.5rem', paddingLeft: { lg: '3rem' } }}>
                  Price : <span style={{ fontWeight: 700 }}>£ {property.price}</span>
                </Typography>
                <Typography sx={{ marginTop: '1rem', marginBottom: '1.5rem', paddingLeft: { lg: '3rem' } }}>
                  Furnishment : <span style={{ fontWeight: 700 }}>{property.furnishingType}</span>
                </Typography>
              </Grid>
              <Grid xs={12} md={6}>
                <Typography sx={{ marginTop: '1rem', marginBottom: '1.5rem' }}>
                  Status : <span style={{ fontWeight: 700 }}>Available</span>
                </Typography>
                <Typography sx={{ marginTop: '1rem', marginBottom: '1.5rem' }}>
                  Total Area : <span style={{ fontWeight: 700 }}>{property.area} sq.ft</span>
                </Typography>
              </Grid>
              <Grid xs={12} md={6}>
                <Typography sx={{ marginTop: '1rem', marginBottom: '1.5rem', paddingLeft: { lg: '3rem' } }}>
                  Tenure : <span style={{ fontWeight: 700 }}> {property.tenure || '-'}</span>
                </Typography>
                <Typography sx={{ marginTop: '1rem', marginBottom: '1.5rem', paddingLeft: { lg: '3rem' } }}>
                  Payable : <span style={{ fontWeight: 700 }}> {property.payable || '-'}</span>
                </Typography>
              </Grid>
              <Grid xs={12} md={6}>
                <Typography sx={{ marginTop: '1rem', marginBottom: '1.5rem' }}>
                  Minimum Term : <span style={{ fontWeight: 700 }}>{property.minTerm || '-'}</span>
                </Typography>
                <Typography sx={{ marginTop: '1rem', marginBottom: '1.5rem' }}>
                  Letting type : <span style={{ fontWeight: 700 }}>{property.lettingType || '-'}</span>
                </Typography>
              </Grid>
              <Grid xs={12} md={6}>
                <Typography sx={{ marginTop: '1rem', marginBottom: '1.5rem', paddingLeft: { lg: '3rem' } }}>
                  Contract Length : <span style={{ fontWeight: 700 }}> {property.contractLength || '-'}</span>
                </Typography>
                <Typography sx={{ marginTop: '1rem', marginBottom: '1.5rem', paddingLeft: { lg: '3rem' } }}>
                  Deposit : <span style={{ fontWeight: 700 }}>£ {property.deposit || '-'}</span>
                </Typography>
              </Grid>
              <Grid xs={12} md={6}>
                <Typography sx={{ marginTop: '1rem', marginBottom: '1.5rem' }}>
                  Post code : <span style={{ fontWeight: 700 }}> {property.postcode || '-'}</span>
                </Typography>
                <Typography sx={{ marginTop: '1rem', marginBottom: '1.5rem' }}>
                  Reference : <span style={{ fontWeight: 700 }}> {property.reference || '-'}</span>
                </Typography>
              </Grid>
            </Grid>
          </Card>
        </Grid>
        <Grid item xs={12} md={5} lg={4}>
          <Card sx={{ padding: '30px', marginBottom: '30px' }}>
            <Typography sx={{ fontSize: '1.5rem', fontWeight: 600 }}>Property Details</Typography>
            <Typography sx={{ marginTop: '1rem', marginBottom: '1.5rem' }}>
              <List>
                <ListItem>
                  <ListItemButton>
                    <ListItemIcon>
                      <MeetingRoom />
                    </ListItemIcon>
                    <ListItemText primary={`${property.bedroom} Bedroom`} />
                  </ListItemButton>
                </ListItem>
                <ListItem>
                  <ListItemButton>
                    <ListItemIcon>
                      <BathtubIcon />
                    </ListItemIcon>
                    <ListItemText primary={`${property.bathroom} Bathroom`} />
                  </ListItemButton>
                </ListItem>
                <ListItem>
                  <ListItemButton>
                    <ListItemIcon>
                      <HouseSidingIcon />
                    </ListItemIcon>
                    <ListItemText primary={`${property.floor} Floors`} />
                  </ListItemButton>
                </ListItem>
              </List>
            </Typography>
          </Card>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6} sx={{ width: '100vw', marginTop: '10px' }}>
          <Card sx={{ height: { xs: 400, md: 600 }, padding: '30px' }}>
            <Typography sx={{ fontSize: '1.5rem', fontWeight: 600 }}>Property Videos</Typography>
            <Divider color="black" style={{ marginBottom: '2rem', marginTop: '2rem' }} />
            {property.ytLink ? (
              <ReactPlayer url={property?.ytLink && property.ytLink} controls={true} width="100%" height="80%" />
            ) : (
              <img
                style={{ width: '100%', height: '80%' }}
                src="https://www.47pitches.com/contents/images/no-video.jpg"
                alt="No video available"
              />
            )}
          </Card>
        </Grid>
        {property.mapLink && (
          <Grid item xs={12} md={6} sx={{ width: '100vw', marginTop: '10px' }}>
            <Card sx={{ height: { xs: 400, md: 600 }, padding: '30px' }}>
              <Typography sx={{ fontSize: '1.5rem', fontWeight: 600 }}>Property Location</Typography>
              <Divider color="black" style={{ marginBottom: '2rem', marginTop: '2rem' }} />
              <MapComponent mapLink={property?.mapLink} />
            </Card>
          </Grid>
        )}
      </Grid>
    </div>
  );
};

export default ViewProperty;

{
  /* <List sx={{ marginTop: '20px' }}> */
}
{
  /* //   <ListItem>
            //     <ListItemButton>
            //       <ListItemIcon>
            //         <Directions />
            //       </ListItemIcon>
            //       <ListItemText primary="Know property location" />
            //     </ListItemButton>
            //   </ListItem>
            // </List> */
}
