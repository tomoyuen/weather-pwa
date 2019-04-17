import Vue from 'vue'
import App from './App.vue'
import store from './store'

Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')

// add service worker code here
if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('./service-worker.js')
    .then(function () {
      console.log('service worker registered');
    });
}

app.selectedCities = localStorage.selectedCities;
if (app.selectedCities) {
  app.selectedCities = JSON.parse(app.selectedCities);
  app.selectedCities.forEach(function(city) {
    app.getForecast(city.key, city.label);
  });
} else {
  app.updateForecastCard(initialWeatherForecast);
  app.selectedCities = [{
    key: initialWeatherForecast.key,
    label: initialWeatherForecast.label
  }];
  app.saveSelectedCities();
}
