import { Box, Button, Grid, IconButton, MenuItem, TextField, Typography, useMediaQuery } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { Icon } from 'components';
import FilterDropDown from 'components/FilterDropdown';
import SearchIcon from '@mui/icons-material/Search';
import messages from './messages';
import { isEmpty } from 'lodash';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  boxShadow: 'none',
  border: '1px solid transparent',
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
    border: '1px solid #333'
  })
}));

const SearchProperty = ({ onClickSearch, search }: { onClickSearch: any; search?: any }) => {
  const isSmallScreen = useMediaQuery('(max-width:1080px)');
  const initialState = {
    bathrooms: '',
    bedrooms: '',
    price: { from: null, to: null }
  };
  useEffect(() => {
    if (!isEmpty(search)) {
      setSearchValues({
        bathrooms: search.bathrooms,
        bedrooms: search.bedrooms,
        price: { from: search.priceFrom, to: search.priceTo }
      });
      if (search.category) setSelectedCategory(search.category);
    }
  }, [search]);
  useEffect(() => {});

  const [selectedCategory, setSelectedCategory] = useState('forSale');
  const categoryOptions = [
    { label: 'For Sale', value: 'forSale' },
    { label: 'Residential lettings', value: 'residentialLettings' },
    { label: 'Student Lettings', value: 'studentLettings' }
  ];

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setSearchValues(() => ({
      // ...prevValues,
      bathrooms: '',
      bedrooms: '',
      price: { from: null, to: null },
      category: category
    }));
  };

  const priceDropdownOptions = [
    { label: '', value: 'null' },
    { label: '£ 300', value: 300 },
    { label: '£ 350', value: 350 },
    { label: '£ 400', value: 400 },
    { label: '£ 450', value: 450 },
    { label: '£ 500', value: 500 },
    { label: '£ 550', value: 550 },
    { label: '£ 600', value: 600 },
    { label: '£ 650', value: 650 },
    { label: '£ 700', value: 700 },
    { label: '£ 750', value: 750 },
    { label: '£ 800', value: 800 },
    { label: '£ 850', value: 850 },
    { label: '£ 900', value: 900 },
    { label: '£ 950', value: 950 },
    { label: '£ 1000', value: 1000 }
  ];

  const lettingsPriceDropdownOptions = [
    { label: '', value: 'null' },
    { label: '£ 300', value: 300 },
    { label: '£ 400', value: 400 },
    { label: '£ 500', value: 500 },
    { label: '£ 600', value: 600 },
    { label: '£ 700', value: 700 },
    { label: '£ 800', value: 800 },
    { label: '£ 900', value: 900 },
    { label: '£ 1000', value: 1000 },
    { label: '£ 1100', value: 1100 },
    { label: '£ 1200', value: 1200 },
    { label: '£ 1300', value: 1300 },
    { label: '£ 1400', value: 1400 },
    { label: '£ 1500', value: 1500 },
    { label: '£ 1600', value: 1600 },
    { label: '£ 1700', value: 1700 },
    { label: '£ 1800', value: 1800 },
    { label: '£ 1900', value: 1900 },
    { label: '£ 2000', value: 2000 },
    { label: '£ 2100', value: 2100 },
    { label: '£ 2200', value: 2200 },
    { label: '£ 2300', value: 2300 },
    { label: '£ 2400', value: 2400 },
    { label: '£ 2500', value: 2500 }
  ];

  const [searchValues, setSearchValues] = useState<any>(initialState);

  const handleChange = (event: any, type: string) => {
    setSearchValues((prevValues: any) => ({
      ...prevValues,
      [type]: event.target.value
    }));
  };

  const handlePriceChange = (event: any, type: string) => {
    setSearchValues((prevValues: any) => ({
      ...prevValues,
      price: {
        ...prevValues.price,
        [type]: event.target.value
      }
    }));
  };

  const handleSearchClick = () => {
    onClickSearch(searchValues);
  };

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex(prev => {
      const newIndex = (prev + 1) % categoryOptions.length;
      setSelectedCategory(categoryOptions[newIndex].value);
      setSearchValues((prevValues: any) => ({
        ...prevValues,
        category: categoryOptions[newIndex].value
      }));
      return newIndex;
    });
  };

  const handlePrev = () => {
    setCurrentIndex(prev => {
      const newIndex = prev === 0 ? categoryOptions.length - 1 : prev - 1;
      setSelectedCategory(categoryOptions[newIndex].value);
      setSearchValues((prevValues: any) => ({
        ...prevValues,
        category: categoryOptions[newIndex].value
      }));
      return newIndex;
    });
  };

  return (
    <>
      <Grid sx={{ marginBottom: '16px' }}>
        <Grid
          container
          spacing={2}
          justifyContent="center"
          sx={{
            display: { xs: 'none', md: 'flex' },
            margin: 0
          }}
        >
          {categoryOptions.map(category => (
            <Grid item key={category.value} xs={4} sm={4} md={3} lg={3}>
              <Box
                onClick={() => handleCategorySelect(category.value)}
                sx={{
                  padding: '18px',
                  textAlign: 'center',
                  cursor: 'pointer',
                  fontWeight: 600,
                  borderRadius: '4px',
                  minWidth: '160px',
                  backgroundColor: selectedCategory === category.value ? '#cf1313' : 'white',
                  color: selectedCategory === category.value ? 'white' : 'black',
                  '&:hover': {
                    backgroundColor: '#cf1313',
                    color: 'white'
                  }
                }}
              >
                {category.label}
              </Box>
            </Grid>
          ))}
        </Grid>

        <Box
          sx={{
            display: { xs: 'flex', md: 'none' },
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '12px 24px',
              textAlign: 'center',
              cursor: 'pointer',
              fontWeight: 600,
              borderRadius: '4px',
              width: '100%',
              maxWidth: '260px',
              backgroundColor: selectedCategory === categoryOptions[currentIndex].value ? '#cf1313' : 'white',
              color: selectedCategory === categoryOptions[currentIndex].value ? 'white' : 'black',
              '&:hover': {
                backgroundColor: '#cf1313',
                color: 'white'
              },
              position: 'relative'
            }}
            onClick={() => handleCategorySelect(categoryOptions[currentIndex].value)}
          >
            <IconButton
              onClick={e => {
                e.stopPropagation();
                handlePrev();
              }}
              sx={{
                position: 'absolute',
                left: '10px',
                color: selectedCategory === categoryOptions[currentIndex].value ? 'white' : 'black'
              }}
            >
              <ChevronLeft />
            </IconButton>
            <Box sx={{ flexGrow: 1, textAlign: 'center' }}>{categoryOptions[currentIndex].label}</Box>
            <IconButton
              onClick={e => {
                e.stopPropagation();
                handleNext();
              }}
              sx={{
                position: 'absolute',
                right: '10px',
                color: selectedCategory === categoryOptions[currentIndex].value ? 'white' : 'black'
              }}
            >
              <ChevronRight />
            </IconButton>
          </Box>
        </Box>
      </Grid>

      <Grid
        container
        sx={{
          backgroundColor: 'white',
          padding: '10px',
          marginLeft: isSmallScreen ? '-10px' : '0px',
          borderRadius: '20px',
          boxShadow: '6px 6px 15px rgba(0, 0, 0, 0.5)',
          transition: 'all 0.3s ease-in-out'
        }}
        justifyContent="center"
        alignItems="center"
        spacing={2}
      >
        <Grid item xs={12} sm={6} md={3.5} lg={3.5}>
          <Item
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '20px',
              borderRight: { md: '1px solid gray', xs: 'none' },
              width: '100%'
            }}
          >
            <Icon name="bedrooms" styles={{ height: '22px', width: '22px' }} />
            <Typography sx={{ fontSize: '16px', fontWeight: 600 }}>{messages.bedrooms}</Typography>
            <FilterDropDown value={searchValues.bedrooms} handleChange={handleChange} type={'bedrooms'} />
          </Item>
        </Grid>

        <Grid item xs={12} sm={6} md={3.5} lg={3.5}>
          <Item
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '20px',
              borderRight: { md: '1px solid gray', xs: 'none' },
              width: '100%'
            }}
          >
            <Icon name="bathrooms" styles={{ height: '22px', width: '22px' }} />
            <Typography sx={{ fontSize: '16px', fontWeight: 600 }}>{messages.bathrooms}</Typography>
            <FilterDropDown value={searchValues.bathrooms} handleChange={handleChange} type={'bathrooms'} />
          </Item>
        </Grid>

        <Grid item xs={12} sm={12} md={6} lg={5} sx={{ display: 'flex', justifyContent: 'center' }}>
          <Item
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: isSmallScreen ? '12px' : '0px',
              gap: '20px',
              width: '100%',
              maxWidth: '400px'
            }}
          >
            {!isSmallScreen && <Icon name="pound" styles={{ height: '22px', width: '22px' }} />}
            <Typography sx={{ fontSize: '16px', fontWeight: 600 }}>{messages.price}</Typography>
            <TextField
              size="small"
              sx={{ minWidth: { xs: 100, md: 120 } }}
              id="outlined-select-from"
              select
              label={messages.from}
              value={searchValues.price.from}
              InputLabelProps={{ shrink: !!searchValues.price.from }}
              onChange={e => handlePriceChange(e as React.ChangeEvent<HTMLInputElement>, 'from')}
            >
              {priceDropdownOptions.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              size="small"
              sx={{ minWidth: { xs: 100, md: 120 } }}
              id="outlined-select-to"
              select
              InputLabelProps={{ shrink: !!searchValues.price.to }}
              label={messages.to}
              value={searchValues.price.to}
              onChange={e => handlePriceChange(e as React.ChangeEvent<HTMLInputElement>, 'to')}
            >
              {priceDropdownOptions.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Item>
        </Grid>
      </Grid>
      <Grid item xs={12} lg={12} sx={{ display: 'flex', justifyContent: 'center', mt: { lg: 0, xs: 2 } }}>
        <Item sx={{ backgroundColor: 'transparent' }}>
          <Button
            sx={{
              backgroundColor: '#cf1313',
              padding: '10px',
              paddingLeft: '15px',
              paddingRight: '15px',
              fontWeight: 600,
              color: 'white',
              borderRadius: '10px',
              '&:hover': {
                backgroundColor: '#cf1313',
                transition: 'all 0.3s ease-in-out',
                transform: 'scale(1.07)'
              }
            }}
            startIcon={<SearchIcon sx={{ color: 'white' }} />}
            onClick={handleSearchClick}
          >
            Search
          </Button>
        </Item>
      </Grid>
    </>
  );
};

export default SearchProperty;
