import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
const router = new Router({
  routes: [
    {
			path: '/home',
			name: 'home',
			component: resolve => require(['@/pages/Home'], resolve)
		},
		{
			path: '*',
			redirect: {
				path: '/home'
			}
		}
  ]
})
router.beforeEach((to, from, next) => {
  /*if (to.path == '/login') {
    sessionStorage.removeItem('user');
  }
  let user = JSON.parse(sessionStorage.getItem('user'));
  if (!user && to.path != '/login') {
    next({ path: '/login' })
  } else {
    next()
  }*/
  next()
})
export default router
