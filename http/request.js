import axios from "axios";
import { ElMessage } from "element-plus";

const service = axios.create({
  baseURL: process.env.VUE_APP_URL,
  timeout: 5000,
});

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    // 如果是post请求，就设置请求头
    if (config.method === "post") {
      config.headers["Content-Type"] = "application/x-www-form-urlencoded";
    }
    return config;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    const res = response.data;
    if (res.code !== 200) {
      ElMessage.error(res.message || "Error");
      return Promise.reject(new Error(res.message || "Error"));
    } else {
      return res;
    }
  },
  (error) => {
    console.log("err" + error);
    ElMessage.error(error.message);
    return Promise.reject(error);
  }
);

export default service;
