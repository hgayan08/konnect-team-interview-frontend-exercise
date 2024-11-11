<template>
  <div class="page-pagination">
    <button
      :disabled="currentPage === 1"
      @click="goToPreviousPage"
    >
      <svg
        fill="none"
        height="9"
        viewBox="0 0 15 9"
        width="15"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0.845703 4.49609L4.64258 0.699219V3.8457H14.9434V5.14648H4.64258V8.29297L0.845703 4.49609Z"
          fill="#1456CB"
        />
      </svg>
    </button>
    <span><strong>{{ pageInfo.startToEnd }}</strong>
      {{ pageInfo.totalItems }}</span>
    <button
      :disabled="currentPage === totalPages"
      @click="goToNextPage"
    >
      <svg
        fill="none"
        height="9"
        viewBox="0 0 15 9"
        width="15"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M14.1543 4.49609L10.3574 0.699219V3.8457H0.0566406V5.14648H10.3574V8.29297L14.1543 4.49609Z"
          fill="#1456CB"
        />
      </svg>
    </button>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import type { PageMetaData } from '@/types/serviceTypes'

const poops = defineProps<{
  metadata: PageMetaData
}>()

const { totalItems, itemsPerPage, totalPages } = poops.metadata
const currentPage = ref(poops.metadata?.currentPage || 1)
const pageInfo = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage + 1
  const end = Math.min(start + itemsPerPage - 1, totalItems)
  return {
    startToEnd: `${start} to ${end}`,
    totalItems: ` of ${totalItems} services`,
  }
})

const goToPreviousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

const goToNextPage = () => {
  if (currentPage.value < totalPages) {
    currentPage.value++
  }
}
</script>

<style lang="scss" scoped>
.page-pagination {
  align-items: center;
  color: #3c4557;
  display: flex;
  font-size: 13px;
  font-weight: 500;
  gap: 22px;
  height: 44px;
  justify-content: center;
  margin-top: auto;
  opacity: 0.7;
  width: 100%;
  strong {
    font-weight: 600;
    opacity: 1;
  }
  button {
    border: 1px solid #a6c6ff;
    border-radius: 50%;
    cursor: pointer;
    height: 44px;
    width: 44px;
    &:disabled {
      border-color: #e0e0e1;
      cursor: not-allowed;
      svg path {
        fill: #e0e0e1;
      }
    }
  }
}
</style>
