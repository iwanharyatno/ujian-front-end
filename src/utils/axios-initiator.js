import axios from 'axios';

import Auth from '../api/auth';

export default function getAxios() {
  const accessToken = Auth.getUser() ? Auth.getUser().token : '';
  const axiosInstance = axios.create({
    headers: {
      'Authorization': `Bearer ${accessToken}`,
    },
  });

  return axiosInstance;
}
