import { Box, Button, Grid, IconButton, Link, Menu, MenuItem, Modal, Tooltip, Typography } from '@mui/material';
import ReactPlayer from 'react-player';
import React, { useEffect, useState } from 'react';
import { createStructuredSelector } from 'reselect';
import * as Selectors from '../../selectors';
import { useSelector } from 'react-redux';
import { getEncodedQueryParams, localRedirect } from 'utils';
import parse from 'html-react-parser';
import { Icon, LoadingIndicator } from 'components';
import target from '../../../../assets/images/target.png';
import StarIcon from '@mui/icons-material/Star';
import moment from 'moment';
import { ContentCopy, Email, Facebook, Instagram, WhatsApp } from '@mui/icons-material';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ImageIcon from '@mui/icons-material/Image';
import CloseIcon from '@mui/icons-material/Close';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

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
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [state, setState] = useState({
    imageModal: false
  });
  const [loading, setLoading] = useState(true);
  const handleImageLoad = () => {
    setLoading(false);
  };
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleFullScreen = () => {
    setState({ imageModal: true });
  };

  const closeImageModal = () => {
    setState({ imageModal: false });
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    handleClose();
  };

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
    setLoading(true);
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
        height="360px"
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
    property?.tenure ? `${property.tenure} Months Tenure` : null,
    property?.deposit ? `£ ${property.deposit} Deposit` : null,
    property?.lettingType && `${property.lettingType}`,
    property?.contractLength ? `${property.contractLength} Months Contract` : null,
    property?.postcode ? `Post Code ${property.postcode}` : null,
    property?.payable ? `${property.payable} Payable` : null,
    property?.area ? `${property.area} sq.ft` : null,
    property?.moveInDate ? `Move-in Date: ${moment(property.moveInDate).format('DD-MM-YYYY')}` : null,
    property?.reference ? `${property.reference}` : null
  ].filter(Boolean);

  return (
    <>
      {loading && <LoadingIndicator visible={loading} />}
      <Grid
        onClick={() => {
          window.open('https://wa.me/message/ZU2QD6XT7TCRM1');
          window.location.href = 'https://wa.me/message/ZU2QD6XT7TCRM1';
        }}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '25px',
          backgroundColor: '#25D366',
          color: 'white',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)',
          zIndex: 1000
        }}
      >
        <WhatsAppIcon style={{ fontSize: 30 }} />
      </Grid>
      <Grid style={{ marginTop: '100px', position: 'relative' }} container md={12}>
        <Grid
          container
          sx={{
            marginBottom: '20px',
            width: viewportSize.width > 500 ? '96vw' : '100vw',
            backgroundColor: 'white',
            margin: viewportSize.width > 600 ? '2rem' : '0rem',
            borderRadius: '10px',
            padding: viewportSize.width > 600 ? '2rem' : '0.7rem'
          }}
        >
          <Grid container justifyContent="space-between" alignItems="center">
            <Link
              href="/properties"
              sx={{
                color: 'darkred',
                textDecoration: 'none',
                fontWeight: 700,
                fontSize: '18px',
                letterSpacing: '1.5px'
              }}
            >
              {`< Back to Search`}
            </Link>
            <Icon onClick={handleClick} name="share" styles={{ height: '25px', width: '25px', cursor: 'pointer' }} />

            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              sx={{ mt: 1 }}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right'
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
              PaperProps={{
                sx: {
                  minWidth: 200,
                  maxWidth: 300,
                  p: 1
                }
              }}
            >
              <MenuItem onClick={handleCopyLink}>
                <ContentCopy sx={{ mr: 1 }} />
                <Typography sx={{ fontSize: '15px', fontWeight: 600 }}>Copy Link</Typography>
              </MenuItem>
              <MenuItem
                onClick={handleClose}
                component="a"
                href={`https://wa.me/?text=${window.location.href}`}
                target="_blank"
              >
                <WhatsApp color="success" sx={{ mr: 1 }} />
                <Typography sx={{ fontSize: '15px', fontWeight: 600 }}>WhatsApp</Typography>
              </MenuItem>
              <MenuItem onClick={handleClose} component="a" href={`https://www.instagram.com`} target="_blank">
                <Instagram color="secondary" sx={{ mr: 1 }} />
                <Typography sx={{ fontSize: '15px', fontWeight: 600 }}>Instagram</Typography>
              </MenuItem>
              <MenuItem
                onClick={handleClose}
                component="a"
                href={`mailto:?subject=Check this out&body=${window.location.href}`}
              >
                <Email color="error" sx={{ mr: 1 }} />
                <Typography sx={{ fontSize: '15px', fontWeight: 600 }}>Email</Typography>
              </MenuItem>
              <MenuItem
                onClick={handleClose}
                component="a"
                href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`}
                target="_blank"
              >
                <Facebook color="primary" sx={{ mr: 1 }} />
                <Typography sx={{ fontSize: '15px', fontWeight: 600 }}>Facebook</Typography>
              </MenuItem>
            </Menu>
          </Grid>

          <Grid
            item
            xs={12}
            width={{ xs: 20 }}
            mt={3}
            style={{ position: 'relative', width: '30%', overflow: 'hidden', objectFit: 'cover' }}
            sx={{
              height: {
                xs: 300,
                sm: property?.images?.length === 1 ? '100vh' : 350,
                md: property?.images?.length === 1 ? '100vh' : 400,
                lg: property?.images?.length === 1 ? '100vh' : 550,
                xl: property?.images?.length === 1 ? '100vh' : 600
              }
            }}
          >
            {property?.images?.length > 1 && viewportSize.width > 700 && (
              <Grid
                sx={{
                  display: 'flex',
                  maxHeight: { lg: '100%', md: '100%', sm: '100%' }
                }}
              >
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
                  onLoad={handleImageLoad}
                />
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
                        ? property?.images[slideIndex % property.images.length]
                        : 'https://easyrental.rentalpro.site/easyrental/static/Resources/NoAvaliblePropertyImage.png'
                    }
                    alt={`Slide ${slideIndex + 1}`}
                    onLoad={handleImageLoad}
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
                        ? property?.images[(slideIndex + 1) % property.images.length]
                        : 'https://easyrental.rentalpro.site/easyrental/static/Resources/NoAvaliblePropertyImage.png'
                    }
                    alt={`Slide ${slideIndex + 2}`}
                    onLoad={handleImageLoad}
                  />
                </Grid>
              </Grid>
            )}
            {property?.images?.length === 0 && (
              <Grid sx={{ display: 'flex', width: '100%', justifyContent: 'center' }}>
                <img
                  style={{
                    width: '100%',
                    height: viewportSize.width < 700 ? '50vh' : '80vh',
                    maxHeight: '80vh',
                    objectFit: 'cover',
                    borderRadius: '15px'
                  }}
                  src={'https://easyrental.rentalpro.site/easyrental/static/Resources/NoAvaliblePropertyImage.png'}
                  alt="No Available Image"
                  onLoad={handleImageLoad}
                />
              </Grid>
            )}

            {property?.images?.length === 1 && viewportSize.width > 700 && (
              <Grid container>
                <Grid item xs={12}>
                  <img
                    style={{
                      width: '100%',
                      objectFit: 'cover',
                      borderRadius: '20px',
                      maxWidth: '100%'
                    }}
                    src={property?.images?.[0]}
                    alt={`Slide ${slideIndex}`}
                    onLoad={handleImageLoad}
                  />
                </Grid>
              </Grid>
            )}
            {viewportSize.width < 700 && (
              <Grid container sx={{ display: 'flex' }}>
                <Grid item xs={12}>
                  <img
                    style={{
                      width: '100%',
                      height: 'auto',
                      maxHeight: '400px',
                      objectFit: 'cover',
                      borderRadius: '20px',
                      maxWidth: '100%'
                    }}
                    onClick={() => handleFullScreen()}
                    src={
                      property?.images?.length > 0
                        ? property?.images[slideIndex - 1]
                        : 'https://easyrental.rentalpro.site/easyrental/static/Resources/NoAvaliblePropertyImage.png'
                    }
                    alt={`Slide ${slideIndex}`}
                    onLoad={handleImageLoad}
                  />
                </Grid>
                {property?.images?.length > 1 && (
                  <Grid item xs={12}>
                    {/* Image Counter */}
                    <Typography
                      sx={{
                        position: 'absolute',
                        bottom: 10,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        background: 'rgba(0,0,0,0.5)',
                        color: 'white',
                        padding: '5px 10px',
                        borderRadius: '5px'
                      }}
                    >
                      {slideIndex} / {property?.images?.length}
                    </Typography>
                    {/* Navigation Buttons */}
                    <IconButton
                      onClick={() => plusDivs(-1)}
                      sx={{
                        position: 'absolute',
                        top: '50%',
                        left: 10,
                        color: 'white',
                        background: 'rgba(0,0,0,0.5)'
                      }}
                    >
                      <ArrowLeftIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => plusDivs(1)}
                      sx={{
                        position: 'absolute',
                        top: '50%',
                        right: 10,
                        color: 'white',
                        background: 'rgba(0,0,0,0.5)'
                      }}
                    >
                      <ArrowRightIcon />
                    </IconButton>
                  </Grid>
                )}
              </Grid>
            )}
          </Grid>
          {viewportSize.width > 700 && (
            <Grid
              mt={1}
              style={{
                width: '100%',
                backgroundColor: 'black',
                borderBottomLeftRadius: '15px',
                borderBottomRightRadius: '15px',
                zIndex: 999,
                opacity: 0.8,
                color: 'white',
                padding: '2px'
              }}
            >
              <Grid container justifyContent="space-between" alignItems="center" sx={{ padding: '0 10px' }}>
                <Grid item md={2} sm={3}>
                  <FullscreenIcon sx={{ fontSize: 48, color: 'white' }} onClick={() => handleFullScreen()} />
                </Grid>

                <Grid md={2} sm={3} justifyContent="right">
                  <ArrowLeftIcon sx={{ fontSize: 60, color: 'white' }} onClick={() => plusDivs(-1)} />
                  <ArrowRightIcon sx={{ fontSize: 60, color: 'white' }} onClick={() => plusDivs(1)} />
                </Grid>

                <Grid
                  item
                  sx={{ display: 'flex', alignItems: 'center', justifyContent: 'right', gap: '10px' }}
                  sm={6}
                  md={2}
                  lg={2}
                >
                  <Box
                    sx={{
                      backgroundColor: 'darkred',
                      color: 'white',
                      fontWeight: 600,
                      padding: '8px 12px',
                      borderRadius: '10px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}
                  >
                    <ImageIcon sx={{ fontSize: 30, color: 'white' }} />
                    <Typography variant="body2" sx={{ fontSize: { md: '18', lg: '16' }, fontWeight: 'bold' }}>
                      {slideIndex} / {property?.images?.length}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          )}

          <Grid container justifyContent="space-between" mt={5}>
            <Grid xs={12} md={7} order={{ md: 1, sm: 2, xs: 2 }}>
              <Typography component="p" sx={{ fontSize: '24px', fontWeight: 600 }}>
                {property?.title}
              </Typography>
              <Typography mt={2} sx={{ fontSize: viewportSize.width < 500 ? '16px' : '18px', textAlign: 'justify' }}>
                <div>{parse(property?.description || '')}</div>
              </Typography>
            </Grid>
            <Grid xs={12} md={4} position="relative" order={{ md: 2, sm: 1, xs: 1 }} mb={3}>
              <Grid
                sx={{
                  border: '2px solid #e9e9e9',
                  borderRadius: '10px',
                  padding: '20px',
                  minHeight: '285px',
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
                    fontSize: '12px',
                    padding: '5px 30px 5px 35px',
                    textTransform: 'uppercase',
                    clipPath: 'polygon(0% 0%, 10% 50%, 0% 100%, 100% 100%, 100% 0%)'
                  }}
                >
                  {property?.status}
                </Box>

                <Box display="flex" alignItems="center" gap={1} mt={6}>
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
                <Box display="flex" gap={1} mb={2} alignItems="center" mt={3}>
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
                  {`£ ${property.price || '-'} ${property.priceDesc || ''}`}
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
            <Grid container xs={12} md={12} position="relative" mt={5} order={{ md: 3, sm: 3, xs: 3 }}>
              <Grid
                container
                sx={{ border: '2px solid #e9e9e9', borderRadius: '10px', padding: '20px', position: 'relative' }}
              >
                <Grid item xs={12} md={3} display="flex" alignItems="center" justifyContent="center" mb={1}>
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
                <Grid item xs={12} md={9} container spacing={2} alignItems="center" sx={{ flexWrap: 'wrap' }}>
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
            <Grid container xs={12} md={12} mt={3} order={{ md: 4, sm: 4, xs: 4 }}>
              <Grid md={6} xs={12} sx={{ padding: '10px', height: { xs: '350px', sm: '500px' } }}>
                {property.ytLink ? (
                  <ReactPlayer url={property?.ytLink && property.ytLink} controls={true} width="100%" />
                ) : (
                  <img
                    style={{ width: '100%', height: '360px' }}
                    src="https://www.47pitches.com/contents/images/no-video.jpg"
                    alt="No video available"
                  />
                )}
              </Grid>
              <Grid md={6} xs={12} sx={{ padding: '10px', marginTop: viewportSize.width < 600 ? '20px' : '0px' }}>
                {property.mapLink && <MapComponent mapLink={property?.mapLink} />}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        {state.imageModal && (
          <Modal open={state.imageModal} onClose={closeImageModal}>
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                backgroundColor: 'white',
                padding: 2,
                borderRadius: '10px',
                boxShadow: 24,
                width: '100%',
                maxWidth: '1200px',
                outline: 'none',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px'
              }}
            >
              <IconButton
                onClick={closeImageModal}
                sx={{
                  position: 'absolute',
                  top: 10,
                  right: 10,
                  backgroundColor: 'rgba(0,0,0,0.5)',
                  color: 'white',
                  '&:hover': { backgroundColor: 'rgba(0,0,0,0.8)' }
                }}
              >
                <CloseIcon />
              </IconButton>

              <img
                src={property?.images[slideIndex - 1]}
                alt="Property Image"
                style={{
                  maxWidth: '100%',
                  maxHeight: '900px',
                  borderRadius: '10px',
                  objectFit: 'contain'
                }}
                onLoad={handleImageLoad}
              />
            </Box>
          </Modal>
        )}
      </Grid>
    </>
  );
};

export default PropertyView;
