import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AuthorizationView from '../views/AuthorizationView.vue'
import RepositoryView from '@/views/RepositoryView.vue'
import EditVersionView from '@/views/EditVersionView.vue'
import CreateVersionView from '@/views/CreateVersionView.vue'
import CreateRepositoryView from '@/views/CreateRepositoryView.vue'
import EditRepositoryView from '@/views/EditRepositoryView.vue'
import ErrorView from '@/views/ErrorView.vue'
import { idRegex, storeActions } from '@/configuration'
import RepositoryDataService from '@/services/RepositoryDataService'
import { navigationStore } from '@/store/modules/navigation'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: AuthorizationView
    },
    {
      path: '/home',
      name: 'home',
      alias: '/',
      component: HomeView,
      meta: {requiresAuth: true},
    },
    {
      path: '/create',
      name: 'createrepository',
      component: CreateRepositoryView,
    },
    {
      path: `/:repoid(${idRegex})`,
      name: 'view',
      component: RepositoryView,
      props: true,
      meta: {requiresAuth: true},
    },
    {
      path: `/edit/:repoid(${idRegex})`,
      name: 'edit',
      component: EditRepositoryView,
      props: true,
      meta: {requiresAuth: true},
    },
    {
      path: `/:repoid(${idRegex})/edit/:versionid(${idRegex})`,
      name: 'editversion',
      component: EditVersionView,
      props: true,
      meta: {requiresAuth: true},
    },
    {
      path: `/:repoid(${idRegex})/create/:parent(${idRegex})?`,
      name: 'createversion',
      component: CreateVersionView,
      props: true,
      meta: {requiresAuth: true},
    },
    {
      path: '/:id(\\d+)/:title?/:description?',
      name: 'error',
      component: ErrorView,
      props: true,
    },
    {
      path: '/:catchAll(.*)*',
      redirect: '/404'
    }
  ]
})
router.afterEach((to, from) => {
  console.log(to)
  if(to.name != 'error' && to.name != 'login')
    navigationStore.dispatch(storeActions.setPage,to.fullPath)
})
export default router
