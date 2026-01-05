import axios from 'axios';

export const createClient = (baseURL: string) => {
  return axios.create({ baseURL });
};
