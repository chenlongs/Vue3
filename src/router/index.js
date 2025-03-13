// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
// 路由懒加载设置
const search = () => import('@/views/searchView.vue')

const routes = [
  {
    path: '/search',
    name: 'search',
    component: search,
  },
  // 重定位，默认跳转到 /search
  {
    path: '/',
    redirect: '/search',
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
