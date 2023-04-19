import router, { addAsyncRoutes } from './router'
import { getToken } from './utils/auth'
import store from './store'

router.beforeEach(async (to, from, next) => {
  const token = getToken()
  if (!token && to.path !== '/login') {
    return next('/login')
  }

  if (token && to.path === '/login') {
    return next(from.fullPath ? from.fullPath : '/')
  }
  let routerStatus = false
  if (token && !store.getters.getInfo) {
    await store.dispatch('getUserInfo')
    const menu = await store.dispatch('getMenuList')

    routerStatus = addAsyncRoutes(menu)
  }
  console.log(to)
  console.log(routerStatus)
  routerStatus ? next(to.fullPath) : next()
})
