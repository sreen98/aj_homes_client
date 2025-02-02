import * as React from 'react';
import { Card, CardContent, Grid } from '@mui/material';

import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { IProperty } from 'types';
import { getEncodedQueryParams, localRedirect } from 'utils';
import parse from 'html-react-parser';

const PropertyCard = ({ isHomePage = false, properties }: { isHomePage?: boolean; properties: IProperty[] }) => {
  const [state, setState] = React.useState({ page: 1 });
  const showViewMore = properties.length > 9 && state.page * 9 < properties.length;

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
      {properties.length > 0 ? (
        <>
          {(isHomePage ? properties?.slice(0, 3) : properties?.slice(0, state.page * 9)).map((item, index) => {
            return (
              <Grid item xs={12} sm={4} md={4} key={index}>
                <Card onClick={() => handleClick(item)} sx={{ border: 'blue', borderColor: 'black' }}>
                  <CardMedia
                    sx={{ height: 300 }}
                    image={
                      item.images.length > 0
                        ? item?.images[0]
                        : 'https://easyrental.rentalpro.site/easyrental/static/Resources/NoAvaliblePropertyImage.png'
                    }
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {item.title}
                    </Typography>
                    <div
                      style={{
                        fontVariant: 'body2',
                        color: '#555',
                        height: '30px',
                        overflow: 'hidden',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical'
                      }}
                    >
                      {parse(`${item?.address || ''}`)}
                    </div>
                    <div
                      style={{
                        fontVariant: 'body2',
                        height: '30px',
                        color: '#555',
                        fontSize: '20px',
                        fontWeight: 'bold',
                        overflow: 'hidden',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical'
                      }}
                    >
                      {parse(`£${item?.price}`)}
                    </div>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
          <Grid container justifyContent="center" marginTop={5} marginBottom={3}>
            {showViewMore && (
              <Typography
                onClick={handleViewMore}
                sx={{ textDecoration: 'underline', cursor: 'pointer', color: 'red' }}
              >
                {'view more >>>'}
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

export default PropertyCard;
