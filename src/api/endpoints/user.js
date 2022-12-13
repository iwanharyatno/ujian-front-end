import AppConfig from '../../config/app.js';

const BASE = AppConfig.BASE_API_URL + '/user';

const UserEndpoint = {
  GET_ALL__POST: BASE,
  GET__PUT__DELETE: (id) => `${BASE}/${id}`,
  LOGIN: `${BASE}/login`,
  LOGOUT: `${BASE}/logout`
};

export default UserEndpoint;
