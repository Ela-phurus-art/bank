import Layout from '@/layout'

const annualFeeWorkOrderRouter = {
  path: '/annualFeeWorkOrder',
  component: Layout,
  redirect: 'noRedirect',
  name: 'annualFeeWorkOrder',
  // menus: 'annualFeeWorkOrder',
  meta: {
    title: '年费工单',
    icon: 'list'
  },
  children: [
    {
      path: 'StandardWorkOrder',
      component: () => import('@/views/annualFeeWorkOrder/StandardWorkOrder'),
      name: 'StandardWorkOrder',
      // menus: 'resourceManage',
      meta: { title: '年费渠道申请' },
      hidden: false
    },
    {
      path: 'AnnualLaborSingleWorkOrder',
      component: () => import('@/views/annualFeeWorkOrder/AnnualLaborSingleWorkOrder'),
      name: 'AnnualLaborSingleWorkOrder',
      // menus: 'resourceManage',
      meta: { title: '年费人工单笔申请' },
      hidden: false
    },
    {
      path: 'AnnualFeeManualBatchWorkOrder',
      component: () => import('@/views/annualFeeWorkOrder/AnnualFeeManualBatchWorkOrder'),
      name: 'AnnualFeeManualBatchWorkOrder',
      // menus: 'resourceManage',
      meta: { title: '年费人工批量申请' },
      hidden: false
    }
  ]
}

export default annualFeeWorkOrderRouter
