import AppConfig from '../../config/app.js';

const BASE = AppConfig.BASE_API_URL + '/admin';

const AdminEndpoint = {
  LOGIN: `${BASE}/login`,
  LOGOUT: `${BASE}/logout`,
};

export default AdminEndpoint;
