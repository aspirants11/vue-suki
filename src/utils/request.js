import axios from 'axios'
import { Message } from 'element-ui';

// 创建axios，赋给变量service
const BASEURL = process.env.NODE_ENV === 'production' ? '' : '/devapi';
const service = axios.create({
    baseURL: BASEURL, // http://localhost:8080/api//
    timeout: 15000  // 网络请求接口超时
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
  // 后台拦截  检测邮箱是否为空，如果为空弹出消息框 要有后台数据支撑
  // let data = response.data
  // if(data.resCode !== 0) {
  //   Message.error(data.message);
  //   return Promise.reject(data);
  // }else{
  //   return response;
  // }
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
    