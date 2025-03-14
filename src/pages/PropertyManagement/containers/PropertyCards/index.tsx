import * as React from 'react';
import { Box, Card, CardContent, Chip, Grid } from '@mui/material';

import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { getEncodedQueryParams, localRedirect } from 'utils';
import parse from 'html-react-parser';
import { Icon } from 'components';

const PropertyCards = ({ isHomePage = false, properties }: { isHomePage?: boolean; properties: any }) => {
  const [state, setState] = React.useState({ page: 1 });
  const showViewMore = properties?.length > 9 && state.page * 9 < properties?.length;

  const handleViewMore = () => {
    setState(prev => ({
      page: prev.page + 1
    }));
  };
  const handleClick = (item: any) => {
    const search = getEncodedQueryParams({ propertyId: item._id });
    localRedirect(`/property`, { search });
  };
  return (
    <>
      {properties?.length > 0 ? (
        <>
          {(isHomePage ? properties?.slice(0, 3) : properties?.slice(0, state.page * 9)).map(
            (
              item: {
                images: string | any[];
                title:
                  | string
                  | number
                  | boolean
                  | React.ReactElement<any, string | React.JSXElementConstructor<any>>
                  | Iterable<React.ReactNode>
                  | React.ReactPortal
                  | null
                  | undefined;
                address: any;
                price: any;
                priceDesc: any;
                bathroom: any;
                floor: any;
                bedroom: any;
              },
              index: React.Key | null | undefined
            ) => {
              return (
                <Grid item xs={12} sm={6} md={4}>
                  <Card
                    onClick={() => handleClick(item)}
                    sx={{
                      borderRadius: 0,
                      boxShadow: 3,
                      cursor: 'pointer',
                      position: 'relative',
                      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                      '&:hover': {
                        transform: 'scale(1.03)',
                        boxShadow: 6
                      }
                    }}
                  >
                    <Box sx={{ position: 'relative' }}>
                      <CardMedia
                        sx={{ height: 250 }}
                        image={
                          item.images.length > 0
                            ? item?.images[0]
                            : 'https://easyrental.rentalpro.site/easyrental/static/Resources/NoAvaliblePropertyImage.png'
                        }
                      />

                      <Chip
                        label="AVAILABLE"
                        sx={{
                          position: 'absolute',
                          bottom: 8,
                          right: 8,
                          backgroundColor: '#FFD700',
                          fontWeight: 'bold',
                          fontSize: '12px',
                          borderRadius: 0
                        }}
                      />
                    </Box>

                    <CardContent>
                      <Box display="flex" alignItems="center" gap={1} mb={2}>
                        <Icon name="bedrooms" styles={{ height: '22px', width: '22px' }} />
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                          {item.bedroom}
                        </Typography>
                        <Icon name="bathrooms" styles={{ height: '20px', width: '20px', marginLeft: '10px   ' }} />
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                          {item.bathroom}
                        </Typography>
                        <Icon name="stairs" styles={{ height: '20px', width: '20px', marginLeft: '10px' }} />
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                          {item.floor}
                        </Typography>
                      </Box>

                      <Typography
                        sx={{
                          color: '#555',
                          fontWeight: '500',
                          fontSize: '15px',
                          overflow: 'hidden',
                          whiteSpace: 'nowrap',
                          textOverflow: 'ellipsis',
                          display: 'block'
                        }}
                      >
                        {item.title}
                      </Typography>

                      <Typography
                        sx={{
                          fontWeight: '600',
                          mt: 1,
                          mb: 1,
                          letterSpacing: '1.5px',
                          fontSize: '24px',
                          WebkitTextStroke: '1px #555'
                        }}
                      >
                        £ {item?.price} {item?.priceDesc ? item.priceDesc : null}
                      </Typography>

                      <Typography
                        variant="body2"
                        sx={{
                          color: '#555',
                          height: '30px',
                          overflow: 'hidden',
                          fontWeight: 500,
                          whiteSpace: 'nowrap',
                          textOverflow: 'ellipsis'
                        }}
                      >
                        {parse(`${item?.address || ''}`)}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              );
            }
          )}
          <Grid container justifyContent="center" marginTop={5} marginBottom={3}>
            {showViewMore && (
              <Typography
                onClick={handleViewMore}
                sx={{ textDecoration: 'underline', cursor: 'pointer', color: 'red' }}
              >
                {'View more >>>'}
              </Typography>
            )}
          </Grid>
        </>
      ) : (
        <Grid container justifyContent="center" marginTop={5} sx={{ padding: { xs: 2, md: 5 } }}>
          <CardMedia
            sx={{ height: { sm: 300, xs: 200 }, width: { sm: 475, xs: 700 }, paddingLeft: 10 }}
            image="https://wowbrohousing.com/assets/images/no-property-data.svg"
          />
        </Grid>
      )}
    </>
  );
};

export default PropertyCards;
