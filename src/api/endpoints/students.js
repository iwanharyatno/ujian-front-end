import AppConfig from '../../config/app.js';

const BASE = AppConfig.BASE_API_URL + '/siswa';

const StudentEndpoint = {
  GET_ALL: AppConfig.BASE_API_URL + '/user',
  POST: BASE + '/insert',
  UPDATE: (id) => BASE + `/update/${id}`,
  DELETE: (id) => BASE + `/delete/${id}`,
};

export default StudentEndpoint;
