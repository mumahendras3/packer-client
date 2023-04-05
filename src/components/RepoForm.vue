<script>
import { mapActions, mapState } from 'pinia';
import { useGlobalStore } from '../stores/global';

export default {
  props: ['action'],
  data() {
    return {
      name: '',
      ownerName: '',
      githubAccessToken: ''
    }
  },
  computed: {
    ...mapState(useGlobalStore, ['hasGithubAccessToken'])
  },
  methods: {
    ...mapActions(useGlobalStore, ['addRepo']),
    submit() {
      const formData = {
        name: this.name,
        ownerName: this.ownerName
      };
      // Save the github access token in local/session storage
      if (localStorage.access_token)
        localStorage.authorization = this.githubAccessToken;
      else if (sessionStorage.access_token)
        sessionStorage.authorization = this.githubAccessToken;
      this.addRepo(formData);
    }
  }
}
</script>

<template>
  <form @submit.prevent="submit">
    <div class="mb-3">
      <label for="name" class="form-label">Repository Name</label>
      <input type="text" class="form-control" id="name" v-model="name">
    </div>
    <div class="mb-3">
      <label for="owner-name" class="form-label">Repository Owner's Name</label>
      <input type="text" class="form-control" id="owner-name" v-model="ownerName">
    </div>
    <div v-if="!hasGithubAccessToken" class="mb-3">
      <label for="access-token" class="form-label">
        Github Personal Access Token <span class="text-muted">(Optional)</span>
      </label>
      <input type="password" class="form-control" id="access-token" v-model="githubAccessToken">
    </div>
    <button type="submit" class="btn btn-primary">Add</button>
    <RouterLink to="/">
      <button type="button" class="btn btn-secondary ms-3">Cancel</button>
    </RouterLink>
  </form>
</template>