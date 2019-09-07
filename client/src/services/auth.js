import axios from 'axios';

// const BASE_URL = 'http://localhost:3004';
// const BASE_URL = 'https://mealmatchpandas.herokuapp.com'
const BASE_URL = 'https://cravemealdrink-api.herokuapp.com'

export const api = axios.create({
  baseURL: BASE_URL,
});

const storeToken = (token) => {
  localStorage.setItem('authToken', token);
  api.defaults.headers.common.authorization = `Bearer ${token}`;
}

export const createUser = async (userData) => {
  const resp = await api.post('/users', userData);
  const { user, token } = resp.data;
  storeToken(token);
  return user;
};

export const loginUser = async (userData) => {
  const resp = await api.post('/users/login', userData);
  const { user, token } = resp.data;
  storeToken(token);
  console.log(token)
  return user;
};

export const verifyToken = async () => {
  const token = localStorage.getItem('authToken');
  console.log(token)
  if (token !== null) {
    try {
      const resp = await api.get('/users/verify', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      storeToken(token);

      return resp.data.user;
    } catch (e) {
      console.log(e.message);
      console.log('invalid token');
    }
  }
};

