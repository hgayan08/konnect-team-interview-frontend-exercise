<template>
  <div class="service-card">
    <ul class="service-list">
      <li
        v-for="service in services"
        :key="service.id"
        class="card"
        @click="redirectToCardDetails(service)"
      >
        <div class="card-content">
          <div class="service-status">
            <div class="status">
              <img
                alt="status icon"
                :class="SERVICE_STATUS[service.status].iconClass"
                height="20"
                :src="SERVICE_STATUS[service.status].iconPath"
                width="20"
              >
              {{ SERVICE_STATUS[service.status].label }}
            </div>
            <div
              v-if="service.versionCount"
              class="version"
            >
              {{ service.versionCount }}
            </div>
          </div>
          <div class="content">
            <div class="card-details">
              <h2 class="heading">
                {{ service.name }}
              </h2>
              <p class="description">
                {{ service.description }}
              </p>
            </div>
            <div class="service-metrics">
              <div class="metrics-data">
                <div v-if="service.serviceMetrics">
                  <div class="data-item">
                    <strong>{{ service.serviceMetrics.latency }}</strong>
                    latency
                  </div>
                  <div class="data-item">
                    <strong>{{ service.serviceMetrics.uptime }}</strong> uptime
                  </div>
                  <div class="data-item">
                    <strong>{{ service.serviceMetrics.request }}</strong>
                    requests
                    <strong>{{ service.serviceMetrics.errors }}</strong> errors
                  </div>
                </div>
                <div
                  v-else
                  class="data-item not-configured"
                >
                  Not configured with runtime yet
                </div>
              </div>

              <div
                v-for="uniqueDeveloper in service.uniqueDevelopers"
                :key="uniqueDeveloper.id"
                class="developers"
              >
                <div
                  v-if="service.uniqueDevelopers.length > 0"
                  class="developer"
                >
                  <img
                    alt="developer"
                    height="36"
                    :src="uniqueDeveloper.avatar"
                    width="36"
                    @error="handleImageError"
                  >
                </div>
                <div
                  v-if="service.uniqueDevelopers.length > 1"
                  class="developer"
                >
                  <img
                    alt="developer"
                    height="36"
                    :src="uniqueDeveloper.avatar"
                    width="36"
                    @error="handleImageError"
                  >
                </div>
                <div
                  v-if="service.uniqueDevelopers.length > 2"
                  class="view-more-developer"
                >
                  +{{ service.uniqueDevelopers.length - 2 }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { SERVICE_STATUS } from '../common/constants'
import { useRouter } from 'vue-router'
import { useServiceStore } from '@/stores/index'
import { FALLBACK_AVATAR } from '@/common/constants'
import type { ProcessedService } from '@/types/serviceTypes'

defineProps<{
  services: ProcessedService[];
}>()

const router = useRouter()
const serviceStore = useServiceStore()

const handleImageError = (event: Event) => {
  const target = event.target as HTMLImageElement
  target.src = FALLBACK_AVATAR
}

const redirectToCardDetails = (service: ProcessedService) => {
  serviceStore.setService(service)
  router
    .push({
      name: 'serviceDetails',
      params: { serviceId: service?.id },
    })
    .catch((error) => {
      console.error('Error navigating:', error)
    })
}
</script>

<style lang="scss" scoped>
.service-card {
  padding: 20px 0;
}
.service-list {
  display: inline-flex;
  flex-wrap: wrap;
  gap: 38px;
  list-style: none;
  width: 100%;

  .card {
    background: #ffffff;
    border-radius: 2px;
    cursor: pointer;
    min-height: 232px;
    width: calc((100% / 3) - 25.5px);

    .card-content {
      color: #707888;
      display: flex;
      flex-direction: column;
      height: 100%;
    }

    .service-status {
      align-items: center;
      display: flex;
      justify-content: space-between;
      padding: 20px 28px 8px 20px;

      .status {
        align-items: center;
        color: #3c4557;
        display: flex;
        font-size: 12px;
        font-weight: 400;
        gap: 3px;
        line-height: 16px;
      }

      .version {
        background-color: #f2f6fe;
        border-radius: 100px;
        color: #5888db;
        font-size: 13px;
        font-weight: 600;
        height: 33px;
        line-height: 15.73px;
        padding: 9px 16px 8px;
        white-space: nowrap;
      }
    }

    .content {
      display: flex;
      flex-direction: column;
      height: 100%;
      padding-bottom: 28px;
      padding-left: 28px;
      padding-right: 28px;
    }

    .card-details {
      .heading {
        color: #3c4557;
        font-size: 20px;
        font-weight: 600;
        line-height: 24px;
      }

      .description {
        font-size: 13px;
        font-weight: 400;
        line-height: 20px;
        padding-top: 7px;
      }
    }

    .service-metrics {
      display: flex;
      justify-content: space-between;
      margin-top: auto;
      position: relative;
    }

    .metrics-data {
      width: calc(100% - 87px);

      strong {
        color: #3c4557;
      }
    }

    .data-item {
      font-size: 12px;
      font-weight: 600;
      line-height: 16px;
      padding-left: 12px;
      position: relative;

      &::before {
        background-color: #42d782;
        border-radius: 50%;
        content: '';
        height: 6px;
        left: 0;
        position: absolute;
        top: 4px;
        width: 6px;
      }
      &.not-configured {
        color: #707888;
        &::before {
          background-color: #b6b6bd;
        }
      }
    }
  }
}

.developers {
  .developer {
    border-radius: 50%;
    bottom: 0;
    height: 36px;
    overflow: hidden;
    position: absolute;
    right: 0;
    width: 36px;
  }

  .developer:nth-of-type(2) {
    transform: translateX(-63%);
  }

  .view-more-developer {
    align-items: center;
    background: #f1f1f8;
    border-radius: 50%;
    bottom: 0;
    color: #777d8a;
    display: flex;
    font-size: 12px;
    font-weight: 600;
    height: 36px;
    justify-content: center;
    line-height: 24px;
    outline-color: #f1f1f9;
    outline-style: auto;
    position: absolute;
    right: 48px;
    width: 36px;
  }
}

.icon-spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@-webkit-keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@media (max-width: 1024px) {
  .service-card {
    gap: 24px;

    .card {
      width: calc((100% / 3) - 16px);
    }
  }
}

@media (max-width: 820px) {
  .service-card {
    .card {
      width: calc((100% / 2) - 12px);
    }
  }
}

@media (max-width: 768px) {
  .service-card {
    .card {
      width: 100%;
    }
  }
}
</style>
