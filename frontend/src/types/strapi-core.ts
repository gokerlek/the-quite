// Strapi list/single wrappers (v4)
export interface StrapiEntity<TAttributes> {
  id: number
  attributes: TAttributes
}

export interface StrapiPagination {
  page: number
  pageSize: number
  pageCount: number
  total: number
}

export interface StrapiMeta {
  pagination?: StrapiPagination
  // extend here if you use locales, etc.
}

export interface StrapiListResponse<TAttributes> {
  data: Array<StrapiEntity<TAttributes>>
  meta: StrapiMeta
}

export interface StrapiSingleResponse<TAttributes> {
  data: StrapiEntity<TAttributes> | null
  meta?: StrapiMeta
}

// Error normalization
export interface StrapiErrorPayload {
  error?: { status?: number; name?: string; message?: string; details?: unknown }
}

export class StrapiHttpError extends Error {
  status?: number
  details?: unknown
  constructor(message: string, status?: number, details?: unknown) {
    super(message)
    this.name = 'StrapiHttpError'
    this.status = status
    this.details = details
  }
}
