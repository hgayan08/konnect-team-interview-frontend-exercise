<template>
  <div class="service-details">
    <div
      v-if="!loading && !error"
      class="details"
    >
      <div class="service-name">
        {{ service && service.name }}
      </div>
      <div
        class="back-btn"
        @click="goBack"
      >
        <img
          alt="back icon"
          height="18px"
          src="../assets/icons/icon-previous.svg"
          width="18px"
        >
      </div>
      <div class="version-container">
        <div v-if="service && service.versions && service.versions.length">
          <div class="title">
            {{ versionDetailsTitle }}
          </div>
          <div
            v-for="version in service.versions"
            :key="version.id"
            class="detail"
          >
            <div class="name">
              {{ version.name }}
            </div>
            <div class="description">
              {{ version.description }}
            </div>
            <div class="type">
              <span :class="service.type">{{ service.type }}</span>
            </div>
            <div
              v-if="version.developer"
              class="developer"
            >
              <img
                alt="developer"
                height="20"
                :src="version.developer.avatar"
                width="20"
                @error="handleImageError"
              >
              <div class="developer-details">
                <div class="developer-name">
                  {{ version.developer.name }}
                </div>
                <div class="updated-at">
                  {{ timeAgo(version.updated_at) }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          v-else
          class="no-version"
        >
          No version found for this service
        </div>
      </div>
    </div>
    <LoadingSpinner v-if="loading" />
    <PageError
      v-if="error"
      class="mg-auto"
      @retry="retry"
    />
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import PageError from '@/components/PageError.vue'
import { storeToRefs } from 'pinia'
import { useServiceStore } from '@/stores/index'
import { useServices } from '@/composables/useServices'
import { useTimeAgo } from '@/composables/useTimeAgo'
import { FALLBACK_AVATAR } from '@/common/constants'
import { fetchServices } from '@/service/serviceApi'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const loading = ref<boolean>(false)
const error = ref<boolean>(false)

const serviceStore = useServiceStore()
const { service } = storeToRefs(serviceStore)

const { timeAgo } = useTimeAgo()

const versionDetailsTitle = computed(() => {
  const versionCount = service.value?.versions.length
  return versionCount > 1
    ? `Versions(${versionCount})`
    : `Version(${versionCount})`
})

const handleImageError = (event: Event) => {
  const target = event.target as HTMLImageElement
  target.src = FALLBACK_AVATAR
}

const goBack = () => {
  router.back()
}

const fetchAndProcessServices = async () => {
  loading.value = true
  error.value = false

  try {
    const { data } = await fetchServices()
    const { processedServices } = useServices(data)

    const selectedService = processedServices.find(
      (service) => service.id === route.params.serviceId,
    )

    if (selectedService) {
      serviceStore.setService(selectedService)
    }
  } catch (err) {
    error.value = true
    console.error('Error fetching services:', err)
  } finally {
    loading.value = false
  }
}

const retry = () => fetchAndProcessServices()

onMounted(() => {
  if (!Object.values(service.value).length) {
    fetchAndProcessServices()
  }
})
</script>

<style lang="scss" scoped>
.service-details {
  background: #f8f8f8;
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 71px);
  padding: 20px;
  .spinner {
    margin: auto;
  }
  .back-btn {
    cursor: pointer;
    margin-left: auto;
    margin-right: auto;
    max-width: 830px;
    padding: 0 0 10px;
    width: 100%;
  }
  .details {
    display: flex;
    flex-direction: column;
    min-height: calc(100vh - 111px);
  }

  .service-name {
    color: #3c4557;
    font-size: 20px;
    font-weight: 600;
    line-height: 24px;
    margin: 0 auto;
    padding: 30px 0 4px 0;
  }
  .version-container {
    background: #ffffff;
    border-radius: 4px;
    margin-left: auto;
    margin-right: auto;
    max-width: 830px;
    min-height: 210px;
    padding: 32px;
    width: 100%;
    .title {
      font-size: 16px;
      font-weight: 600;
      line-height: 24px;
      padding-bottom: 24px;
    }
    .detail {
      display: flex;
      gap: 30px;
      line-height: 24px;
      padding: 10px 0;
      &:not(:last-of-type) {
        border-bottom: 1px solid #f1f1f5;
      }

      .name {
        font-size: 13px;

        font-weight: 600;
        min-width: 50px;
      }
      .description {

        color: #8a8a8a;
        font-size: 12px;
        font-weight: 400;
        width: 300px;
      }
      .type {
        display: inline-flex;
        flex: 1;
        gap: 10px;
        span {
          border-radius: 4px;
          color: #1155cb;
          font-size: 10px;
          height: 20px;
          line-height: 10px;
          padding: 5px 7px 4px;
          text-align: center;
          &.HTTP {
            background-color: #f8f8fa;
          }
          &.REST {
            background-color: #bdd3f9;
          }
        }
      }
      .developer {
        display: flex;
        gap: 6px;
        white-space: nowrap;
        width: 200px;
        img {
          border-radius: 50%;
        }
        .developer-name {
          font-size: 13px;
          font-weight: 600;
          line-height: 24px;
        }
        .updated-at {
          color: #8a8a8a;
          font-size: 12px;
          font-weight: 400;
          line-height: 8px;
        }
      }
    }
    .no-version {
      align-items: center;
      display: flex;
      justify-content: center;
      min-height: 200px;
    }
  }
  .mg-auto {
    margin: auto;
  }
}
@media (max-width: 600px) {
  .service-details {
    .version-container {
      padding: 24px;
      .title {
        padding-bottom: 8px;
      }
      .detail {
        flex-wrap: wrap;
        gap: 14px;
        padding: 10px 0 18px;
        .description {
          max-width: 100%;
        }
        .developer {
          flex: 1;
        }
      }
    }
  }
}
</style>
