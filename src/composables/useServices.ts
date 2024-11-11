import type {
  Service,
  Version,
  Metrics,
  Developer,
  ProcessedService,
} from '@/types/serviceTypes'
export function useServices(serviceResponse: Service[]) {
  const getVersionCount = (versions: Version[] = []): string | null => {
    if (versions.length === 0) return null
    return `${versions.length} version${versions.length > 1 ? 's' : ''}`
  }

  const getServiceStatus = (service: Service) => {
    if (service.configured && service.published) return 'PUBLISHED'
    if (service.configured && !service.published) return 'UNPUBLISHED'
    return 'IN_PROGRESS'
  }

  const getServiceMetrics = (metrics?: Metrics) => {
    if (!metrics) return null
    return {
      latency: metrics?.latency,
      uptime: `${(metrics?.uptime * 100).toFixed(1)}%`,
      request: `${(metrics?.requests / 1000).toFixed(1)}k`,
      errors: `${(metrics?.errors * 100).toFixed(1)}%`,
    }
  }

  const getUniqueDevelopers = (versions: Version[]) => {
    const uniqueDevelopers: { [key: string]: Developer } = {}
    versions.forEach((version: Version) => {
      const developer = version?.developer
      if (developer?.email) {
        uniqueDevelopers[developer.email] = developer
      }
    })

    return Object.values(uniqueDevelopers)
  }

  const processedServices: ProcessedService[] = serviceResponse.map(
    (service) => ({
      id: service.id,
      name: service.name,
      description: service.description,
      type: service.type,
      versions: service.versions,
      versionCount: getVersionCount(service?.versions),
      status: getServiceStatus(service),
      serviceMetrics: getServiceMetrics(service?.metrics),
      uniqueDevelopers: service?.versions?.length
        ? getUniqueDevelopers(service?.versions)
        : [],
    }),
  )

  return {
    processedServices,
  }
}
