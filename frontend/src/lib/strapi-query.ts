import type { StrapiContentTypes } from '@/types/strapi-content'

// Narrow, safe param shape you can expand anytime
export interface StrapiParams {
  populate?: '*' | string | string[] | Record<string, unknown>
  fields?: string[]
  sort?: string | string[]
  filters?: Record<string, unknown> // e.g. { slug: { $eq: "hello" } }
  pagination?: { page?: number; pageSize?: number; start?: number; limit?: number }
  locale?: string
}

export interface ContentTypePreset {
  list?: StrapiParams
  single?: StrapiParams
}

// Per‑type defaults (customize freely)
export const strapiQueryMap: Record<keyof StrapiContentTypes, ContentTypePreset> = {
  posts: {
    list: { populate: ['cover'], sort: ['-id'] },
    single: { populate: ['cover', 'author'] },
  },
  projects: {
    list: { populate: '*' },
    single: { populate: '*' },
  },
}

// Convert StrapiParams → query string (handles arrays & objects)
export function toQueryString(params?: StrapiParams): string {
  if (!params) return ''

  const usp = new URLSearchParams()

  const append = (key: string, value: unknown) => {
    if (value === undefined || value === null) return

    if (Array.isArray(value)) {
      value.forEach((v, i) => append(`${key}[${i}]`, v))
    } else if (typeof value === 'object') {
      Object.entries(value as Record<string, unknown>).forEach(([k, v]) => {
        append(`${key}[${k}]`, v)
      })
    } else {
      usp.append(key, String(value))
    }
  }

  Object.entries(params).forEach(([k, v]) => append(k, v as unknown))
  const qs = usp.toString()

  return qs ? `?${qs}` : ''
}
