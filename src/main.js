import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

//方便多次请求数据，Vue组件就可以使用this.axios
import axios from 'axios'
Vue.prototype.axios = axios;

Vue.filter('setWH',(url , arg)=>{
  return url.replace(/w\.h/,arg);
});

import Scroller from '../src/components/Scroller'
Vue.component('Scroller' , Scroller);

import Loading from '../src/components/Loading'
Vue.component('Loading' , Loading);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
