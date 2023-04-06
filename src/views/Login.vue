<script>
import UserForm from '../components/UserForm.vue';
export default {
  components: {
    UserForm
  },
  methods: {
    // ...mapActions(useGlobalStore, ['googleOauthCallback'])
  }
}
</script>

<template>
  <div class="container my-5">
    <div class="row mb-5">
      <div class="col">
        <h1 class="text-center my-0">Log In to <span class="web-logo">Packer</span></h1>
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col-10 col-md-8 col-lg-6">
        <UserForm action="login" />
      </div>
    </div>
  </div>
</template>