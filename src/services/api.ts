import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://cm42-medical-dashboard.herokuapp.com/',
});
