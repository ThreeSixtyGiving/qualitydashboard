import Vue from 'vue';
import App from './App';
import router from './router';
import vueNumeralFilterInstaller from 'vue-numeral-filter';
import numeral from 'numeral';
import vSelect from 'vue-select';


numeral.register('locale', 'en-gb-custom', {
  delimiters: {
    thousands: ',',
    decimal: '.'
  },
  abbreviations: {
    thousand: 'k',
    million: 'm',
    billion: 'bn',
    trillion: 't'
  },
  ordinal: function (number) {
    var b = number % 10;
    return (~~(number % 100 / 10) === 1) ? 'th' :
      (b === 1) ? 'st' :
        (b === 2) ? 'nd' :
          (b === 3) ? 'rd' : 'th';
  },
  currency: {
    symbol: '£'
  }
});

Vue.config.productionTip = false
Vue.use(vueNumeralFilterInstaller, { locale: 'en-gb-custom' });
Vue.component('v-select', vSelect)

new Vue({
  render: h => h(App),
  router,
  components: { App }
}).$mount('#app')
