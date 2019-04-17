import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLoading: true,
    visibleCards: {},
    selectedCities: [],
    spinner: document.querySelector('.loader'),
    cardTemplate: document.querySelector('.cardTemplate'),
    container: document.querySelector('.main'),
    addDialogVisible: false,
    daysOfWeek: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  mutations: {
    toggleAddDialog(state, visible) {
      state.addDialog = visible;
    },
    updateForecastCard(state, data) {
      var dataLastUpdated = new Date(data.created);
      var sunrise = data.channel.astronomy.sunrise;
      var sunset = data.channel.astronomy.sunset;
      var current = data.channel.item.condition;
      var humidity = data.channel.atmosphere.humidity;
      var wind = data.channel.wind;

      var card = state.visibleCards[data.key];
      if (!card) {
        card = state.cardTemplate.cloneNode(true);
        card.classList.remove('cardTemplate');
        card.querySelector('.location').textContent = data.label;
        card.removeAttribute('hidden');
        state.container.appendChild(card);
        state.visibleCards[data.key] = card;
      }

      // Verifies the data provide is newer than what's already visible
      // on the card, if it's not bail, if it is, continue and update the
      // time saved in the card
      var cardLastUpdatedElem = card.querySelector('.card-last-updated');
      var cardLastUpdated = cardLastUpdatedElem.textContent;
      if (cardLastUpdated) {
        cardLastUpdated = new Date(cardLastUpdated);
        // Bail if the card has more recent data then the data
        if (dataLastUpdated.getTime() < cardLastUpdated.getTime()) {
          return;
        }
      }
      cardLastUpdatedElem.textContent = data.created;

      card.querySelector('.description').textContent = current.text;
      card.querySelector('.date').textContent = current.date;
      card.querySelector('.current .icon').classList.add(state.getIconClass(current.code));
      card.querySelector('.current .temperature .value').textContent =
        Math.round(current.temp);
      card.querySelector('.current .sunrise').textContent = sunrise;
      card.querySelector('.current .sunset').textContent = sunset;
      card.querySelector('.current .humidity').textContent =
        Math.round(humidity) + '%';
      card.querySelector('.current .wind .value').textContent =
        Math.round(wind.speed);
      card.querySelector('.current .wind .direction').textContent = wind.direction;
      var nextDays = card.querySelectorAll('.future .oneday');
      var today = new Date();
      today = today.getDay();
      for (var i = 0; i < 7; i++) {
        var nextDay = nextDays[i];
        var daily = data.channel.item.forecast[i];
        if (daily && nextDay) {
          nextDay.querySelector('.date').textContent =
            state.daysOfWeek[(i + today) % 7];
          nextDay.querySelector('.icon').classList.add(state.getIconClass(daily.code));
          nextDay.querySelector('.temp-high .value').textContent =
            Math.round(daily.high);
          nextDay.querySelector('.temp-low .value').textContent =
            Math.round(daily.low);
        }
      }
      if (state.isLoading) {
        state.spinner.setAttribute('hidden', true);
        state.container.removeAttribute('hidden');
        state.isLoading = false;
      }
    },
  },
  actions: {
    getForecast({ commit }, key, label) {
      var statement = 'select * from weather.forecast where woeid=' + key;
      var url = 'https://query.yahooapis.com/v1/public/yql?format=json&q=' +
          statement;
      // add cache logic here
      if ('caches' in window) {
        caches.match(url).then(function(response) {
          if (response) {
            response.json().then(function updateFromCache(json) {
              var results = json.query.results;
              results.key = key;
              results.label = label;
              results.created = json.query.created;
              commit('updateForecastCard', results);
            });
          }
        });
      }
      // Fetch the latest data.
      var request = new XMLHttpRequest();
      request.onreadystatechange = function() {
        if (request.readyState === XMLHttpRequest.DONE) {
          if (request.status === 200) {
            var response = JSON.parse(request.response);
            var results = response.query.results;
            results.key = key;
            results.label = label;
            results.created = response.query.created;
            commit('updateForecastCard', results);
          }
        } else {
          // Return the initial weather forecast since no data is available.
          commit('updateForecastCard', initialWeatherForecast);
        }
      };
      request.open('GET', url);
      request.send();
    },
  }
});
