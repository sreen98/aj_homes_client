import { Button, FormControl, Grid, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { Icon } from 'components';
import FilterDropDown from 'components/FilterDropdown';
import SearchIcon from '@mui/icons-material/Search';
import messages from './messages';

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

const SearchProperty = () => {
  const initialState = {
    bathrooms: '',
    bedrooms: '',
    price: { from: null, to: null }
  };

  const priceDropdownOptions = [
    { label: '', value: '' },
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

  return (
    <Grid
      container
      sx={{
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '20px',
        boxShadow: '6px 6px 15px rgba(0, 0, 0, 0.5)',
        transition: 'all 0.3s ease-in-out',
        '&:hover': {
          boxShadow: '6px 6px 15px rgba(0, 0, 0, 0.9)',
          transform: 'scale(1.01)'
        }
      }}
    >
      <Grid item xs={12} sm={6} md={3.5} lg={3} justifyItems={{ xs: 'center', md: 'flex-start' }}>
        <Item
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
            padding: '10px',
            borderRight: { md: '1px solid gray', xs: 'none' }
          }}
        >
          <Icon name="bedrooms" styles={{ height: '22px', width: '22px' }} />
          <Typography
            component="p"
            sx={{
              fontSize: '16px',
              fontWeight: 600,
              margin: 0,
              lineHeight: 1
            }}
          >
            {messages.bedrooms}
          </Typography>
          <FilterDropDown value={searchValues.bedrooms} handleChange={handleChange} type={'bedrooms'} />
        </Item>
      </Grid>
      <Grid item xs={12} sm={6} md={3.5} lg={3} justifyItems={{ xs: 'center', md: 'flex-start' }}>
        <Item
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
            padding: '10px',
            borderRadius: 0,
            borderRight: { md: '1px solid gray', xs: 'none' }
          }}
        >
          <Icon name="bathrooms" styles={{ height: '22px', width: '22px' }} />
          <Typography
            component="p"
            sx={{
              fontSize: '16px',
              fontWeight: 600,
              margin: 0,
              lineHeight: 1
            }}
          >
            {messages.bathrooms}
          </Typography>
          <FilterDropDown value={searchValues.bathrooms} handleChange={handleChange} type={'bathrooms'} />
        </Item>
      </Grid>
      <Grid item xs={12} sm={12} md={5} lg={4.5} justifyItems={{ xs: 'center', md: 'flex-start' }}>
        <Item
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
            padding: '10px',
            borderRadius: 0,
            borderRight: { md: '1px solid gray', xs: 'none' }
          }}
        >
          <Icon name="pound" styles={{ height: '22px', width: '22px' }} />
          <Typography
            component="p"
            sx={{
              fontSize: '16px',
              fontWeight: 600,
              margin: 0,
              lineHeight: 1
            }}
          >
            {messages.price}
          </Typography>
          <FormControl sx={{ minWidth: { xs: 100, md: 120 } }} size="small">
            <InputLabel id="from-select-label" sx={{ fontSize: '16px' }}>
              {messages.from}
            </InputLabel>
            <Select
              labelId="from-select-label"
              id="from-select"
              value={searchValues.price.from}
              label="From"
              onChange={event => handlePriceChange(event, 'from')}
              sx={{ fontSize: '14px', height: '36px', fontWeight: 600 }}
            >
              {priceDropdownOptions.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl sx={{ minWidth: 120 }} size="small">
            <InputLabel id="to-select-label" sx={{ fontSize: '16px' }}>
              {messages.to}
            </InputLabel>
            <Select
              labelId="to-select-label"
              id="to-select"
              value={searchValues.price.to}
              label="To"
              onChange={event => handlePriceChange(event, 'to')}
              sx={{ fontSize: '14px', height: '36px', fontWeight: 600 }}
            >
              {priceDropdownOptions.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Item>
      </Grid>
      <Grid item xs={12} lg={1.5} justifyItems={{ xs: 'center', md: 'flex-start' }}>
        <Item>
          <Button
            sx={{
              backgroundColor: '#cf1313',
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
          >
            Search
          </Button>
        </Item>
      </Grid>
    </Grid>
  );
};

export default SearchProperty;
