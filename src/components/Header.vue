<template>
  <header class="header">
    <h1 class="header__title">Weather PWA</h1>
    <button id="butRefresh" class="headerButton" aria-label="Refresh" @click="updateForecasts"></button>
    <button id="butAdd" class="headerButton" aria-label="Add" @click="toggleAddDialog(true)"></button>
  </header>
</template>
<script>
export default {
  methods: {
    updateForecasts() {
      var keys = Object.keys(app.visibleCards);
      keys.forEach(function(key) {
        app.getForecast(key);
      });
    },
    toggleAddDialog(visible) {
      if (visible) {
        app.addDialog.classList.add('dialog-container--visible');
      } else {
        app.addDialog.classList.remove('dialog-container--visible');
      }
    }
  }
}
</script>
