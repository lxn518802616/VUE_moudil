import Vue from 'vue';
import './plugins/axios';
import App from './App.vue';
import router from './router';
import store from './store';
import './plugins/element.js';
import echarts from 'echarts';
import 'echarts/theme/macarons';
import FileSaver from 'file-saver';
import XLSX from 'xlsx';

Vue.config.productionTip = false;
Vue.prototype.$echarts = echarts;
Vue.prototype.$XLSX = XLSX;
Vue.prototype.$FileSaver = FileSaver;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
