import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const initialWeatherForecast = {
  location: {
    woeid: 2132574,
    city: 'Hangzhou',
    region: 'Zhejiang',
    'country': 'China',
    'lat': 30.252501,
    'long': 120.165024,
    'timezone_id': 'Asia/Shanghai'
  },
  current_observation: {
    'wind': {
      'chill': 79,
      'direction': 90,
      'speed': 5.59
    },
    'atmosphere': {
      'humidity': 57,
      'visibility': 10,
      'pressure': 29.71,
      'rising': 0
    },
    'astronomy': {
      'sunrise': '5:28 am',
      'sunset': '6:30 pm'
    },
    'condition': {
      'text': 'Partly Cloudy',
      'code': 30,
      'temperature': 79
    },
    'pubDate': 1555660800
  },
  forecasts: [
    {
      'day': 'Fri',
      'date': 1555603200,
      'low': 66,
      'high': 83,
      'text': 'Scattered Showers',
      'code': 39
    },
    {
      'day': 'Sat',
      'date': 1555689600,
      'low': 67,
      'high': 79,
      'text': 'Scattered Showers',
      'code': 39
    },
    {
      'day': 'Sun',
      'date': 1555776000,
      'low': 67,
      'high': 80,
      'text': 'Showers',
      'code': 11
    },
    {
      'day': 'Mon',
      'date': 1555862400,
      'low': 67,
      'high': 76,
      'text': 'Rain',
      'code': 12
    },
    {
      'day': 'Tue',
      'date': 1555948800,
      'low': 67,
      'high': 81,
      'text': 'Scattered Thunderstorms',
      'code': 47
    },
    {
      'day': 'Wed',
      'date': 1556035200,
      'low': 71,
      'high': 83,
      'text': 'Thunderstorms',
      'code': 4
    },
    {
      'day': 'Thu',
      'date': 1556121600,
      'low': 70,
      'high': 85,
      'text': 'Mostly Cloudy',
      'code': 28
    },
    {
      'day': 'Fri',
      'date': 1556208000,
      'low': 69,
      'high': 82,
      'text': 'Thunderstorms',
      'code': 4
    },
    {
      'day': 'Sat',
      'date': 1556294400,
      'low': 65,
      'high': 77,
      'text': 'Mostly Cloudy',
      'code': 28
    },
    {
      'day': 'Sun',
      'date': 1556380800,
      'low': 67,
      'high': 77,
      'text': 'Scattered Thunderstorms',
      'code': 47
    }
  ]
};

export default new Vuex.Store({
  state: {
    isLoading: true,
    visibleCards: {},
    selectedCities: [],
    activeCityData: {},
    addDialogVisible: false,
    daysOfWeek: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  mutations: {
    toggleAddDialog(state, visible) {
      state.addDialogVisible = visible;
    },
    updateSelectedCities(state, data) {
      if (Array.isArray(data)) {
        state.selectedCities = data;
      } else {
        state.selectedCities.push(data);
      }
    },
    updateForecastCard(state, data) {
      state.activeCityData = data;
    }
  },
  actions: {
    getForecast({ commit }, label) {
      const url = `http://tomo.club/api/forecast?location=${label}`;

      if ('caches' in window) {
        caches.match(url).then(response => {
          if (response) {
            response.json().then(json => {
              commit('updateForecastCard', json);
            });
          }
        });
      }

      const request = new XMLHttpRequest();
      request.onreadystatechange = () => {
        if (request.readyState === XMLHttpRequest.DONE && request.status === 200) {
          const response = JSON.parse(request.response);
          commit('updateForecastCard', response);
        } else {
          commit('updateForecastCard', initialWeatherForecast);
        }
      };

      request.open('GET', url);
      request.send();
    },
    updateForecasts({ dispatch, state }) {
      const keys = Object.keys(state.visibleCards);
      keys.forEach(key => {
        dispatch('getForecast', key);
      });
    },
    initApp({ dispatch, commit, state }) {
      const selectedCities = localStorage.selectedCities;
      if (selectedCities) {
        commit('updateSelectedCities', JSON.parse(selectedCities));

        state.selectedCities.forEach((city) => {
          dispatch('getForecast', city.label );
        });
      } else {
        commit('updateForecastCard', initialWeatherForecast);
        commit('updateSelectedCities', [{
          key: initialWeatherForecast.location.woeid,
          label: initialWeatherForecast.location.city
        }]);
        dispatch('saveSelectedCities');
      }
    },
    saveSelectedCities({ state }) {
      localStorage.selectedCities = JSON.stringify(state.selectedCities);
    },
    addCity({ dispatch, commit, state }, data) {
      if (!state.selectedCities) {
        commit('updateSelectedCities', [])
      }

      dispatch('getForecast', data.label);
      commit('updateSelectedCities', data);
      dispatch('saveSelectedCities');
      commit('toggleAddDialog', false);
    },
  }
});
