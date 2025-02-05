import axios, { AxiosInstance } from "axios";

const instance: AxiosInstance = axios.create({
  baseURL: "https://winereview-api.vercel.app/12-2/",
});

export default instance;
