import AppConfig from '../../config/app.js';

const BASE = AppConfig.BASE_API_URL + '/jadwal';

const StudentEndpoint = {
  GET_ALL: BASE,
  POST: BASE + '/create',
  DELETE: (id) => BASE + `/delete/${id}`,
};

export default StudentEndpoint;
