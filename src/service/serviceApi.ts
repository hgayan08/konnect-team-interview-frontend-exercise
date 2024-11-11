import axios from 'axios'
const SERVICE_BASE_URL = 'http://localhost:4001'

export const fetchServices = () => {
  const url = `${SERVICE_BASE_URL}/api/services`
  return axios.get(url)
}

export const searchService = (searchQuery: string) => {
  const url = `${SERVICE_BASE_URL}/api/services?q=${searchQuery}`
  return axios.get(url)
}
