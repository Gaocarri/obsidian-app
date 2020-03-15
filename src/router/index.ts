import Vue from 'vue'
import VueRouter from 'vue-router'

// 路由懒加载
const Money = () => import('../views/Money.vue')
const Add = () => import('../views/Add.vue')
const Statistics = () => import('../views/Statistics.vue')
const Tags = () => import('../views/Tags.vue')

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/money'
  },
  {
    path: '/money',
    component: Money
  },
  {
    path: '/add',
    component: Add
  },
  {
    path: '/statistics',
    component: Statistics
  },
  {
    path: '/tags',
    component: Tags
  }
]

const router = new VueRouter({
  routes
})

export default router
