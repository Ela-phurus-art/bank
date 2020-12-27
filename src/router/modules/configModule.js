import Layout from '@/layout'

const configModuleRouter = {
    path:'/configModule',
    component:Layout,
    redirect:'noredirect',
    name:'configModule',
    meta:{
            title: '配置模块',
            icon: 'config'
          
    },
    children:[
          {
            path: 'AnnualFeeConfig',
            component: () => import('@/views/configModule/AnnualFeeConfig'),
            name: 'AnnualFeeConfig',
            //menus: 'AnnualFeeConfig',
            meta: { title: '年费审核规则配置' },
            hidden: false
          },
          {
            path: 'InterestExpenseConfig',
            component: () => import('@/views/configModule/InterestExpenseConfig'),
            name: 'InterestExpenseConfig',
           // menus: 'resourceManage',
            meta: { title: '息费审核规则配置' },
            hidden: false
          },
          {
            path: 'AnnualLimitConfig',
            component: () => import('@/views/configModule/AnnualLimitConfig'),
            name: 'AnnualLimitConfig',
           // menus: 'resourceManage',
            meta: { title: '年度限额设置' },
            hidden: false
          },
          {
            path: 'BasicConfig',
            component: () => import('@/views/configModule/BasicConfig'),
            name: 'BasicConfig',
            //menus: 'resourceManage',
            meta: { title: '基本配置' },
            hidden: false
          }
    ]

}

export default configModuleRouter