import axios from 'axios';

import KelasEndpoint from './endpoints/kelas.js';
import Auth from './auth.js';

import getAxios from '../utils/axios-initiator';

const Kelas = {
  async getAll() {
    const result = await getAxios().get(KelasEndpoint.GET_ALL);

    return result.data.data.data_kelas;
  },

  async insert(kelas) {
    const result = await getAxios().post(KelasEndpoint.POST, kelas);

    return result;
  },

  async update(kelas) {
    const result = await getAxios().post(KelasEndpoint.UPDATE(kelas.id), kelas);

    return result;
  },

  async delete(id) {
    const result = await getAxios().get(KelasEndpoint.DELETE(id));

    return result;
  }
};

export default Kelas;
