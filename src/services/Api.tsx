import axios, { AxiosResponse } from "axios";

const Api = axios.create({
  baseURL: "https://localhost:7046",
});

export default Api;
