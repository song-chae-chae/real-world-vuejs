import axios from "axios";
import {setInterceptors} from "./common/interceptors";

function createInstance() {
  const axiosInstance = axios.create({
    baseURL: "http://localhost:8080",
  });
  return setInterceptors(axiosInstance);
}

export const instance = createInstance();
