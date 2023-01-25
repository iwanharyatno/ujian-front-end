import axios from 'axios';

import NominationEndpoint from './endpoints/nominations.js';
import Auth from './auth.js';

import getAxios from '../utils/axios-initiator';

const Nomination = {
  async getAll() {
    const result = await getAxios().get(NominationEndpoint.GET_ALL);
    return result.data.data.data_nominasi;
  },

  async insert(nomination) {
    const result = await getAxios().post(NominationEndpoint.POST, nomination);
    return result;
  },

  async update(nomination) {
    const result = await getAxios().post(NominationEndpoint.UPDATE(nomination.id), nomination);
    return result;
  },
  
  async delete(id) {
    const result = await getAxios().get(NominationEndpoint.DELETE(id));
  }
};

export default Nomination;
