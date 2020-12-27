import Layout from '@/layout'

const journalModuleRouter = {
    path:'/journalModule',
    component:Layout,
    redirect:'noredirect',
    name:'journalModule',
    meta:{
            title: '日志模块',
            icon: 'journal'
          
    },
    children:[
        {
            path: 'RightOutRequest',
            component: () => import('@/views/journalModule/RightOutRequest'),
            name: 'RightOutRequest',
            //menus: 'AnnualFeeConfig',
            meta: { title: '对外接口请求日志' },
            hidden: false
          },
          {
            path: 'FieldRequest',
            component: () => import('@/views/journalModule/FieldRequest'),
            name: 'FieldRequest',
            //menus: 'AnnualFeeConfig',
            meta: { title: '外埠接口请求日志' },
            hidden: false
          },
          {
            path: 'BusinessJournal',
            component: () => import('@/views/journalModule/BusinessJournal'),
            name: 'BusinessJournal',
            //menus: 'AnnualFeeConfig',
            meta: { title: '业务操作日志' },
            hidden: false
          },
          {
            path: 'SystemJournal',
            component: () => import('@/views/journalModule/SystemJournal'),
            name: 'SystemJournal',
            //menus: 'AnnualFeeConfig',
            meta: { title: '系统登录日志' },
            hidden: false
          },
          {
            path: 'MailJournal',
            component: () => import('@/views/journalModule/MailJournal'),
            name: 'MailJournal',
            //menus: 'AnnualFeeConfig',
            meta: { title: '邮件发送日志' },
            hidden: false
          },
    ]
}

export default journalModuleRouter