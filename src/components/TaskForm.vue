<script>
import { mapActions, mapState } from 'pinia';
import { useGlobalStore } from '../stores/global';

export default {
  data() {
    return {
      repo: '',
      releaseAsset: '',
      runCommand: '',
      containerImage: '',
      files: ''
    }
  },
  computed: {
    ...mapState(useGlobalStore, ['hasGithubAccessToken', 'repos'])
  },
  methods: {
    ...mapActions(useGlobalStore, ['fetchRepos', 'addTask']),
    submit() {
      const files = new FormData();
      for (const file of this.files) {
        files.append('additionalFiles', file);
      }
      const formData = {
        repo: this.repo._id,
        releaseAsset: this.releaseAsset,
        runCommand: this.runCommand,
        containerImage: this.containerImage
      };
      this.addTask(formData, files);
    },
    handleFileUploads(event) {
      this.files = event.target.files;
    }
  },
  async created() {
    await this.fetchRepos();
  }
}
</script>

<template>
  <form @submit.prevent="submit">
    <div class="mb-3">
      <label for="repo" class="form-label">Repository (from your watchlist)</label>
      <select v-model="repo" id="repo" class="form-select" aria-label="Select a repo from your watchlist">
        <option selected disabled hidden value="">Select a repo</option>
        <option v-for="repo in repos" :key="repo._id" :value="repo">{{ `${repo.ownerName}/${repo.name}` }}</option>
      </select>
    </div>
    <div class="mb-3">
      <label for="release-asset" class="form-label">Release Asset (of the above repo)</label>
      <select v-model="releaseAsset" id="release-asset" class="form-select"
        aria-label="Select a release asset from the repo" :disabled="!repo">
        <option selected disabled hidden value="">Select a release asset</option>
        <option v-for="asset in repo.latestReleaseAssets" :value="asset.name">{{ asset.name }}</option>
      </select>
    </div>
    <div class="mb-3">
      <label for="additional-files" class="form-label">Additional Files</label>
      <input @change="handleFileUploads($event)" class="form-control" type="file" id="additional-files" multiple>
    </div>
    <div class="mb-3">
      <label for="name" class="form-label">Run Command</label>
      <input v-model="runCommand" type="text" class="form-control" id="name">
    </div>
    <div class="mb-3">
      <label for="owner-name" class="form-label">Container Image</label>
      <input v-model="containerImage" type="text" class="form-control" id="owner-name">
    </div>
    <button type="submit" class="btn btn-primary">Add</button>
    <RouterLink to="/">
      <button type="button" class="btn btn-secondary ms-3">Cancel</button>
    </RouterLink>
  </form>
</template>