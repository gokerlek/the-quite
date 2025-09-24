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
  about: {
    single: {
      populate: {
        Team: {
          populate: {
            memberPic: {
              fields: ['alternativeText', 'url', 'width', 'height', 'formats'],
            },
          },
        },
      },
    },
  },
  'about-landing': {
    single: { populate: '*' },
  },
  'contact-page': {
    single: {
      populate: {
        contact: {
          populate: {
            placeholder: {
              fields: ['alternativeText', 'url', 'width', 'height', 'formats'],
            },
          },
        },
      },
    },
  },
  'events-detail': {
    single: {
      populate: {
        EventDetails: {
          populate: {
            eventMedia: {
              fields: ['alternativeText', 'url', 'width', 'height', 'formats'],
            },
            PreviousEvents: {
              fields: ['alternativeText', 'url', 'width', 'height', 'formats'],
            },
          },
        },
      },
    },
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
