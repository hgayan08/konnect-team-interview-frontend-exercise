<template>
  <div class="spinner" />
</template>

<style lang="scss" scoped>
.spinner {
  animation: spin 1s linear infinite;
  border: 3px solid #f3f3f3;
  border-radius: 50%;
  border-top: 3px solid #073382;
  height: 50px;
  margin: 100px auto;
  width: 50px;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
