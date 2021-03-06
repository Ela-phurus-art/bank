import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'
import systemModuleRouter from './modules/systemModule'
import annualFeeWorkOrderRouter from './modules/annualFeeWorkOrder'
import interestExpenseWorkOrderRouter from './modules/interestExpenseWorkOrder'
import approvalModuleRouter from './modules/approvalModule'
import accountAdjustmentModuleRouter from './modules/accountAdjustmentModule'
import feedbackModuleRouter from './modules/feedbackModule'
import reportModuleRouter from './modules/reportModule'
import configModuleRouter from './modules/configModule'
import journalModuleRouter from './modules/journalModule'
import userModuleRouter from './modules/userManagement'
/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 */
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    meta: { title: '登录' },
    hidden: true
  },
  {
    path: '/thirdPartyLogin',
    component: () => import('@/views/thirdPartyLogin/ThirdPartyLogin'),
    meta: { title: '登录' },
    hidden: true
  },
  {
    path: '/404',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/404',
        meta: { title: '404' },
        component: () => import('@/views/error-page/404')
      }
    ]
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: '首页', icon: 'home', affix: true }
      }
    ]
  }
]

/**
 * asyncRoutes
 */

export const asyncRoutes = [
  annualFeeWorkOrderRouter,
  interestExpenseWorkOrderRouter,
  approvalModuleRouter,
  accountAdjustmentModuleRouter,
  feedbackModuleRouter,
  reportModuleRouter,
  systemModuleRouter,//系统模块
  configModuleRouter,//配置模块
  journalModuleRouter,
  userModuleRouter,
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]

const createRouter = () =>
  new Router({
    mode: 'history', // require service support
    base: '/xsb/',
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
  })

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
