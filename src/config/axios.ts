import axios from 'axios';

const appID = "VmDm4aHJU58WZxFFB6HuvAiK"
const appSecret = "K1KGVbs3bHWn7UtWcRMxaxhg"

const instance = axios.create({
  baseURL: 'https://gp-server.hunger-valley.com/',
  headers: {
    't-app-id': appID,
    't-app-secret': appSecret
  }
});

// Add a request interceptor
instance.interceptors.request.use(function (config) {
  const xToken = localStorage.getItem('x-token')
  if(config.headers && xToken){
    config.headers['Authorization'] = `Bearer ${xToken}`
  }
  return config;
}, function (error) {
  console.error(error)
  return Promise.reject(error);
});

// Add a response interceptor
instance.interceptors.response.use(function (response) {
  // Do something with response data
  if(response.headers['x-token']){
    localStorage.setItem('x-token',response.headers['x-token'])
  }
  return response;
}, function (error) {
  console.log('响应拦截器')
  if(error.response.status === 401){
    console.log('重定向')
    window.location.href = '/#login'
  }
  return Promise.reject(error);
});

export default instance