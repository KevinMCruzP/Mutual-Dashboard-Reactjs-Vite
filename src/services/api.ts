import axios from "axios";

export const api = axios.create({
  // baseURL: "http://10.5.192.185:3333/",
  baseURL: "http://localhost:3334/",
});
