import axios from 'axios';

import RoomEndpoint from './endpoints/rooms.js';
import Auth from './auth.js';

import getAxios from '../utils/axios-initiator';

const Room = {
  async getAll() {
    const result = await getAxios().get(RoomEndpoint.GET_ALL);
    return result.data.data.data_ruangan;
  },

  async insert(room) {
    const result = await getAxios().post(RoomEndpoint.POST, room);
    return result;
  },

  async update(room) {
    const result = await getAxios().post(RoomEndpoint.UPDATE(room.id), room);
    return result;
  },
  
  async delete(id) {
    const result = await getAxios().get(RoomEndpoint.DELETE(id));
  }
};

export default Room;
