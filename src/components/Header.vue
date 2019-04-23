<template>
  <header class="header">
    <h1 class="header__title">Weather PWA</h1>
    <button class="headerButton refresh-btn" aria-label="Refresh" @click="updateForecasts"></button>
    <button class="headerButton add-btn" aria-label="Add" @click="toggleAddDialog(true)"></button>
  </header>
</template>
<script>
import { mapActions, mapMutations } from 'vuex';

export default {
  methods: {
    ...mapActions(['updateForecasts']),
    ...mapMutations(['toggleAddDialog']),
  }
}
</script>

<style>
.header {
  width: 100%;
  height: 56px;
  color: #fff;
  background: #3f51b5;
  position: fixed;
  font-size: 20px;
  box-shadow: 0 4px 5px 0 rgba(0, 0, 0, 0.14), 0 2px 9px 1px rgba(0, 0, 0, 0.12), 0 4px 2px -2px rgba(0, 0, 0, 0.2);
  padding: 16px 16px 0 16px;
  will-change: transform;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: stretch;
  align-content: center;
  transition: transform 0.233s cubic-bezier(0, 0, 0.21, 1) 0.1s;
  z-index: 1000;
}

.header .headerButton {
  width: 24px;
  height: 24px;
  text-indent: -30000px;
  overflow: hidden;
  opacity: 0.54;
  transition: opacity 0.333s cubic-bezier(0, 0, 0.21, 1);
  border: none;
  outline: none;
  cursor: pointer;
}

.header .refresh-btn {
  margin-right: 16px;
  background: url(../assets/images/ic_refresh_white_24px.svg) center center no-repeat;
}

.header .add-btn {
  background: url(../assets/images/ic_add_white_24px.svg) center center no-repeat;
}

.header__title {
  font-weight: 400;
  font-size: 20px;
  margin: 0;
  flex: 1;
}
</style>
