import instance from '../config/request';

export function loginRequest(data) {
  return instance.post('/auth/signin', data).then(res => res.data);
}
