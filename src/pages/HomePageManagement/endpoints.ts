import request from 'config/apiConfig';

export const getAllProperties = (data: any) => {
  return request.get('/properties', { params: data });
};

export const getPropertyDetails = (id: string) => {
  return request.get(`/properties/${id}`);
};
