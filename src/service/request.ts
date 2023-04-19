import axios from 'axios'
import { getToken, removeToken, removeMenu, removeUserId } from '@/utils/auth'
import store from '../store'
import router from '../router'
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 3000
})

service.interceptors.request.use(
  (config) => {
    const token = getToken()
    if (token) config.headers.token = token
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  (res) => {
    console.log('Res=>', res)
    if (res.status === 200) {
      if (res.data.code === 600) {
        store.commit('SET_TOKEN', '')
        store.commit('SET_USER_INFO', '')
        store.commit('SET_MENU', [])
        removeToken()
        removeMenu()
        removeUserId()
        router.push('/login')
      }
    }
    return res.data.data
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default service
