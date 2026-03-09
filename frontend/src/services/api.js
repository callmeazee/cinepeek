import axios from "axios";

const api = axios.create({
  baseURL: "https://cinepeek-8ykx.onrender.com/api",
  withCredentials: true,
});

export default api;
