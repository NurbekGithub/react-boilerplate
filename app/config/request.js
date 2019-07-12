import axios from 'axios';

const instance = axios.create();

export function setAuthorizationHeader(token = null) {
  if (token) {
    instance.defaults.headers.common.authorization = `Bearer ${token}`;
    localStorage.setItem('token', token);
  } else {
    delete instance.defaults.headers.common.authorization;
    localStorage.removeItem('token');
  }
}

export default instance;
