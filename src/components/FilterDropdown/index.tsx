import React from 'react';
import { FormControl, MenuItem, Select } from '@mui/material';
import { FilterDropdownType } from './types';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const FilterDropDown = ({ value, handleChange, type }: FilterDropdownType) => {
  const dropdownOptions = [
    { label: '', value: '' },
    { label: '1', value: 1 },
    { label: '2', value: 2 },
    { label: '3', value: 3 },
    { label: '4', value: 4 },
    { label: '5', value: 5 },
    { label: '6', value: 6 },
    { label: '7', value: 7 },
    { label: '8', value: 8 },
    { label: '9', value: 9 }
  ];

  return (
    <FormControl
      sx={{
        m: 0,
        minWidth: 10,
        display: 'flex',
        alignItems: 'center',
        '& fieldset': { border: 'none' }
      }}
    >
      <Select
        value={dropdownOptions.some(option => option.value === Number(value)) ? value : ''}
        onChange={event => handleChange(event, type)}
        displayEmpty
        inputProps={{ 'aria-label': 'Without label' }}
        IconComponent={props => <KeyboardArrowDownIcon {...props} sx={{ fontSize: '32px' }} />}
        sx={{
          fontSize: '20px',
          fontWeight: 600,
          height: '40px',
          pr: '15px',
          '& .MuiSelect-select': {
            display: 'flex',
            alignItems: 'center'
          }
        }}
      >
        {dropdownOptions.map(option => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default FilterDropDown;
