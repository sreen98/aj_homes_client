import { useEffect, useState } from 'react';
import { Grid, Select, MenuItem, InputLabel, FormControl, Button, Card } from '@mui/material';

import TextField from '@mui/material/TextField';
import { Filter } from './types';
import { useDispatch } from 'react-redux';
import { getFilteredProperties } from 'pages/PropertyManagement/slice';

const initialState = {
  bathroom: 0,
  bedroom: 0,
  price: { from: null, to: null }
};

function PropertyFilter() {
  const [state, setState] = useState<Filter>(initialState);
  const bathroomOptions = [
    { label: 'None', value: 0 },
    { label: '1', value: 1 },
    { label: '2', value: 2 },
    { label: '3', value: 3 },
    { label: '4', value: 4 },
    { label: '5', value: 5 },
    { label: '6', value: 6 },
    { label: '7', value: 7 },
    { label: '8', value: 8 },
    { label: '9', value: 9 },
    { label: '10', value: 10 }
  ];
  const bedroomOptions = [
    { label: 'None', value: 0 },
    { label: '1', value: 1 },
    { label: '2', value: 2 },
    { label: '3', value: 3 },
    { label: '4', value: 4 },
    { label: '5', value: 5 },
    { label: '6', value: 6 },
    { label: '7', value: 7 },
    { label: '8', value: 8 },
    { label: '9', value: 9 },
    { label: '10', value: 10 }
  ];
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getFilteredProperties(initialState));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = () => {
    dispatch(getFilteredProperties(state));
  };

  return (
    <Card
      style={{
        position: 'relative',
        overflow: 'visible',
        border: '1px solid red',
        borderRadius: 10,
        marginInline: 5
        // background: 'linear-gradient(to bottom right, #ffcccc, #ffe6e6)'
      }}
    >
      <Grid
        container
        spacing={{ xs: 2, md: 3, lg: 4 }}
        columns={{ xs: 4, sm: 12, md: 12 }}
        p={5}
        alignContent={'center'}
      >
        <Grid item xs={12} sm={6} md={3}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Bedrooms</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={state.bedroom}
              label={'Bedrooms'}
              onChange={e => setState({ ...state, bedroom: Number(e.target.value) })}
              variant={'outlined'}
              size={'small'}
              sx={{ width: '100%' }}
            >
              {bedroomOptions.map(item => (
                <MenuItem value={item.value}>{item.label}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Bathrooms</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={state.bathroom}
              label={'Bathrooms'}
              onChange={e => setState({ ...state, bathroom: Number(e.target.value) })}
              variant={'outlined'}
              size={'small'}
              sx={{ width: '100%' }}
            >
              {bathroomOptions.map(item => (
                <MenuItem value={item.value}>{item.label}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6} sm={3} md={3}>
          <FormControl fullWidth>
            <TextField
              label="Price From"
              id="outlined-required"
              placeholder="from"
              type="number"
              value={state.price?.from}
              onChange={e => {
                if (!e.target.value) {
                  setState({ ...state, price: { ...state.price, from: null } });
                } else if (Number(e.target.value) >= 0) {
                  setState({ ...state, price: { ...state.price, from: e.target.value } });
                }
              }}
              size={'small'}
              sx={{ width: '100%' }}
            />
          </FormControl>
        </Grid>
        <Grid item xs={6} sm={3} md={3}>
          <FormControl fullWidth>
            <TextField
              label="Price To"
              id="outlined-required"
              placeholder="to"
              type="number"
              value={state.price.to}
              onChange={e => {
                if (!e.target.value) {
                  setState({ ...state, price: { ...state.price, to: null } });
                } else if (Number(e.target.value) >= 0) {
                  setState({ ...state, price: { ...state.price, to: e.target.value } });
                }
              }}
              size={'small'}
              sx={{ width: '100%' }}
            />
          </FormControl>
        </Grid>
      </Grid>
      <Button
        style={{
          position: 'absolute',
          bottom: -22,
          left: '50%',
          transform: 'translateX(-50%)',
          backgroundColor: 'red',
          color: 'white',
          height: '44px',
          width: '114px',
          borderRadius: '15px'
        }}
        onClick={handleSubmit}
        // size="sm"
      >
        Search
      </Button>
    </Card>
  );
}

export default PropertyFilter;
