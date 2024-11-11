import type { Ref } from 'vue'
export interface Service {
  id: string;
  name: string;
  description: string;
  type: string;
  published: boolean;
  configured: boolean;
  versions: Version[];
  metrics?: Metrics;
}

export interface Metrics {
  latency: number;
  uptime: number;
  requests: number;
  errors: number;
}

export interface Version {
  id: string;
  name: string;
  description: string;
  developer?: Developer;
  updated_at: string;
}

export interface Developer {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

export interface ProcessedService {
  id: string;
  name: string;
  description: string;
  type: string;
  versions: Versions[];
  versionCount: null | string;
  status: string;
  serviceMetrics?: ServiceMetric | null;
  uniqueDevelopers: Developer[];
}

export interface ServiceMetric {
  latency: number;
  uptime: string;
  request: string;
  errors: string;
}

export interface Versions {
  id: string;
  name: string;
  description: string;
  developer?: Developer;
  updated_at: string;
}

export interface PageMetaData {
  totalItems: number;
  totalPages: number;
  currentPage: Ref<number>;
  itemsPerPage: number;
}
