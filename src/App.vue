<template>
  <div id="app">
    <Header />
    <main>
      <Dialog />
    </main>
  </div>
</template>

<script>
import Header from './components/Header.vue';
import Dialog from './components/Dialog.vue';

export default {
  name: 'app',
  components: {
    Header,
    Dialog,
  }
}
</script>

<style>
* {
  box-sizing: border-box;
}

html,
body {
  padding: 0;
  margin: 0;
  height: 100%;
  width: 100%;
  font-family: 'Helvetica', 'Verdana', sans-serif;
  font-weight: 400;
  font-display: optional;
  color: #444;
  -moz-osx-font-smoothing: grayscale;
}

html {
  overflow: hidden;
}

body {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: stretch;
  align-content: stretch;
  background: #ececec;
}

.main {
  padding-top: 60px;
  flex: 1;
  overflow-x: hidden;
  overflow-y: auto;
}
</style>
