<script>
import Navbar from './components/Navbar.vue';

export default {
  components: {
    Navbar
  }
}
</script>

<template>
  <header class="mb-4 sticky-top">
    <Navbar />
  </header>
  <main class="container my-5">
    <RouterView />
  </main>
</template>