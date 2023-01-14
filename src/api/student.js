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
    return result.data.data.data_siswa;
  },

  async insert(student) {
    const result = await axiosInstance.post(StudentEndpoint.POST, student);
    return result;
  },

  async update(student) {
    console.log('update:', StudentEndpoint.UPDATE(student.id));
    console.table(student);
    const result = await axiosInstance.post(StudentEndpoint.UPDATE(student.id), student);
    return result;
  },
  
  async delete(id) {
    const result = await axiosInstance.get(StudentEndpoint.DELETE(id));
  }
};

export default Student;
