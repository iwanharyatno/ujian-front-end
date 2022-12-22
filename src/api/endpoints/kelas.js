import AppConfig from '../../config/app.js';

const BASE = AppConfig.BASE_API_URL + '/kelas';

const KelasEndpoint = {
  GET_ALL: BASE,
  POST: BASE + '/insert',
  UPDATE: (id) => BASE + `/update/${id}`,
};

export default KelasEndpoint;
