<template>
  <div class="card cardTemplate weather-forecast" hidden>
    <div class="city-key" hidden></div>
    <div class="card-last-updated" hidden></div>
    <div class="location"></div>
    <div class="date"></div>
    <div class="description"></div>
    <div class="current">
      <div class="visual">
        <div class="icon"></div>
        <div class="temperature">
          <span class="value"></span><span class="scale">°F</span>
        </div>
      </div>
      <div class="description">
        <div class="humidity"></div>
        <div class="wind">
          <span class="value"></span>
          <span class="scale">mph</span>
          <span class="direction"></span>°
        </div>
        <div class="sunrise"></div>
        <div class="sunset"></div>
      </div>
    </div>
    <div class="future">
      <div class="oneday">
        <div class="date"></div>
        <div class="icon"></div>
        <div class="temp-high">
          <span class="value"></span>°
        </div>
        <div class="temp-low">
          <span class="value"></span>°
        </div>
      </div>
      <div class="oneday">
        <div class="date"></div>
        <div class="icon"></div>
        <div class="temp-high">
          <span class="value"></span>°
        </div>
        <div class="temp-low">
          <span class="value"></span>°
        </div>
      </div>
      <div class="oneday">
        <div class="date"></div>
        <div class="icon"></div>
        <div class="temp-high">
          <span class="value"></span>°
        </div>
        <div class="temp-low">
          <span class="value"></span>°
        </div>
      </div>
      <div class="oneday">
        <div class="date"></div>
        <div class="icon"></div>
        <div class="temp-high">
          <span class="value"></span>°
        </div>
        <div class="temp-low">
          <span class="value"></span>°
        </div>
      </div>
      <div class="oneday">
        <div class="date"></div>
        <div class="icon"></div>
        <div class="temp-high">
          <span class="value"></span>°
        </div>
        <div class="temp-low">
          <span class="value"></span>°
        </div>
      </div>
      <div class="oneday">
        <div class="date"></div>
        <div class="icon"></div>
        <div class="temp-high">
          <span class="value"></span>°
        </div>
        <div class="temp-low">
          <span class="value"></span>°
        </div>
      </div>
      <div class="oneday">
        <div class="date"></div>
        <div class="icon"></div>
        <div class="temp-high">
          <span class="value"></span>°
        </div>
        <div class="temp-low">
          <span class="value"></span>°
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      spinner: document.querySelector('.loader'),
      cardTemplate: document.querySelector('.cardTemplate'),
      container: document.querySelector('.main'),
    };
  },
  methods: {
    updateForecastCard({ state }, data) {
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
  }
}
</script>

<style>
.card {
  padding: 16px;
  position: relative;
  box-sizing: border-box;
  background: #fff;
  border-radius: 2px;
  margin: 16px;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
}

.weather-forecast .location {
  font-size: 1.75em;
}

.weather-forecast .date,
.weather-forecast .description {
  font-size: 1.25em;
}

.weather-forecast .current {
  display: flex;
}

.weather-forecast .current .icon {
  width: 128px;
  height: 128px;
}

.weather-forecast .current .visual {
  display: flex;
  font-size: 4em;
}

.weather-forecast .current .visual .scale {
  font-size: 0.5em;
  vertical-align: super;
}

.weather-forecast .current .visual,
.weather-forecast .current .description {
  flex-grow: 1;
}

.weather-forecast .current .description div:before {
  display: block;
}

.weather-forecast .current .sunset:before {
  content: "Sunset: ";
  color: #888;
}

.weather-forecast .current .wind:before {
  content: "Wind: ";
  color: #888;
}

.weather-forecast .current .sunrise:before {
  content: "Sunrise: ";
  color: #888;
}

.weather-forecast .current .humidity:before {
  content: "Humidity: ";
  color: #888;
}

.weather-forecast .current .pollen:before {
  content: "Pollen Count: ";
  color: #888;
}

.weather-forecast .current .pcount:before {
  content: "Pollen ";
  color: #888;
}

.weather-forecast .future {
  display: flex;
}

.weather-forecast .future .oneday {
  flex-grow: 1;
  text-align: center;
}

.weather-forecast .future .oneday .icon {
  width: 64px;
  height: 64px;
  margin-left: auto;
  margin-right: auto;
}

.weather-forecast .future .oneday .temp-high,
.weather-forecast .future .oneday .temp-low {
  display: inline-block;
}

.weather-forecast .future .oneday .temp-low {
  color: #888;
}

.weather-forecast .icon {
  background-repeat: no-repeat;
  background-size: contain;
}

.weather-forecast .icon.clear-day {
  background-image: url("../assets/images/clear.png");
}

.weather-forecast .icon.clear-night {
  background-image: url("../assets/images/clear.png");
}

.weather-forecast .icon.rain {
  background-image: url("../assets/images/rain.png");
}

.weather-forecast .icon.snow {
  background-image: url("../assets/images/snow.png");
}

.weather-forecast .icon.sleet {
  background-image: url("../assets/images/sleet.png");
}

.weather-forecast .icon.windy {
  background-image: url("../assets/images/wind.png");
}

.weather-forecast .icon.fog {
  background-image: url("../assets/images/fog.png");
}

.weather-forecast .icon.cloudy {
  background-image: url("../assets/images/cloudy.png");
}

.weather-forecast .icon.partly-cloudy-day {
  background-image: url("../assets/images/partly-cloudy.png");
}

.weather-forecast .icon.partly-cloudy-night {
  background-image: url("../assets/images/partly-cloudy.png");
}

.weather-forecast .icon.thunderstorms {
  background-image: url("../assets/images/thunderstorm.png");
}

@media (max-width: 450px) {
  .weather-forecast .date,
  .weather-forecast .description {
    font-size: 0.9em;
  }

  .weather-forecast .current .icon {
    width: 96px;
    height: 96px;
  }

  .weather-forecast .current .visual {
    font-size: 3em;
  }

  .weather-forecast .future .oneday .icon {
    width: 32px;
    height: 32px;
  }
}
</style>
