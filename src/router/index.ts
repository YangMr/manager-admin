import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Login from '../views/login.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/',
    name: 'layout',
    redirect: '/dashboard',
    component: () => import('@/layout/Layout.vue'),
    children: [
      {
        path: 'dashboard',
        name: 'dashboard',
        component: () => import('@/views/index/index.vue'),
        meta: {
          title: '首页'
        }
      }
      // {
      //   path: 'sysUserList',
      //   name: 'sysUserList',
      //   component: () => import('@/views/system/user/list.vue'),
      //   meta: {
      //     title: '员工管理'
      //   }
      // },
      // {
      //   path: 'sysRoleList',
      //   name: 'sysRoleList',
      //   component: () => import('@/views/system/role/list.vue'),
      //   meta: {
      //     title: '角色管理'
      //   }
      // },
      // {
      //   path: 'sysMenuList',
      //   name: 'sysMenuList',
      //   component: () => import('@/views/system/menu/list.vue'),
      //   meta: {
      //     title: '、权限管理'
      //   }
      // }
    ]
  }
]
// 静态路由  写死的路由

// 动态路由  动态添加的路由

// router.addRoutes

// 1. 直接将后台返回的菜单数据转化为路由表数据, 然后通过router.addRoutes进行动态路由添加

// 2. 前端自定义一份路由表, 根据后端返回的菜单数据匹配出对应的路由, 然后动态的添加到路由表中

const asyncRoutes = [
  {
    path: 'sysUserList',
    name: 'sysUserList',
    component: () => import('@/views/system/user/list.vue'),
    meta: {
      title: '系统管理/员工管理'
    }
  },
  {
    path: 'sysRoleList',
    name: 'sysRoleList',
    component: () => import('@/views/system/role/list.vue'),
    meta: {
      title: '系统管理/角色管理'
    }
  },
  {
    path: 'sysMenuList',
    name: 'sysMenuList',
    component: () => import('@/views/system/menu/list.vue'),
    meta: {
      title: '系统管理/权限管理'
    }
  }
]

// 定义一个方法,来处理当前登录用户所拥有的路由, 并添加到动态路由表中
export const addAsyncRoutes = (menu: any) => {
  let routerStatus = false
  function deepRoutes(arr: any) {
    // 根据用户所拥有的菜单匹配出当前用户所拥有的路由
    arr.forEach((item: any) => {
      const route = asyncRoutes.find((v) => '/' + v.path === item.path)

      if (item.children && item.children.length > 0) {
        deepRoutes(item.children)
      }

      if (route && !router.hasRoute(route.path)) {
        router.addRoute('layout', route)
        routerStatus = true
      }
    })
  }
  // return 阻止元素默认行为 设置返回值  阻止继续往下执行

  deepRoutes(menu)
  return routerStatus
}

const router = createRouter({
  history: createWebHashHistory(),
  routes
})
import { getToken } from '../utils/auth'
import store from '../store'
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

export default router
