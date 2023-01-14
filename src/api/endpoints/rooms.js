import AppConfig from '../../config/app.js';

const BASE = AppConfig.BASE_API_URL + '/ruangan';

const RoomEndpoint = {
  GET_ALL: BASE,
  POST: BASE + '/insert',
  UPDATE: (id) => BASE + `/update/${id}`,
  DELETE: (id) => BASE + `/delete/${id}`,
};

export default RoomEndpoint;
