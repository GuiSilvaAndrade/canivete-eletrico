import axios from "axios";

const api = axios.create({
  baseURL: 'https://canivete-eletrico-server.vercel.app/',
})

export default api