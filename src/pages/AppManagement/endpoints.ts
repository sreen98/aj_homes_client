import request from 'config/apiConfig';

export const getUserData = () => {
  return request.get('users/1');
};

export const getSiteStatus = () => {
  return request.post('/maintenance');
};
