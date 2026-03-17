import api from './axios';

export const productApi = {
  getAllProducts: async () => {
    const response = await api.get('/api/products');
    return response.data;
  },
  getProductById: async (id) => {
    const response = await api.get(`/api/products/${id}`);
    return response.data;
  },
  getRecommendations: async (productId) => {
    const query = productId ? `?productId=${productId}` : '';
    const response = await api.get(`/api/products/recommendations${query}`);
    return response.data;
  },
};
