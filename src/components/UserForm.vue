<script>
import { mapActions, mapState } from 'pinia';
import { useGlobalStore } from '../stores/global';

export default {
  props: ['action'],
  data() {
    return {
      email: '',
      password: '',
      rememberMe: false,
      githubAccessToken: ''
    }
  },
  computed: {
    ...mapState(useGlobalStore, ['newlyRegisteredUser'])
  },
  methods: {
    ...mapActions(useGlobalStore, ['register', 'login', 'resetNewlyRegisteredUser']),
    submit() {
      const formData = {
        email: this.email,
        password: this.password,
        rememberMe: this.rememberMe,
        githubAccessToken: this.githubAccessToken
      };
      if (this.action === 'register')
        return this.register(formData);
      this.login(formData);
    }
  },
  created() {
    this.email = this.newlyRegisteredUser ? this.newlyRegisteredUser.email : '';
    // newlyRegisteredUser is for one time use only so let's unset it
    this.resetNewlyRegisteredUser();
  }
}
</script>

<template>
  <form @submit.prevent="submit">
    <div class="mb-3">
      <label for="email" class="form-label">Email</label>
      <input type="email" class="form-control" id="email" v-model="email">
    </div>
    <div class="mb-3">
      <label for="password" class="form-label">Password</label>
      <input type="password" class="form-control" id="password" v-model="password">
    </div>
    <template v-if="action === 'login'">
      <div class="mb-3">
        <label for="access-token" class="form-label">
          Github Personal Access Token <span class="text-muted">(Optional)</span>
        </label>
        <input type="password" class="form-control" id="access-token" v-model="githubAccessToken">
      </div>
      <div class="mb-3 form-check">
        <input type="checkbox" class="form-check-input" id="remember-me" v-model="rememberMe">
        <label class="form-check-label" for="remember-me">Remember me</label>
      </div>
      <button type="submit" class="btn btn-primary">Log In</button>
    </template>
    <button v-else type="submit" class="btn btn-primary">Register</button>
    <RouterLink to="/">
      <button type="button" class="btn btn-secondary ms-3">Cancel</button>
    </RouterLink>
  </form>
</template>