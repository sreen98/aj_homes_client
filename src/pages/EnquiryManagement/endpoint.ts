import request from 'config/apiConfig';

export const createEnquiry = (data: any) => {
  return request.post('/enquiry', data);
};
