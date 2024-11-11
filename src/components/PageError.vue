<template>
  <div class="page-error">
    <img
      alt="error"
      height="50"
      src="../assets/icons/icon-error.svg"
      width="50"
    >
    <p>Something went wrong</p>
    <button @click="$emit('retry')">
      Retry
    </button>
  </div>
</template>

<script lang="ts" setup>
defineEmits<{
  (event: 'retry'): void;
}>()
</script>

<style scoped lang="scss">
.page-error {
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  opacity: 0.7;

  p {
    font-size: 14px;
    padding: 5px 0;
  }
  button {
    background: transparent;
    border: 1px solid #b9babb;
    border-radius: 4px;
    cursor: pointer;
    padding: 5px 10px;
  }
}
</style>
