import ScheduleEndpoint from './endpoints/schedules.js';

import getAxios from '../utils/axios-initiator';

const Schedule = {
  async getAll() {
    const result = await getAxios().get(ScheduleEndpoint.GET_ALL);
    return result.data.data.data;
  },

  async insert(schedule) {
    const result = await getAxios().post(ScheduleEndpoint.POST, schedule);
    return result;
  },

  async delete(id) {
    const result = await getAxios().get(ScheduleEndpoint.DELETE(id));
  }
};

export default Schedule;
