import * as React from 'react';
import { Button, CardMedia, Grid, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { getSiteStatus } from 'pages/AppManagement/slice';
import { useDispatch } from 'react-redux';

export default function Testimonial({ isHomePage = false }: { isHomePage?: boolean }) {
  const [slideIndex, setSlideIndex] = useState(1);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSiteStatus());
  });

  const plusDivs = (n: number) => {
    setSlideIndex(prevIndex => {
      let newIndex = prevIndex + n;
      if (newIndex > testimonialsDetails.length) {
        newIndex = 1;
      }
      if (newIndex < 1) {
        newIndex = testimonialsDetails.length;
      }
      return newIndex;
    });
  };
  const testimonialsDetails = [
    {
      src: 'https://sources.roboflow.com/dzuGOec8v6bRLhxo590fQ69a22N2/cNc6Q78185vhZDZhqEdS/original.jpg',
      profile: 'Tom',
      place: 'Birmingham 2019-21',
      description:
        'They will redefine the letting experience with a fresh perspective and a commitment to bridging the gap in the market.'
    },
    {
      src: 'https://img.freepik.com/free-photo/portrait-dark-skinned-cheerful-woman-with-curly-hair-touches-chin-gently-laughs-happily-enjoys-day-off-feels-happy-enthusiastic-hears-something-positive-wears-casual-blue-turtleneck_273609-43443.jpg',
      profile: 'Alice',
      place: 'Birmingham 2019-21',
      description:
        'At AJ Homes & Lettings, they are not just a letting agency, they are partners in creating a hassle-free and rewarding property experience. Welcome to a new era of letting.'
    },
    {
      src: 'https://media.istockphoto.com/id/1448608347/photo/young-man-holding-ipad-while-waiting-for-someone-on-a-bus-station.webp?b=1&s=170667a&w=0&k=20&c=2yO8rjbOVKKQCPAblXcBIEAzTWpEwU6nMv0LJe5XNnM=',
      profile: 'Bob',
      place: 'Birmingham 2019-21',
      description:
        'They will redefine the letting experience with a fresh perspective and a commitment to bridging the gap in the market.'
    },
    {
      src: 'https://media.istockphoto.com/id/491665687/photo/happy-middle-aged-male-using-latest-technology.jpg?s=170667a&w=0&k=20&c=jet8ZHlZkh2rMDvIFJQ6BxRTweQAIVi5U7J5WRbtuu0=',
      profile: 'Eva',
      place: 'Birmingham 2019-21',
      description:
        'At AJ Homes & Lettings, they are not just a letting agency, they are partners in creating a hassle-free and rewarding property experience. Welcome to a new era of letting.'
    }
  ];
  return (
    <>
      {!isHomePage && (
        <Grid sx={{ paddingTop: { xs: 5 } }}>
          <div style={{ position: 'relative', maxHeight: '380px' }}>
            <CardMedia
              component="img"
              image="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Image Alt Text"
              height="380px"
              sx={{
                maxHeight: { xs: 240, md: 380 }
              }}
            />
            <Typography
              variant="h1"
              style={{
                position: 'absolute',
                top: '57%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                color: 'white'
              }}
            >
              Testimonials
            </Typography>
          </div>
        </Grid>
      )}
      <Grid
        container
        spacing={{ xs: 2, md: 3, lg: 4 }}
        p={{ xs: 2, md: 3, lg: 7 }}
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs={12} container justifyContent="center" alignItems="center">
          <Stack spacing={2} alignItems="center">
            <div className="w3-content w3-display-container" style={{ textAlign: 'center' }}>
              {testimonialsDetails.map((img, index) => (
                <div key={index} style={{ display: index + 1 === slideIndex ? 'block' : 'none' }}>
                  <Grid container justifyContent="center">
                    <CardMedia
                      component="img"
                      height="120px"
                      image={img.src}
                      alt={`Slide ${index + 1}`}
                      style={{ borderRadius: '10%', maxWidth: '200px' }}
                    />
                  </Grid>
                  <Typography style={{ maxWidth: '400px', marginTop: '10px', textAlign: 'center' }} fontWeight={600}>
                    {img.profile}
                  </Typography>
                  <Typography style={{ maxWidth: '400px', textAlign: 'center' }} fontSize={15}>
                    {img.place}
                  </Typography>
                  <Typography
                    style={{ maxWidth: '400px', height: '100px', textAlign: 'center', paddingTop: '10px' }}
                    fontSize={16}
                  >
                    {img.description}
                  </Typography>
                </div>
              ))}
            </div>
            <Grid paddingTop={10}>
              <Button color="inherit" className="w3-button w3-black w3-display-left" onClick={() => plusDivs(-1)}>
                &#10094;
              </Button>
              <Button color="inherit" className="w3-button w3-black w3-display-right" onClick={() => plusDivs(1)}>
                &#10095;
              </Button>
            </Grid>
          </Stack>
        </Grid>
      </Grid>
    </>
  );
}
