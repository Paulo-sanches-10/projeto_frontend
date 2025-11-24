import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/api", // certifique-se que é esse endereço
  headers: { "Content-Type": "application/json" },
});

export default api;