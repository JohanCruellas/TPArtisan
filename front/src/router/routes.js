
const routes = [
  {
    path: '/',
    name: 'Login',
    component: () => import('pages/LoginPage.vue')
  },
  {
    path: '/Main',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '', name: 'Main',
        component: () => import('pages/IndexPage.vue')
      },
      {
        path: 'Admin', name: 'Admin',
        component: () => import('pages/AdminPage.vue')
      },
      {
        path : 'Charts', name: 'Charts',
        component: () => import('pages/ChartsPage.vue')
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
