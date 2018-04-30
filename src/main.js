import Vue from 'vue'
import App from './App.vue'
import Sentence from './components/Sentence.vue'
import Options from './components/Options.vue'
import PredReg from './components/PredReg.vue'
import PredClf from './components/PredClf.vue'
import PredMultiClf from './components/PredMultiClf.vue'
import BootstrapVue from 'bootstrap-vue'
// import Icon from 'vue-awesome/icons'

import _ from 'lodash/core';
import ml from './mixins/ml';
// import domtoimage from 'dom-to-image';
window.domtoimage = require('dom-to-image');

// import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'bootswatch/dist/cosmo/bootstrap.min.css'
import 'font-awesome/css/font-awesome.css'
import './assets/css/simple-sidebar.css'

Vue.use(BootstrapVue);

// My Mixins
Vue.mixin(ml);


// My components
Vue.component("app-sentence", Sentence);
Vue.component("app-options", Options);
Vue.component("app-prediction-classification", PredClf);
Vue.component("app-prediction-multi-classification", PredMultiClf);
Vue.component("app-prediction-regression", PredReg);

// Third-party components
// Vue.component('icon', Icon);

new Vue({
  el: '#app',
  render: h => h(App)
});
