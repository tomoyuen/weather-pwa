<template>
  <div :class="['dialog-container', visible && 'dialog-container--visible']">
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
        <button @click="addCity({ key: city, label: options[city] })">Add</button>
        <button @click="toggleAddDialog(false)">Cancel</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex';

export default {
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
  computed: mapState({
    visible: 'addDialogVisible',
  }),
  methods: {
    ...mapActions(['addCity']),
    ...mapMutations(['toggleAddDialog'])
  },
}
</script>

<style>
.dialog-container {
  background: rgba(0, 0, 0, 0.57);
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  pointer-events: none;
  will-change: opacity;
  transition: opacity 0.333s cubic-bezier(0, 0, 0.21, 1);
}

.dialog-container--visible {
  opacity: 1;
  pointer-events: auto;
}

.dialog {
  background: #fff;
  border-radius: 2px;
  box-shadow: 0 0 14px rgba(0, 0, 0, 0.24), 0 14px 28px rgba(0, 0, 0, 0.48);
  min-width: 280px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%) translateY(30px);
  transition: transform 0.333s cubic-bezier(0, 0, 0.21, 1) 0.05s;
}

.dialog > div {
  padding-left: 24px;
  padding-right: 24px;
}

.dialog-title {
  padding-top: 20px;
  font-size: 1.25em;
}

.dialog-body {
  padding-top: 20px;
  padding-bottom: 24px;
}

.dialog-body select {
  width: 100%;
  font-size: 2em;
}

.dialog-buttons {
  padding: 8px !important;
  float: right;
}
</style>
