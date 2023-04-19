import { createStore } from 'vuex'
import { login, getInfo, getMenu, logout } from '../api/user'
import {
  getToken,
  setToken,
  removeToken,
  setMenu,
  getLocalMenu,
  removeMenu,
  setUserId,
  getUserId,
  removeUserId
} from '../utils/auth'
export default createStore({
  state: {
    token: getToken() || '',
    menu: getLocalMenu() || [],
    userId: getUserId() || '',
    userInfo: ''
  },
  getters: {
    getInfo(state) {
      return state.userInfo
    }
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token
      setToken(token)
    },
    SET_MENU(state, menu) {
      state.menu = menu
      setMenu(menu)
    },
    SET_USER_INFO(state, info) {
      state.userInfo = info
    },
    SET_USER_ID(state, userId) {
      state.userId = userId
      setUserId(userId)
    }
  },
  actions: {
    // login
    async login({ commit }, payload) {
      try {
        const res: any = await login(payload)
        if (!res) return
        commit('SET_TOKEN', res.token)
        commit('SET_USER_ID', res.userId)
        return res
      } catch (error) {
        console.log(error)
      }
    },
    // getUserInfo
    async getUserInfo({ state, commit }) {
      try {
        const res = await getInfo(state.userId)
        if (!res) return
        commit('SET_USER_INFO', res)
        return res
      } catch (error) {
        console.log(error)
      }
    },
    // getMenu
    async getMenuList({ commit }) {
      try {
        const res = await getMenu()
        if (!res) return
        commit('SET_MENU', res)
        return res
      } catch (error) {
        console.log(error)
      }
    },
    // loginOut
    async loginOut({ commit }) {
      try {
        const res = await logout()
        if (!res) return
        commit('SET_TOKEN', '')
        commit('SET_USER_INFO', {})
        commit('SET_MENU', [])
        removeToken()
        removeMenu()
        removeUserId()
        return res
      } catch (error) {
        console.log(error)
      }
    }
  }
})
