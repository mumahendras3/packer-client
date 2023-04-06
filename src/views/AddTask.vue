<script>
import TaskForm from '../components/TaskForm.vue';

export default {
  components: {
    TaskForm
  }
}
</script>

<template>
  <div class="container my-5">
    <div class="row mb-5">
      <div class="col">
        <h1 class="text-center my-0">Add a New Task</h1>
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col-10 col-md-8 col-lg-6">
        <TaskForm />
      </div>
    </div>
  </div>
</template>