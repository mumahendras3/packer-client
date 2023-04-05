<script>
import { mapActions, mapState } from 'pinia';
import { useGlobalStore } from '../stores/global';
import Card from '../components/Card.vue';
export default {
  components: {
    Card
  },
  computed: {
    ...mapState(useGlobalStore, ['repos'])
  },
  data() {
    return {
      title: '',
      isSearching: false,
      currentPage: 1,
      postCount: 6
    }
  },
  methods: {
    ...mapActions(useGlobalStore, ['fetchRepos'])
  },
  async created() {
    await this.fetchRepos();
  }
}
</script>

<template>
  <div class="row mb-5">
    <div class="col">
      <h1 class="text-center my-0">Repository Watchlist</h1>
    </div>
  </div>
  <template v-if="repos.length">
    <div class="row justify-content-center justify-content-sm-start row-gap-5">
      <Card v-for="repo in repos" :key="repo._id" :repo="repo" />
    </div>
  </template>
  <template v-else>
    <div class="row mb-5">
      <div class="col">
        <h4 class="text-center text-muted my-0">No repos found in your watchlist</h4>
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col-auto">
        <RouterLink to="/add-repo">
          <button type="button" class="btn btn-success">Add a new repo</button>
        </RouterLink>
      </div>
    </div>
  </template>
</template>