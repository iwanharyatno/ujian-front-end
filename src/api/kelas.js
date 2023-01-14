import axios from 'axios';

import KelasEndpoint from './endpoints/kelas.js';
import Auth from './auth.js';

const accessToken = Auth.getUser() ? Auth.getUser().token : '';
const axiosInstance = axios.create({
  headers: {
    'Authorization': `Bearer ${accessToken}`,
  },
});

const Kelas = {
  async getAll() {
    const result = await axiosInstance.get(KelasEndpoint.GET_ALL);

    return result.data.data.data_kelas;
  },

  async insert(kelas) {
    const result = await axiosInstance.post(KelasEndpoint.POST, kelas);

    return result;
  },

  async update(kelas) {
    const result = await axiosInstance.post(KelasEndpoint.UPDATE(kelas.id), kelas);

    return result;
  },

  async delete(id) {
    const result = await axiosInstance.get(KelasEndpoint.DELETE(id));

    return result;
  }
};

export default Kelas;
