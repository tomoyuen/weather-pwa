<template>
  <div class="card weather-forecast">
    <div class="city-key" hidden>{{data.location.woeid}}</div>
    <div class="card-last-updated" hidden>{{data.current_observation.pubDate}}</div>
    <div class="location">{{`${data.location.city},${data.location.region}`}}</div>
    <div class="date">{{new Date(data.current_observation.pubDate * 1000).toGMTString()}}</div>
    <div class="description">{{data.current_observation.condition.text}}</div>
    <div class="current">
      <div class="visual">
        <div :class="['icon', getIconClass(data.current_observation.condition.code)]"></div>
        <div class="temperature">
          <span class="value">{{Math.round(data.current_observation.condition.temperature)}}</span><span class="scale">°F</span>
        </div>
      </div>
      <div class="description">
        <div class="humidity">{{`${Math.round(data.current_observation.atmosphere.humidity)}%`}}</div>
        <div class="wind">
          <span class="value">{{Math.round(data.current_observation.wind.speed)}}</span>
          <span class="scale">mph</span>
          <span class="direction">{{data.current_observation.wind.direction}}</span>°
        </div>
        <div class="sunrise">{{data.current_observation.astronomy.sunrise}}</div>
        <div class="sunset">{{data.current_observation.astronomy.sunset}}</div>
      </div>
    </div>
    <div class="future">
      <div class="oneday" v-for="(item, index) in data.forecasts.slice(0, 7)"
        :key="index">
        <div class="date">{{item.day}}</div>
        <div :class="['icon', getIconClass(item.code)]"></div>
        <div class="temp-high">
          <span class="value">{{item.high}}</span>°
        </div>
        <div class="temp-low">
          <span class="value">{{item.low}}</span>°
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: Object,
  },
  methods: {
    getIconClass(weatherCode) {
      weatherCode = parseInt(weatherCode);
      switch (weatherCode) {
        case 25: // cold
        case 32: // sunny
        case 33: // fair (night)
        case 34: // fair (day)
        case 36: // hot
        case 3200: // not available
          return 'clear-day';
        case 0: // tornado
        case 1: // tropical storm
        case 2: // hurricane
        case 6: // mixed rain and sleet
        case 8: // freezing drizzle
        case 9: // drizzle
        case 10: // freezing rain
        case 11: // showers
        case 12: // showers
        case 17: // hail
        case 35: // mixed rain and hail
        case 40: // scattered showers
          return 'rain';
        case 3: // severe thunderstorms
        case 4: // thunderstorms
        case 37: // isolated thunderstorms
        case 38: // scattered thunderstorms
        case 39: // scattered thunderstorms (not a typo)
        case 45: // thundershowers
        case 47: // isolated thundershowers
          return 'thunderstorms';
        case 5: // mixed rain and snow
        case 7: // mixed snow and sleet
        case 13: // snow flurries
        case 14: // light snow showers
        case 16: // snow
        case 18: // sleet
        case 41: // heavy snow
        case 42: // scattered snow showers
        case 43: // heavy snow
        case 46: // snow showers
          return 'snow';
        case 15: // blowing snow
        case 19: // dust
        case 20: // foggy
        case 21: // haze
        case 22: // smoky
          return 'fog';
        case 24: // windy
        case 23: // blustery
          return 'windy';
        case 26: // cloudy
        case 27: // mostly cloudy (night)
        case 28: // mostly cloudy (day)
        case 31: // clear (night)
          return 'cloudy';
        case 29: // partly cloudy (night)
        case 30: // partly cloudy (day)
        case 44: // partly cloudy
          return 'partly-cloudy-day';
      }
    },
  }
}
</script>

<style lang="postcss">
.card {
  padding: 16px;
  position: relative;
  box-sizing: border-box;
  background: #fff;
  border-radius: 2px;
  margin: 16px;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
}

.weather-forecast {
  .location {
    font-size: 1.75em;
  }

  .date,
  .description {
    font-size: 1.25em;
  }

  .current {
    display: flex;

    .icon {
      width: 128px;
      height: 128px;
    }

    .visual {
      display: flex;
      font-size: 4em;

      .scale {
        font-size: 0.5em;
        vertical-align: super;
      }
    }

    .visual,
    .description {
      flex-grow: 1;
    }

    .description div::before {
      display: block;
    }

    .sunset:before {
      content: 'Sunset: ';
      color: #888;
    }

    .wind:before {
      content: 'Wind: ';
      color: #888;
    }

    .sunrise:before {
      content: 'Sunrise: ';
      color: #888;
    }

    .humidity:before {
      content: 'Humidity: ';
      color: #888;
    }

    .pollen:before {
      content: 'Pollen Count: ';
      color: #888;
    }

    .pcount:before {
      content: 'Pollen ';
      color: #888;
    }
  }

  .future {
    display: flex;

    .oneday {
      flex-grow: 1;
      text-align: center;

      .icon {
        width: 64px;
        height: 64px;
        margin-left: auto;
        margin-right: auto;
      }

      .temp-low {
        color: #888;
      }
    }
  }

  .icon {
    background-repeat: no-repeat;
    background-size: contain;

    &.clear-day {
      background-image: url(../assets/images/clear.png);
    }

    &.clear-night {
      background-image: url(../assets/images/clear.png);
    }

    &.rain {
      background-image: url(../assets/images/rain.png);
    }

    &.snow {
      background-image: url(../assets/images/snow.png);
    }

    &.sleet {
      background-image: url(../assets/images/sleet.png);
    }

    &.windy {
      background-image: url(../assets/images/wind.png);
    }

    &.fog {
      background-image: url(../assets/images/fog.png);
    }

    &.cloudy {
      background-image: url(../assets/images/cloudy.png);
    }

    &.partly-cloudy-day {
      background-image: url(../assets/images/partly-cloudy.png);
    }

    &.partly-cloudy-night {
      background-image: url(../assets/images/partly-cloudy.png);
    }

    &.thunderstorms {
      background-image: url(../assets/images/thunderstorm.png);
    }
  }

  @media screen and (max-width: 450px) {
    .date,
    .description {
      font-size: 0.9em;
    }

    .current {
      .icon {
        width: 96px;
        height: 96px;
      }

      .visual {
        font-size: 3em;
      }
    }

    .future {
      .oneday .icon {
        width: 32px;
        height: 32px;
      }
    }
  }
}
</style>
