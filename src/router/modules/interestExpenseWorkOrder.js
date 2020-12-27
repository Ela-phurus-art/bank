import Layout from '@/layout'

const interestExpenseWorkOrderRouter = {
  path: '/interestExpenseWorkOrder',
  component: Layout,
  redirect: 'noRedirect',
  name: 'interestExpenseWorkOrder',
  // menus: 'interestExpenseWorkOrder',
  meta: {
    title: '息费工单',
    icon: 'skill'
  },
  children: [
    {
      path: 'InterestStandardWorkOrder',
      component: () => import('@/views/interestExpenseWorkOrder/InterestStandardWorkOrder'),
      name: 'InterestStandardWorkOrder',
      // menus: 'resourceManage',
      meta: { title: '息费标准申请' },
      hidden: false
    },
    {
      path: 'InterestExpenseLaborSingleWorkOrder',
      component: () => import('@/views/interestExpenseWorkOrder/InterestExpenseLaborSingleWorkOrder'),
      name: 'AnnualLaborSingleWorkOrder',
      // menus: 'resourceManage',
      meta: { title: '息费人工单笔申请' },
      hidden: false
    },
    {
      path: 'InterestExpenseManualBatchWorkOrder',
      component: () => import('@/views/interestExpenseWorkOrder/InterestExpenseManualBatchWorkOrder'),
      name: 'InterestExpenseManualBatchWorkOrder',
      // menus: 'resourceManage',
      meta: { title: '息费人工批量申请' },
      hidden: false
    }
  ]
}

export default interestExpenseWorkOrderRouter
