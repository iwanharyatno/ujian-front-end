import axios from 'axios';

import StudentEndpoint from './endpoints/students.js';
import Auth from './auth.js';

const accessToken = Auth.getUser() ? Auth.getUser().token : '';
const axiosInstance = axios.create({
  headers: {
    'Authorization': `Bearer ${accessToken}`,
  },
});

const Student = {
  async getAll() {
    const result = await axiosInstance.get(StudentEndpoint.GET_ALL);
    return result;
  }
};

export default Student;
