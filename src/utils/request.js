import axios from 'axios'

// 创建axios，赋给变量service
const BASEURL = process.env.NODE_ENV === 'production' ? '' : '/devapi';
const service = axios.create({
    baseURL: BASEURL, // http://localhost:8080/api//
    timeout: 1000
  });

// 添加请求拦截器
service.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
service.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response;
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});


// 暴露出去
export default service;

/**
 * 使用export default时，不能同时存在多个default
 * 文件 import 不需要花括号
 * 
 * 没有使用export default时，可以同时存在多个default
 * 文件 import 需要花括号
 * 
 */
    