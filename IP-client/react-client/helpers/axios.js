import axios from "axios";

export const jokiApi = axios.create({
  baseURL: "http://localhost:3000",
});
