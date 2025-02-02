import { statusOptions } from 'config';

export const getStatusLabel = (value: string) => {
  const option = statusOptions.find(option => option.value === value);
  return option ? option.label : '';
};

export function getEncodedQueryParams(params: { [key: string]: string }) {
  return Object.keys(params)
    .map((key: string): any => params[key] && [key, encodeURIComponent(params[key])].join('='))
    .filter(it => Boolean(it))
    .join('&');
}
