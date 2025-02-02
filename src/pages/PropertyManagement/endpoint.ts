import request from 'config/apiConfig';

export const getAllProperties = (data: any) => {
  return request.get('/properties', data);
};

export const getFilteredProperties = (data: any) => {
  const { bathroom, bedroom, price } = data;
  return request.post('/properties/filter', {
    bathroom: bathroom > 0 ? Number(bathroom) : null,
    bedroom: bedroom > 0 ? Number(bedroom) : null,
    price: { from: price.from === null ? null : Number(price.from), to: price.to === null ? null : Number(price.to) }
  });
};

export const getPropertyDetails = (id: string) => {
  return request.get(`/properties/${id}`);
};
