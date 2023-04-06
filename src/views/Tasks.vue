<script>
import { mapActions, mapState } from 'pinia';
import { useGlobalStore } from '../stores/global';
import TaskFormReadOnly from '../components/TaskFormReadOnly.vue';
import Modal from '../components/Modal.vue';
let taskLogsModal;

export default {
  data() {
    return {
      logs: ''
    }
  },
  computed: {
    ...mapState(useGlobalStore, ['tasks', 'repos'])
  },
  methods: {
    ...mapActions(useGlobalStore, ['fetchTasks', 'fetchRepos']),
    showLogs(logs) {
      this.logs = logs;
      taskLogsModal.show();
    }
  },
  async created() {
    await this.fetchRepos();
    await this.fetchTasks();
  },
  components: { TaskFormReadOnly, Modal },
  mounted() {
    taskLogsModal = new bootstrap.Modal('#task-logs');
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
      <div v-for="task in tasks" :key="task._id" class="col-auto">
        <TaskFormReadOnly @show-logs="showLogs" :task="task" />
      </div>
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
        <RouterLink v-if="repos.length" to="/add-task">
          <button type="button" class="btn btn-success">Add a new task</button>
        </RouterLink>
        <button v-else type="button" class="btn btn-success" disabled>Add a new task</button>
      </div>
    </div>
  </template>
  <Modal>
    <pre>{{ logs }}</pre>
  </Modal>
</template>