import axios from "axios";
// const BASE_URL = "http://192.168.8.124:5000";
const BASE_URL = "https://16.171.34.240/api";

export default axios.create({
  baseURL: BASE_URL,
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});
