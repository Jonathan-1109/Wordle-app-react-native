import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const API_URL = process.env.EXPO_PUBLIC_API_URL

const api = axios.create({
  baseURL: API_URL,
  timeout: 10000
});

let isRefreshing = false
let failedQueue = []

const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error)
    } else {
      prom.resolve(token)
    }
  })
  failedQueue = []
}

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject })
        }).then(token => {
          originalRequest.headers['Authorization'] = 'Bearer ' + token
          return api(originalRequest);
        }).catch(err => {
          return Promise.reject(err)
        })
      }

      originalRequest._retry = true
      isRefreshing = true

      try {
        const refreshToken = await AsyncStorage.getItem('refreshToken');
        const data = {
          refreshToken: refreshToken
        }
        const response = await axios.post(`${API_URL}/users/refresh`, data)
        const accessToken = response.data.accessToken

        await AsyncStorage.setItem('accessToken', accessToken);
        api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`
        originalRequest.headers['Authorization'] = `Bearer ${accessToken}`
        
        processQueue(null, accessToken);
        return api(originalRequest);
        
      } catch (refreshError) {
          processQueue(refreshError, null);
          await AsyncStorage.removeItem('accessToken')
          await AsyncStorage.removeItem('refreshToken')
          return Promise.reject(refreshError)
      } finally {
          isRefreshing = false
      }
    }

    return Promise.reject(error)
  }
);

const init = async () => {
  const token = await AsyncStorage.getItem('accessToken')
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`
  }
}

init()
export default api;