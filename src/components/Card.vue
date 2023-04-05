<script>
import { mapActions, mapState } from 'pinia';
import { useGlobalStore } from '../stores/global';
export default {
  props: ['repo'],
  emits: ['refetch-data'],
  computed: {
    ...mapState(useGlobalStore, ['isLoggedIn'])
  },
  methods: {
    ...mapActions(useGlobalStore, ['deleteRepo']),
    generateRandomColor() {
      return randomColor();
    }
  }
}
</script>

<template>
  <div class="col-auto col-sm-6 col-lg-4">
    <div class="card shadow-sm" style="max-width: 18rem;">
      <div :style="{ 'background-color': generateRandomColor(), height: '4rem' }" class="card-img-top"></div>
      <div class="card-body">
        <h5 class="card-title">{{ repo.name }}</h5>
        <h6 class="card-subtitle mb-3 text-muted">{{ repo.ownerName }}</h6>
        <p class="card-text mb-2" :class="{ 'text-danger': repo.currentVersion !== repo.latestVersion }">
          Local version: {{ repo.currentVersion }}
        </p>
        <p v-if="repo.currentVersion !== repo.latestVersion" class="card-text mb-3 text-success">
          Upstream version: {{ repo.latestVersion }}
        </p>
        <p v-else class="card-text mb-3 text-success">
          Local version is up to date
        </p>
        <button @click="deleteRepo(repo._id)" type="button" class="btn btn-danger me-2">Delete</button>
      </div>
    </div>
  </div>
</template>