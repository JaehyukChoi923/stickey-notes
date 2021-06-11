import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import store from './store'
import movable from "v-movable"

Vue.config.productionTip = false

Vue.use(movable)

new Vue({
  vuetify,
  store,
  render: h => h(App)
}).$mount('#app')
