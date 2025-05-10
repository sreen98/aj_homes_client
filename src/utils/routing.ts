import { history } from 'utils';

export type RedirectOption = { search?: string; state?: { from?: string } };

export const localRedirect = (path: string, params?: RedirectOption) => {
  history.push({
    pathname: path,
    search: params?.search || ''
  });
};

export const goBack = () => {
  history.goBack();
};

export const getDecodedQueryParams = (searchQuery?: string): { [key: string]: string } =>
  (searchQuery || window.location.search)
    .split(/\?|&/)
    .reduce((accumulated: { [key: string]: string }, current: string): {} => {
      const accumulatedData: { [key: string]: string } = accumulated;
      if (current) {
        accumulatedData[current.split('=')[0]] = decodeURIComponent(current.split('=')[1]);
      }
      return accumulatedData;
    }, {});

/**
 * Get decoded query params in the url
 * @return {Object}
 */

export function getEncodedQueryParams(params: { [key: string]: string }) {
  return Object.keys(params)
    .map((key: string): any => params[key] && [key, encodeURIComponent(params[key])].join('='))
    .filter(it => Boolean(it))
    .join('&');
}
