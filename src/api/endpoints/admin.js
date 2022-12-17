import AppConfig from '../../config/app.js';

const BASE = AppConfig.BASE_API_URL + '/admin';

const AdminEndpoint = {
  LOGIN: `${BASE}/loogin`,
  LOGOUT: `${BASE}/logout`,
};

export default AdminEndpoint;
