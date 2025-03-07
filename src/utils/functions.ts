import { statusOptions } from 'config';

export const getStatusLabel = (value: string) => {
  const option = statusOptions.find(option => option.value === value);
  return option ? option.label : '';
};
