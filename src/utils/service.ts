import axios from 'axios';
const api = axios.create({
  baseURL: 'http://localhost:5000',
});

export const fetchUser = async () => {
  const response = await api.get('/api/users');
  return response.data;
};

export const updateProfile = async (userId: number, profileData: any) => {
  const response = await api.put(`/api/users/${userId}`, profileData);
  return response.data;
};

export const registerUser = async (values: any) => {
  const { data } = await api.post('/api/register', values);
  return data;
};

export const login = async (credentials: any) => {
  const response = await api.post('/api/login', credentials);
  return response.data;
};
