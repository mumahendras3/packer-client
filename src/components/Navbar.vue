<script>
import { mapActions, mapState } from 'pinia';
import { useGlobalStore } from '../stores/global';

export default {
  methods: {
    ...mapActions(useGlobalStore, ['logout', 'checkUpdateAllRepos'])
  },
  computed: {
    ...mapState(useGlobalStore, ['isLoggedIn', 'repos', 'tasks'])
  }
}
</script>

<template>
  <nav class="navbar navbar-expand-md bg-dark py-3 sticky-top" aria-label="Navigation bar" data-bs-theme="dark">
    <div class="container-fluid">
      <button class="navbar-toggler collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#navbar"
        aria-controls="navbar" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="navbar-collapse d-md-flex collapse mt-3 mt-md-0" id="navbar" style="">
        <RouterLink to="/" class="navbar-brand col-md-3 me-0 web-logo">
          Packer
        </RouterLink>
        <ul class="navbar-nav col-md-6 justify-content-md-center">
          <li class="nav-item">
            <RouterLink to="/" class="nav-link" :class="{ active: $route.path === '/' }">
              Home
            </RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink to="/tasks" class="nav-link" :class="{ active: $route.path === '/tasks' }">
              Tasks
            </RouterLink>
          </li>
        </ul>
        <div class="d-md-flex col-md-3 justify-content-md-end mt-2 mt-md-0">
          <button v-if="$route.name === 'home'" type="button" class="btn btn-secondary" @click="checkUpdateAllRepos">
            <i class="bi bi-arrow-clockwise"></i>
          </button>
          <RouterLink to="/add-repo" v-if="$route.name === 'home' && repos.length">
            <button type="button" class="btn btn-success text-nowrap me-2 me-md-0 ms-md-2">
              Add a new repo
            </button>
          </RouterLink>
          <RouterLink to="/add-task" v-if="$route.name === 'tasks' && tasks.length">
            <button type="button" class="btn btn-success text-nowrap me-2 me-md-0 ms-md-2">
              Add a new task
            </button>
          </RouterLink>
          <RouterLink to="/register" v-if="$route.name === 'login'">
            <button type="button" class="btn btn-primary text-nowrap me-2 me-md-0 ms-md-2">
              Register
            </button>
          </RouterLink>
          <button v-if="isLoggedIn" @click="logout" class="btn btn-primary text-nowrap ms-md-2">
            Log Out
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>