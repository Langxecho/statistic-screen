import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

// 创建 axios 实例
const instance = axios.create({
  baseURL: "http://localhost:8081/medicine-online-admin-api", // 默认 API 地址，可以根据需要更改
  timeout: 10000, // 请求超时时间
  headers: {
    "Content-Type": "application/json", // 默认 Content-Type
  },
});

// 请求拦截器
// instance.interceptors.request.use(
//     (config: any) => {
//         // 在发送请求之前做一些操作，如添加 token
//         const token = localStorage.getItem('token');
//         if (token) {
//             config.headers['Authorization'] = `Bearer ${token}`; // 如果有 token 则加入 Authorization
//         }
//         return config;
//     },
//     (error) => {
//         // 请求错误时的处理
//         return Promise.reject(error);
//     }
// );

// 响应拦截器
instance.interceptors.response.use(
  (response: AxiosResponse) => {
    // 解析响应的 data，将其从 data.result 提取出来
    if (response.data && response.data.result !== undefined) {
      // 假设响应的数据结构是 { result: { ...data } }
      return response.data.result;
    }

    // 如果没有 result 属性，则直接返回原始数据
    return response.data.data;
  },
  (error) => {
    // 错误处理
    console.error("响应错误：", error);
    return Promise.reject(error);
  }
);

// 封装 GET 请求
export function get<T>(url: string, params?: Record<string, any>) {
  return instance.get<T>(url, { params });
}

// 封装 POST 请求
export function post<T>(url: string, data?: Record<string, any>) {
  return instance.post<T>(url, data);
}

// 封装 PUT 请求
export function put<T>(url: string, data?: Record<string, any>) {
  return instance.put<T>(url, data);
}

// 封装 DELETE 请求
export function del<T>(url: string, params?: Record<string, any>) {
  return instance.delete<T>(url, { params });
}

export default instance;
