<script>
import { mapActions } from 'pinia';
import { useGlobalStore } from '../stores/global';

export default {
  props: ['task'],
  emits: ['show-logs'],
  data() {
    return {
      id: this.task._id,
      repo: this.task.repo,
      releaseAsset: this.task.releaseAsset,
      additionalFiles: this.task.additionalFiles,
      runCommand: this.task.runCommand,
      containerImage: this.task.containerImage,
      status: this.task.status
    }
  },
  methods: {
    ...mapActions(useGlobalStore, ['startTask', 'checkTask', 'getTaskLogs', 'deleteTask']),
    editTask() {
      // Not handled yet
    },
    async handleStartTask(id) {
      const success = await this.startTask(id);
      if (success)
        this.status = 'Running';
    },
    async handleGetTaskLogs(id) {
      const logs = await this.getTaskLogs(id);
      this.$emit('show-logs', logs);
    },
    async handleRefreshStatus(id) {
      const data = await this.checkTask(this.id);
      this.status = data.status;
    }
  }
}
</script>

<template>
  <form>
    <div class="mb-3">
      <label for="repo" class="form-label">Repository</label>
      <input type="text" readonly class="form-control" id="repo" :value="`${repo.ownerName}/${repo.name}`">
    </div>
    <div class="mb-3">
      <label for="release-asset" class="form-label">Release Asset</label>
      <input type="text" readonly class="form-control" id="release-asset" :value="releaseAsset">
    </div>
    <div class="mb-3">
      <label for="additional-files" class="form-label">Additional Files</label>
      <input class="form-control" type="text" readonly id="additional-files"
        :value="additionalFiles.length ? additionalFiles.map(file => file.name).join(', ') : '<none>'">
    </div>
    <div class="mb-3">
      <label for="name" class="form-label">Run Command</label>
      <input type="text" readonly class="form-control" id="name" :value="runCommand">
    </div>
    <div class="mb-3">
      <label for="owner-name" class="form-label">Container Image</label>
      <input type="text" readonly class="form-control" id="owner-name" :value="containerImage">
    </div>
    <button v-if="status === 'Created'" @click="handleStartTask(id)" type="button" class="btn btn-primary me-2">
      Start
    </button>
    <button v-else-if="status === 'Running'" @click="handleGetTaskLogs(id)" type="button" class="btn btn-warning me-2">
      {{ status }}
    </button>
    <button v-else-if="status === 'Failed'" @click="handleGetTaskLogs(id)" type="button" class="btn btn-danger me-2">
      {{ status }}
    </button>
    <button v-else-if="status === 'Succeeded'" @click="handleGetTaskLogs(id)" type="button" class="btn btn-success me-2">
      {{ status }}
    </button>
    <button v-if="status !== 'Running'" @click="deleteTask(id)" type="button" class="btn btn-danger me-2">Delete</button>
    <button @click="handleRefreshStatus" type="button" class="btn btn-secondary">
      <i class="bi bi-arrow-clockwise"></i>
    </button>
  </form>
</template>