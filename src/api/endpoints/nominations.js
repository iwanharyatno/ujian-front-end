import AppConfig from '../../config/app.js';

const BASE = AppConfig.BASE_API_URL + '/nominasi';

const NominationEndpoint = {
  GET_ALL: BASE,
  POST: BASE + '/create',
};

export default NominationEndpoint;
