<script>
import { mapActions, mapState } from 'pinia';
import { useGlobalStore } from '../stores/global';
import Card from '../components/Card.vue';

export default {
  computed: {
    ...mapState(useGlobalStore, ['tasks'])
  },
  methods: {
    ...mapActions(useGlobalStore, ['fetchTasks'])
  },
  async created() {
    await this.fetchTasks();
  }
}
</script>

<template>
  <div class="row mb-5">
    <div class="col">
      <h1 class="text-center my-0">Task List</h1>
    </div>
  </div>
  <template v-if="tasks.length">
    <div class="row justify-content-center justify-content-sm-start row-gap-5">
      <Card v-for="task in tasks" :key="task._id" :repo="task" />
    </div>
  </template>
  <template v-else>
    <div class="row mb-5">
      <div class="col">
        <h4 class="text-center text-muted my-0">No tasks found in the database</h4>
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col-auto">
        <RouterLink to="/add-task">
          <button type="button" class="btn btn-success">Add a new task</button>
        </RouterLink>
      </div>
    </div>
  </template>
</template>