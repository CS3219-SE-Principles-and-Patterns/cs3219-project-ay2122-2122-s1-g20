import axios from "axios";

//DO NOT EDIT AND PUSH SOMETHING ELSE TO MAIN
let instance = axios.create({
  baseURL: "http://localhost:8080/api",
});

// instance.interceptors.request.use(async (config) => {
//   const token = getJwtToken() --> from storage/cookies;
//   config.headers.common["x-access-token"] = token;
//   return config;
// });

export default instance;
