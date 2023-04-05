<script>
import Navbar from './components/Navbar.vue';

export default {
  components: {
    Navbar
  }
}
</script>

<template>
  <Navbar v-if="$route.name !== 'login' && $route.name !== 'register'" />
  <RouterView />
</template>