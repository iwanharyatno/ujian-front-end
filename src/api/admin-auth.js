import axios from 'axios';
import Cookies from 'universal-cookie';

import AdminEndpoint from './endpoints/admin.js';
import AppConfig from '../config/app.js';

const cookies = new Cookies();

const DAY_IN_MILLISECONDS = 24 * 3600 * 1000;

const AdminAuth = {
  async login({ username, password, ujianId }) {
    const credentials = { username, password };
    const result = await axios.post(AdminEndpoint.LOGIN, credentials);

    const cookieExpire = new Date(
      new Date().getTime() + DAY_IN_MILLISECONDS * 31
    );

    const adminLogin = result.data.data.data_admin;
    adminLogin.token = result.data.data.token;

    cookies.set(AppConfig.USER_LOGIN, JSON.stringify(adminLogin), {
      path: '/',
      expires: cookieExpire
    });
    cookies.set(AppConfig.UJIAN_ID, ujianId + '|' + cookieExpire.getTime(), {
      path: '/',
      expires: cookieExpire
    });

    return result;
  },

  async logout() {
    const adminToken = cookies.get(AppConfig.USER_LOGIN).token;

    cookies.remove(AppConfig.USER_LOGIN, {
      path: '/',
    });
    cookies.remove(AppConfig.UJIAN_ID, {
      path: '/',
    });

    const logoutConfig = {
      headers: {
        Authorization: `Bearer ${adminToken}`
      }
    };
    const logoutRequest = await axios.post(AdminEndpoint.LOGOUT, {}, logoutConfig);

    return logoutRequest;
  }
};

export default AdminAuth;
