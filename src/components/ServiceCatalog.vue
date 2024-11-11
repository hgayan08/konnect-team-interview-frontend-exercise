<template>
  <div class="main-container">
    <div class="service-catalog">
      <div class="catalog">
        <div class="tittle">
          <h1>Service Hub</h1>
          <p>
            Organize services, manage and track versioning and API service
            documentation. <span>Learn more</span>
          </p>
        </div>
        <div class="catalog-right">
          <div class="actions">
            <div class="search-bar">
              <img
                alt=""
                class="icon"
                height="20"
                src="../assets/icons/icon-search.svg"
                width="20"
              >
              <input
                v-model="searchQuery"
                placeholder="Search"
                type="text"
              >
            </div>
            <div class="action">
              <button @click="handleAddServicePackage">
                <img
                  alt="add service package"
                  src="../assets/icons/icon-add.svg"
                >Service Package
              </button>
            </div>
          </div>
          <div
            class="refresh"
            @click="retry"
          >
            <img
              alt="refresh"
              height="15px"
              src="../assets/icons/icon-refresh.svg"
              width="15px"
            >
          </div>
        </div>
      </div>
      <ServiceCard
        v-if="!loading && services.length"
        :services="visibleServices"
      />
      <PagePagination
        v-if="!loading && services.length"
        :metadata="pageMetaData"
      />
      <div
        v-if="!loading && !services.length && !error"
        class="mg-auto"
      >
        No Service found
      </div>
      <LoadingSpinner
        v-if="loading"
        class="mg-auto"
      />
      <PageError
        v-if="error"
        class="mg-auto"
        @retry="retry"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch, onMounted, computed } from 'vue'
import { useServices } from '@/composables/useServices'
import { useDebounce } from '@/composables/useDebounce'
import ServiceCard from '@/components/ServiceCard.vue'
import PagePagination from '@/components/PagePagination.vue'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import PageError from '@/components/PageError.vue'
import { fetchServices, searchService } from '@/service/serviceApi'
import type { ProcessedService } from '@/types/serviceTypes'

export default defineComponent({
  name: 'ServiceCatalog',
  components: {
    ServiceCard,
    PagePagination,
    LoadingSpinner,
    PageError,
  },
  setup() {
    const searchQuery = ref('')
    const services = ref<ProcessedService[]>([])
    const loading = ref(false)
    const error = ref(false)
    const currentPage = ref(1)
    const itemsPerPage = 9

    const fetchAndProcessServices = async (query: string = '') => {
      loading.value = true
      error.value = false
      try {
        const { data } = query
          ? await searchService(query)
          : await fetchServices()
        const { processedServices } = useServices(data)
        services.value = processedServices
      } catch (err) {
        console.error('Error fetching services:', err)
        error.value = true
      } finally {
        loading.value = false
      }
    }

    const debouncedSearchQuery = useDebounce(fetchAndProcessServices, 500)
    watch(searchQuery, (newQuery) => {
      currentPage.value = 1
      const trimmedQuery = newQuery.trim()
      if (typeof trimmedQuery === 'string') {
        debouncedSearchQuery(trimmedQuery)
      }
    })

    const visibleServices = computed(() => {
      const startIndex = (currentPage.value - 1) * itemsPerPage
      return services.value.slice(startIndex, startIndex + itemsPerPage)
    })

    const pageMetaData = computed(() => {
      return {
        totalItems: services.value.length,
        totalPages: Math.ceil(services.value.length / itemsPerPage),
        currentPage,
        itemsPerPage,
      }
    })

    const retry = () => {
      currentPage.value = 1
      fetchAndProcessServices()
    }

    const handleAddServicePackage = () => {
      console.log('Coming Soon!')
    }

    onMounted(() => {
      fetchAndProcessServices()
    })

    return {
      services,
      searchQuery,
      loading,
      error,
      visibleServices,
      pageMetaData,
      retry,
      handleAddServicePackage,
    }
  },
})
</script>

<style lang="scss" scoped>
.main-container {
  background: #f8f8fa;
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 71px);
  padding: 20px;
  .service-catalog {
    display: flex;
    flex-direction: column;
    min-height: calc(100vh - 111px);
  }
  .mg-auto {
    margin: auto;
  }
  .catalog {
    display: flex;
    gap: 28px;
    justify-content: space-between;
    padding-top: 30px;

    .tittle {
      color: #3c4557;
      padding-bottom: 4px;
      h1 {
        font-size: 32px;
        font-weight: 600;
        line-height: 36px;
        padding-bottom: 14px;
      }
      p {
        font-size: 16px;
        font-weight: 400;
        line-height: 24px;
        span {
          color: #1456cb;
          cursor: pointer;
        }
      }
    }
    .actions {
      display: flex;
      gap: 24px;
      .search-bar {
        align-items: center;
        background-color: #f8f8f8;
        border: 1px solid #ddd;
        border-radius: 4px;
        display: flex;
        height: 44px;
        padding: 8px;
        width: 200px;
        input {
          background: none;
          border: none;
          color: #333;
          font-size: 14px;
          outline: none;
          padding: 0;
          width: 100%;
        }
        .icon {
          color: #aaa;
          font-size: 16px;
          margin-right: 6px;
        }
      }

      button {
        align-items: center;
        background: #07a88d;
        border: none;
        border-radius: 100px;
        color: #ffffff;
        cursor: pointer;
        display: flex;
        font-size: 16px;
        font-weight: 400;
        gap: 6px;
        line-height: 20px;
        padding: 12px 24px 12px 16px;
        white-space: nowrap;
      }
    }
    .refresh {
      align-items: center;
      border: 1px solid #b9babb;
      border-radius: 2px;
      cursor: pointer;
      display: flex;
      height: 25px;
      justify-content: center;
      margin-left: auto;
      margin-top: 12px;
      width: 30px;
    }
  }
}
@media (max-width: 768px) {
  .main-container {
    .catalog {
      flex-direction: column;
      .actions {
        justify-content: end;
      }
    }
  }
}
</style>
