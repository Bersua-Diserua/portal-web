import axios from "axios";

const api = axios.create({
  baseURL: process.env.BACKEND,
  validateStatus: (status) => status < 500,
});

export { api };
