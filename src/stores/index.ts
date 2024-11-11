import { defineStore } from 'pinia'
import state from './state'
import type { ProcessedService } from '@/types/serviceTypes'

export const useServiceStore = defineStore('serviceStore', {
  state: () => state,
  actions: {
    setService(service: ProcessedService): void {
      state.service = service
    },
  },
  getters: {
    getSelectedService: (state) => state?.service,
  },
})
