import Vue from 'vue'
import Router from 'vue-router'
import SignUp from '@/components/SignUp'
import Login from '@/components/Login'
import VerifyMail from '@/components/Verify-email'
import Vuetify from 'vuetify'
import VeeValidate from 'vee-validate'
import VModal from 'vue-js-modal'

Vue.use(VeeValidate)
Vue.use(Vuetify)
Vue.use(Router)
Vue.use(VModal, { dialog: true })
export default new Router({
  routes: [
    {
      path: '/',
      name: 'SignUp',
      component: SignUp
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/verify',
      name: 'VerifyMail',
      component: VerifyMail
    }
  ]
})
