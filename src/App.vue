<template>
  <AppHeader />
  <main>
    <router-view />
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AppHeader from '@/components/AppHeader.vue'

export default defineComponent({
  name: 'App',
  components: {
    AppHeader,
  },
})
</script>

<style lang="scss">
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
html {
  font-size: 10px;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Inter', sans-serif;
  font-size: 1.6rem;
  font-weight: 400;
  line-height: 1.2;
  margin: 0 auto;
}
</style>
