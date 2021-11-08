import axios from "axios";

export let sessionApi = axios.create({
  baseURL:
    "https://39t21kptu5.execute-api.ap-southeast-1.amazonaws.com/v1/api/session",
});

export let chatApi = axios.create({
  baseURL: "https://39t21kptu5.execute-api.ap-southeast-1.amazonaws.com/v1/api",
});

//DO NOT EDIT AND PUSH SOMETHING ELSE TO MAIN
export let api = axios.create({
  baseURL: "https://39t21kptu5.execute-api.ap-southeast-1.amazonaws.com/v1/api",
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
