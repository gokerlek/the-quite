import axios from 'axios'
import { toast } from 'sonner'

const API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337'
const API_TOKEN = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN

// Create axios instance
const api = axios.create({
  baseURL: `${API_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
    ...(API_TOKEN && { Authorization: `Bearer ${API_TOKEN}` }),
  },
  timeout: 10_000,
})

// Centralized Strapi error parser
type AxiosLikeError = {
  response?: { status?: number; data?: unknown }
  message?: string
}

function getStrapiErrorMessage(error: unknown): string {
  const err = error as AxiosLikeError

  // Axios error format
  const status = err?.response?.status
  const data = err?.response?.data as { error?: { message?: string }; message?: string } | undefined
  // Strapi v4 common shapes: { error: { message, details } } or { data, error }
  const strapiMsg = data?.error?.message || data?.message

  const base = strapiMsg || err?.message || 'Beklenmeyen bir hata oluştu'

  return status ? `${base} (HTTP ${status})` : base
}

// Axios response interceptor for global error toasts
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Avoid double toasts: only toast on client side
    if (typeof window !== 'undefined') {
      const msg = getStrapiErrorMessage(error)

      toast.error(msg)
    }

    return Promise.reject(error)
  },
)

// API functions
export const strapiApi = {
  // Get global data (header, footer, etc.)
  async getGlobal() {
    const response = await api.get('/global?populate=*')

    return response.data
  },

  // Get landing page data
  async getLandingPage() {
    const response = await api.get('/landing-page?populate=*')

    return response.data
  },

  // Generic function to fetch any content type
  async get(endpoint: string, params?: Record<string, unknown>) {
    const response = await api.get(endpoint, { params })

    return response.data
  },
}

export default api
