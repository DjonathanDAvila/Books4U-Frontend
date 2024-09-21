<template>
  <v-app>
    <AppToolbar />
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import AppToolbar from './components/AppToolbar.vue'

export default {
  name: 'App',
  components: {
    AppToolbar
  }
}
</script>
