import AppConfig from '../../config/app.js';

const BASE = AppConfig.BASE_API_URL + '/user';

const AdminEndpoint = {
  GET_ALL__POST: BASE,
  GET__PUT__DELETE: (id) => `${BASE}/${id}`,
  LOGIN: `${BASE}/login`,
};

export default AdminEndpoint;
