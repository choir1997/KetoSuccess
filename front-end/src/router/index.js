import Vue from 'vue'
import VueRouter from 'vue-router'
import SignupLogin from '../views/SignupLogin.vue'
import Create from '../components/Create.vue'
import MainPage from '../views/MainPage.vue'

Vue.use(VueRouter)

const routes = [{
  path: '/',
  name: 'MainPage',
  component: MainPage
},
{
  path: '/SignupLogin',
  name: 'SignupLogin',
  component: SignupLogin
  },
  {
    path: '/Create',
    name: 'Create',
    component: Create

  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
