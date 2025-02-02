import * as React from 'react';
import PropTypes from 'prop-types';
import { Typography, Grid, Box, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import styled from '@emotion/styled';
import { IPageTitle } from './types';
import { goBack } from 'utils';

const PageTitleWrapper = styled(Box)(
  ` 
    padding: 1rem 3rem 1rem 0rem;
  `
);

const PageTitle: React.FC<IPageTitle> = ({
  heading = '',
  subHeading = '',
  buttonText = '',
  onButtonClick = () => {},
  showBack = false,
  ...rest
}) => {
  return (
    <PageTitleWrapper>
      <Grid container justifyContent="space-between" alignItems="flex-start" {...rest}>
        <Grid item container xs={8} alignItems="flex-start" spacing={1}>
          {showBack && (
            <Grid item>
              <ArrowBackIcon sx={{ width: '40px', height: '30px' }} onClick={goBack} />
            </Grid>
          )}
          <Grid item>
            <Typography variant="h3" component="h3" gutterBottom>
              {heading}
            </Typography>
          </Grid>
          {subHeading && (
            <Grid item>
              <Typography variant="subtitle2">{subHeading}</Typography>
            </Grid>
          )}
        </Grid>
        {buttonText && (
          <Grid item xs={4} container justifyContent="flex-end">
            <Button
              onClick={onButtonClick}
              variant="contained"
              color="primary"
              size="small"
              startIcon={<AddIcon fontSize="small" />}
            >
              {buttonText}
            </Button>
          </Grid>
        )}
      </Grid>
    </PageTitleWrapper>
  );
};

export default PageTitle;
