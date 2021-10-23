import axios from "axios";

//DO NOT EDIT AND PUSH SOMETHING ELSE TO MAIN
export let api = axios.create({
  baseURL: "http://localhost:8080/api",
});

export const setTokenHeader = (token) =>
  api.interceptors.request.use(async (config) => {
    config.headers.common["x-access-token"] = token;
    return config;
  });

export const setSaltHeader = (salt) =>
  api.interceptors.request.use(async (config) => {
    config.headers.common["jwt-salt"] = salt;
    return config;
  });
