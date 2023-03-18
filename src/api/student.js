import StudentEndpoint from './endpoints/students.js';

import getAxios from '../utils/axios-initiator';

const Student = {
  async getAll() {
    const result = await getAxios().get(StudentEndpoint.GET_ALL);
    return result.data.data.data;
  },

  async insert(student) {
    const result = await getAxios().post(StudentEndpoint.POST, student);
    return result;
  },

  async update(student) {
    const result = await getAxios().post(StudentEndpoint.UPDATE(student.id), student);
    return result;
  },
  
  async delete(id) {
    const result = await getAxios().get(StudentEndpoint.DELETE(id));
  }
};

export default Student;
