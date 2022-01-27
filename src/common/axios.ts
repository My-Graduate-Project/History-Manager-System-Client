import axios from "axios";

const config = {
  baseURL:
    process.env.NODE_ENV === "development"
      ? "/api"
      : "http://47.108.197.220:3010/api",
  timeout: 60 * 1000, // Timeout,
  withCredentials: false, // Check cross-site Access-Control
  header: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "X-Requested-With,Content-Type",
    "Access-Control-Allow-Methods": "PUT,POST,GET,DELETE,OPTIONS",
    "Content-Type": "application/json;charset=utf-8",
  },
};

// 创建一个 axios 实例对象，用于配置项目应用相关请求
const _axios = axios.create(config);

// 请求拦截器
_axios.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
_axios.interceptors.response.use(
  (response) => {
    // console.log(response);
    if (response.status === 200) {
      return response.data;
    }
    if (response.status === 404) {
      return Promise.reject({
        message: "请求资源不存在",
        status: 404,
      });
    }
  },
  (error) => {
    return Promise.reject(error.response);
  }
);

// 生成请求函数所需参数
const generateRequestConfig = (url: string, method: string, data?: any) => ({
  url,
  method,
  [method.toLowerCase() === "get" ? "params" : "data"]: data,
});

// 请求函数（不带Token）
export default function request(url: string, method: string, data?: any) {
  return _axios(generateRequestConfig(url, method, data));
}
