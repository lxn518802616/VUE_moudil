"use strict";

import Vue from 'vue';
import axios from "axios";
import store from '../store';
import router from '../router';

// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

let config = {
 // baseURL: process.env.baseURL || process.env.apiUrl || "" //api地址
  // baseURL: "http://10.101.100.87/cqm/jj",
  baseURL: "",
  // baseURL: "http://10.101.97.85:8081/CQM/jj",
  // timeout: 60 * 1000, // Timeout  // 过期时间
  timeout: 30 * 1000, // Timeout  // 过期时间
  headers: {
    'Content-Type':'application/json; charset=utf-8',
    
    }
  // withCredentials: true, // Check cross-site Access-Control  // 默认情况下，跨源请求不提供凭据(cookie、HTTP认证及客户端SSL证明等)。通过将withCredentials属性设置为true，可以指定某个请求应该发送凭据。如果服务器接收带凭据的请求，会用下面的HTTP头部来响应。Access-Control-Allow-Credentials: true;如果发送的是带凭据的请求，但服务器的相应中没有包含这个头部，那么浏览器就不会把相应交给JavaScrip
};

const _axios = axios.create(config);

// axios.defaults.withCredentials = true

_axios.interceptors.request.use(
  function(config) {
    if (sessionStorage.getItem('token')) {
          // config.headers['token'] =  store.state.token; //设置请求头
          config.headers['token'] =  sessionStorage.getItem('token'); //设置请求头
    }
    // Do something before request is sent 在发送请求之前做一些事情

    return config;
  },
  function(error) {
    // Do something with request error 使用请求错误执行某些操作
    return Promise.reject(error);
  }
);

// Add a response interceptor 添加一个响应拦截器
_axios.interceptors.response.use(
  function(response) {
    if (response.data.code == 218) {
      router.push('/')
      // this.$router.push('router.push({ path: 'home' })')
    }
    // Do something with response data 处理响应数据
    return response;

  },
  function(error) {
    if(error){
      // 执行自定义错误回调
      return Promise.reject(error);
    }else{
        // 错误提示
        Vue.$Message.error(error.msg);
    }
    // Do something with response error 处理响应错误
  }
);

Plugin.install = function(Vue, options) {
  Vue.axios = _axios;
  window.axios = _axios;
  Object.defineProperties(Vue.prototype, {
    axios: {
      get() {
        return _axios;
      }
    },
    $axios: {
      get() {
        return _axios;
      }
    },
  });
};

Vue.use(Plugin)

export default Plugin;
