import { Box, Button, Grid, Link, Tooltip, Typography } from '@mui/material';
import ReactPlayer from 'react-player';
import React, { useEffect, useState } from 'react';
import { createStructuredSelector } from 'reselect';
import * as Selectors from '../../selectors';
import { useSelector } from 'react-redux';
import { getEncodedQueryParams, localRedirect } from 'utils';
import parse from 'html-react-parser';
import { Icon } from 'components';
import target from '../../../../assets/images/target.png';
import StarIcon from '@mui/icons-material/Star';

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

const PropertyView = () => {
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

  const MapComponent = ({ mapLink }: { mapLink: string }) => {
    if (!mapLink) return null;
    const placeName = mapLink?.split('/place/')[1]?.split('/@')[0];
    const encodedPlaceName = encodeURIComponent(placeName);
    const embedUrl = `https://www.google.com/maps/embed/v1/place?key=${process.env.REACT_APP_MAP_API_KEY}&q=${encodedPlaceName}&maptype=satellite`;
    return (
      <iframe
        title="Location Map"
        width="100%"
        height="500"
        loading="lazy"
        frameBorder="0"
        style={{ border: 0 }}
        src={embedUrl}
        allowFullScreen
      />
    );
  };

  const featuresArray = [
    property?.furnishingType && `${property.furnishingType}`,
    property?.tenure ? `${property.tenure} months tenure` : null,
    property?.deposit ? `£ ${property.deposit} deposit` : null,
    property?.lettingType && `${property.lettingType}`,
    property?.contractLength ? `${property.contractLength} months contract` : null,
    property?.postcode ? `Post code ${property.postcode}` : null,
    property?.payable ? `${property.payable} Payable` : null,
    property?.area ? `${property.area} sq.ft` : null
  ].filter(Boolean);

  return (
    <Grid style={{ marginTop: '100px', position: 'relative' }} container md={12}>
      <Grid
        container
        sx={{
          marginBottom: '20px',
          width: '96vw',
          backgroundColor: 'white',
          margin: '2rem',
          borderRadius: '10px',
          padding: '2rem'
        }}
      >
        <Grid container justifyContent="space-between" alignItems="center">
          <Link
            href="/properties"
            sx={{ color: 'darkred', textDecoration: 'none', fontWeight: 700, fontSize: '18px', letterSpacing: '1.5px' }}
          >
            {`< Back to Search`}
          </Link>
          <Icon name="share" styles={{ height: '25px', width: '25px' }} />
        </Grid>

        <Grid
          item
          xs={12}
          width={{ xs: 20 }}
          mt={3}
          sx={{
            // paddingLeft: { sm: '10px', md: '40px', xl: '70px' },
            // paddingRight: { xl: '40px' },
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
                  borderRadius: '15px',
                  objectFit: 'cover'
                }}
                src={
                  property?.images?.length > 0
                    ? property?.images[slideIndex - 1]
                    : 'https://easyrental.rentalpro.site/easyrental/static/Resources/NoAvaliblePropertyImage.png'
                }
                alt={`Slide ${slideIndex}`}
              />
              <Grid
                style={{
                  position: 'absolute',
                  bottom: 0,
                  width: '65%',
                  height: '70px',
                  backgroundColor: 'black',
                  borderBottomLeftRadius: '15px',
                  zIndex: 999,
                  borderBottomRightRadius: '15px',
                  opacity: 0.7,
                  color: 'white',
                  padding: '10px'
                }}
              >
                <Grid container justifyContent="space-between" alignItems="center">
                  <Icon name="bathrooms" styles={{ height: '100px', width: '30px' }} />
                </Grid>
              </Grid>

              <Grid sx={{ marginLeft: '8px', marginBottom: '5px' }}>
                <img
                  style={{
                    width: '100%',
                    height: '50%',
                    maxWidth: '100%',
                    maxHeight: '50%',
                    borderRadius: '15px',
                    objectFit: 'cover'
                  }}
                  src={
                    property?.images?.length > 1
                      ? property?.images[1]
                      : 'https://easyrental.rentalpro.site/easyrental/static/Resources/NoAvaliblePropertyImage.png'
                  }
                  alt={`Slide ${slideIndex + 1}`}
                />
                <img
                  style={{
                    width: '100%',
                    height: '50%',
                    maxWidth: '100%',
                    maxHeight: '50%',
                    objectFit: 'cover',
                    borderRadius: '15px'
                  }}
                  src={
                    property?.images?.length > 2
                      ? property?.images[2]
                      : 'https://easyrental.rentalpro.site/easyrental/static/Resources/NoAvaliblePropertyImage.png'
                  }
                  alt={`Slide ${slideIndex + 2}`}
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
                  maxWidth: '100%',
                  borderRadius: '15px'
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
                  borderRadius: '20px',
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

        <Grid container justifyContent="space-between" alignItems="center" mt={5}>
          <Grid xs={12} md={7}>
            <Typography component="p" sx={{ fontSize: '24px', fontWeight: 600 }}>
              {property?.title}
            </Typography>
            <Typography mt={2}>
              <div>{parse(property?.description || '')}</div>
            </Typography>
          </Grid>
          <Grid xs={12} md={4} position="relative">
            <Grid
              sx={{
                border: '2px solid #e9e9e9',
                borderRadius: '10px',
                padding: '20px',
                height: '285px',
                position: 'relative'
              }}
            >
              <Box
                sx={{
                  position: 'absolute',
                  top: { xs: '1px', md: '10px' },
                  right: '0',
                  backgroundColor: '#FFD54F',
                  color: 'black',
                  fontWeight: 'bold',
                  fontSize: '14px',
                  padding: '5px 22px',
                  textTransform: 'uppercase',
                  // borderRadius: '4px',
                  clipPath: 'polygon(0% 0%, 10% 50%, 0% 100%, 100% 100%, 100% 0%)'
                }}
              >
                {property?.status}
              </Box>

              {/* Icons and details */}
              <Box display="flex" alignItems="center" gap={1} mt={4}>
                <Icon name="bedrooms" styles={{ height: '26px', width: '26px' }} />
                <Tooltip title="Bedrooms" enterDelay={100} leaveDelay={100}>
                  <Typography sx={{ fontWeight: 600, fontSize: '22px', cursor: 'pointer' }}>
                    {property?.bedroom}
                  </Typography>
                </Tooltip>
                <Icon name="bathrooms" styles={{ height: '24px', width: '24px', marginLeft: '20px' }} />
                <Tooltip title="Bathrooms" enterDelay={100} leaveDelay={100}>
                  <Typography sx={{ fontWeight: 600, fontSize: '22px', cursor: 'pointer' }}>
                    {property?.bathroom}
                  </Typography>
                </Tooltip>
                <Icon name="stairs" styles={{ height: '24px', width: '24px', marginLeft: '20px' }} />
                <Tooltip title="Floors" enterDelay={100} leaveDelay={100}>
                  <Typography sx={{ fontWeight: 600, fontSize: '22px', cursor: 'pointer' }}>
                    {property?.floor}
                  </Typography>
                </Tooltip>
              </Box>
              <Box display="flex" gap={1} mb={2} alignItems="center">
                <Icon name="location" styles={{ height: '22px', width: '22px', flexShrink: 0 }} />
                <Typography sx={{ fontSize: '18px', cursor: 'pointer', wordBreak: 'break-word', flex: 1 }}>
                  {property?.address}
                </Typography>
              </Box>
              <Typography
                mb={4}
                sx={{
                  fontSize: '34px',
                  fontWeight: 900,
                  letterSpacing: '2px',
                  WebkitTextStroke: '1px black',
                  color: 'black'
                }}
              >
                {`£ ${property.price || '-'}`}
              </Typography>
              <Button
                onClick={handleMakeEnquiry}
                sx={{
                  backgroundColor: '#cf1313',
                  padding: '10px',
                  fontWeight: 600,
                  color: 'white',
                  '&:hover': {
                    backgroundColor: '#cf1313',
                    transition: 'all 0.3s ease-in-out',
                    transform: 'scale(1.07)'
                  }
                }}
              >
                Make an Enquiry
              </Button>
            </Grid>
          </Grid>
          <Grid container xs={12} md={12} position="relative" mt={5}>
            <Grid
              container
              sx={{ border: '2px solid #e9e9e9', borderRadius: '10px', padding: '20px', position: 'relative' }}
            >
              <Grid item xs={12} md={3} display="flex" alignItems="center" justifyContent="center">
                <Box
                  sx={{
                    backgroundColor: '#9df3ff',
                    padding: '20px',
                    borderRadius: '10px',
                    display: 'flex',
                    alignItems: 'center'
                  }}
                >
                  <Box display="flex" alignItems="center" gap={2}>
                    <Box component="img" src={target} sx={{ maxWidth: '60px', height: '60px' }} />
                    <Box>
                      <Typography sx={{ fontWeight: 600, fontSize: '18px' }}>Key Highlights</Typography>
                      <Typography sx={{ fontSize: '16px' }}>of the property</Typography>
                    </Box>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} md={9} container spacing={2} alignItems="center">
                {featuresArray.map((feature, index) => (
                  <Grid item xs={12} sm={6} md={4} key={index}>
                    <Box
                      sx={{
                        padding: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        fontWeight: 600,
                        WebkitTextStroke: '1px black'
                      }}
                    >
                      <StarIcon fontSize="small" color="warning" />
                      <Typography>{feature}</Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
          <Grid container xs={12} md={12} mt={3}>
            <Grid md={6} xs={12} sx={{ padding: '10px', height: { xs: '350px', sm: '500px' } }}>
              {property.ytLink ? (
                <ReactPlayer url={property?.ytLink && property.ytLink} controls={true} width="100%" height="80%" />
              ) : (
                <img
                  style={{ width: '100%', height: '99%' }}
                  src="https://www.47pitches.com/contents/images/no-video.jpg"
                  alt="No video available"
                />
              )}
            </Grid>
            <Grid md={6} xs={12} sx={{ padding: '10px' }}>
              {property.mapLink && <MapComponent mapLink={property?.mapLink} />}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default PropertyView;
