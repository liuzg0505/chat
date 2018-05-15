// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import vueWebsocket from 'vue-websocket';
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import axios from 'axios';

Vue.use(iView);
Vue.prototype.$http = axios;
Vue.prototype.vueWebsocket = vueWebsocket;
Vue.use(vueWebsocket, "ws://otherserver:8080");


Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
});
