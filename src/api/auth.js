import axios from 'axios';
import Cookies from 'universal-cookie';

import UserEndpoint from './endpoints/user.js';
import AppConfig from '../config/app.js';

import getAxios from '../utils/axios-initiator.js';

const cookies = new Cookies();

const DAY_IN_MILLISECONDS = 24 * 3600 * 1000;

const Auth = {
  async login({ username, password }) {
    const credentials = { username, password };
    const result = await axios.post(UserEndpoint.LOGIN, credentials);

    const cookieExpire = new Date(
      new Date().getTime() + DAY_IN_MILLISECONDS
    );

    const userLogin = result.data.data.data_siswa;
    userLogin.token = result.data.data.token;

    cookies.set(AppConfig.USER_LOGIN, JSON.stringify(userLogin), {
      path: '/',
      expires: cookieExpire
    });

    return result;
  },

  async logout() {
    const logoutRequest = await getAxios().get(UserEndpoint.LOGOUT);

    const cookieExpire = new Date(
      new Date().getTime() - DAY_IN_MILLISECONDS
    );
    cookies.set(AppConfig.USER_LOGIN, '', {
      path: '/',
      expires: cookieExpire,
    });

    return logoutRequest;
  },

  getUser() {
    const user = cookies.get(AppConfig.USER_LOGIN);

    return user;
  }
};

export default Auth;
