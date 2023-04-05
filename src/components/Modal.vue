<template>
  <!-- Modal -->
  <div class="modal fade" id="task-logs" tabindex="-1" aria-labelledby="task-logs-label" aria-hidden="true">
    <div class="modal-dialog modal-fullscreen">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="task-logs-label">Task Logs</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body terminal-output">
          <slot></slot>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.terminal-output {
  background-color: #0E1019;
  color: #FFFAF4;
}
</style>