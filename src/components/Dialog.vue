<template>
  <div class="dialog-container dialog-container--visible">
    <div class="dialog">
      <div class="dialog-title">Add new city</div>
      <div class="dialog-body">
        <select id="selectCityToAdd" v-model="city">
          <option v-for="(value, key) in options"
            :key="key"
            :value="key">
            {{ value }}
          </option>
        </select>
      </div>
      <div class="dialog-buttons">
        <button id="butAddCity" class="button" @click="addCity">Add</button>
        <button id="butAddCancel" class="button">Cancel</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    data() {
      return {
        city: '2487956',
        options: {
          2357536: 'Austin, TX',
          2367105: 'Boston, MA',
          2379574: 'Chicago, IL',
          2459115: 'New York, NY',
          2475687: 'Portland, OR',
          2487956: 'San Francisco, CA',
          2490383: 'Seattle, WA'
        },
      };
    },
    addCity() {
      const key = this.city;
      const label = this.options[key];
      // init the app.selectedCities array here
      if (!app.selectedCities) {
        app.selectedCities = [];
      }
      app.getForecast(key, label);
      // push the selected city to the array and save here
      app.selectedCities.push({key: key, label: label});
      app.saveSelectedCities();
      app.toggleAddDialog(false);
    }
  }
}
</script>
