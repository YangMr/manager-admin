import { useCookies } from '@vueuse/integrations/useCookies'
const cookie = useCookies()
const TOKEN_KEY = 'token'
const MENU_KEY = 'menu'
const USER_ID_KEY = 'userId'

export const setToken = (token: string) => {
  cookie.set(TOKEN_KEY, token)
}

export const getToken = () => {
  return cookie.get(TOKEN_KEY)
}

export const removeToken = () => {
  cookie.remove(TOKEN_KEY)
}

export const setMenu = (menu: any) => {
  cookie.set(MENU_KEY, menu)
}

export const getLocalMenu = () => {
  return cookie.get(MENU_KEY)
}

export const removeMenu = () => {
  cookie.remove(MENU_KEY)
}

export const setUserId = (userId: string | number) => {
  cookie.set(USER_ID_KEY, userId)
}

export const getUserId = () => {
  return cookie.get(USER_ID_KEY)
}

export const removeUserId = () => {
  cookie.remove(USER_ID_KEY)
}
