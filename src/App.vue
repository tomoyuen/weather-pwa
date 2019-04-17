<template>
  <div id="app">
    <Header />
    <main>
      <h1>Hello World!</h1>
    </main>
  </div>
</template>

<script>
import Header from './components/Header.vue'

export default {
  name: 'app',
  components: {
    Header
  }
}
</script>
