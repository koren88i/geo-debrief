import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false
if (!Object.entries)
  Object.entries = function( obj ){
    var ownProps = Object.keys( obj ),
        i = ownProps.length,
        resArray = new Array(i); // preallocate the Array

    while (i--)
      resArray[i] = [ownProps[i], obj[ownProps[i]]];
    return resArray;
  };

new Vue({
  render: h => h(App),
}).$mount('#app')
