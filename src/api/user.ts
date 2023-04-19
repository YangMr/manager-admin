import service from '../service/request'
import { loginType } from './type'
// 登录接口
export const login = (data: loginType) => {
  return service({
    url: '/user/login',
    method: 'POST',
    data
  })
}

// 获取用户信息接口
export const getInfo = (userId: string | number) => {
  return service({
    url: '/user/getInfo',
    method: 'GET',
    params: {
      userId
    }
  })
}

// 获取菜单接口
export const getMenu = () => {
  return service({
    url: '/user/getMenuList',
    method: 'GET'
  })
}

// 退出登录
export const logout = () => {
  return service({
    url: '/user/loginOut',
    method: 'POST'
  })
}
