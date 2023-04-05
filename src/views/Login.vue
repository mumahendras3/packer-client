<script>
import { mapActions } from 'pinia';
import UserForm from '../components/UserForm.vue';
import { useGlobalStore } from '../stores/global';
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
    <!-- <div class="row justify-content-center"> -->
      <!-- <div class="col-10 col-md-8 col-lg-6"> -->
        <!-- <div class="divider d-flex align-items-center my-4"> -->
          <!-- <p class="text-center fw-bold mx-3 mb-0 text-muted">OR</p> -->
        <!-- </div> -->
      <!-- </div> -->
    <!-- </div> -->
    <!-- <div class="row justify-content-center"> -->
      <!-- <div class="col-auto"> -->
        <!-- <GoogleLogin :callback="googleOauthCallback" /> -->
      <!-- </div> -->
    <!-- </div> -->
  </div>
</template>