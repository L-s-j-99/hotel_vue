import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
// 这里是编写路由规则的，就是将组件添加进来

Vue.use(VueRouter)
const routes = [
  {
    /* 设置主页面 */
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/home',
    name: 'home',
    component: Home
  }
]

const router = new VueRouter({
  routes
})

/* 路由守卫 */
router.beforeEach((to, from, next) => {
  if (to.path === '/login') return next() /* 直接放行 */
  const token = sessionStorage.getItem('token')
  /* 当不存在session时，返回login页面 */
  if (token === null) {
    // eslint-disable-next-line no-undef
    next('login')
  }
  if (token !== null) return next() /* 当token不为空直接放行 */
})

export default router
