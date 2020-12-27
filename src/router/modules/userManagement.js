import Layout from '@/layout'

const userModuleRouter = {
    path:'/userManagement',
    component:Layout,
    redirect:'noredirect',
    name:'userManagement',
    meta:{
            title: '用户管理模块',
            icon: 'userManagement'
          
    },
    children:[
        {
            path: 'UserManagement',
            component: () => import('@/views/userModule/UserManagement'),
            name: 'UserManagement',
            //menus: 'AnnualFeeConfig',
            meta: { title: '系统用户管理' },
            hidden: false
          },
          {
            path: 'RoleManagement',
            component: () => import('@/views/userModule/RoleManagement'),
            name: 'RoleManagement',
            //menus: 'AnnualFeeConfig',
            meta: { title: '系统角色管理' },
            hidden: false
          }
    ]
}

export default userModuleRouter