import Vue from 'vue'
import VueRouter from 'vue-router'

// 路由懒加载
const Money = () => import('../views/Money.vue')
const EditLabel = () => import('../views/EditLabel.vue')
const Add = () => import('../views/Add.vue')
const Statistics = () => import('../views/Statistics.vue')
const Tags = () => import('../views/Tags.vue')
const NotFound = () => import('../views/NotFound.vue')


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
    path: '/money/editLabel/:number',
    component: EditLabel
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
  },
  {
    path: '*',
    component: NotFound
  }
]

const router = new VueRouter({
  routes
})

export default router
