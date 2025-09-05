import { toast } from 'sonner'

import { STRAPI_BASE_URL, STRAPI_PUBLIC_TOKEN } from './strapi-config'
import { type StrapiParams, strapiQueryMap, toQueryString } from './strapi-query'

import type { StrapiContentTypes } from '@/types/strapi-content'
import type { StrapiListResponse, StrapiSingleResponse } from '@/types/strapi-core'

function authHeaders(): Record<string, string> {
  return STRAPI_PUBLIC_TOKEN ? { Authorization: `Bearer ${STRAPI_PUBLIC_TOKEN}` } : {}
}

async function handle<T>(res: Response): Promise<T> {
  if (res.ok) return (await res.json()) as T

  let message = `HTTP ${res.status}`

  try {
    const payload = (await res.json()) as { error?: { message?: string; details?: unknown } }

    if (payload?.error?.message) message = payload.error.message

    const err = new (class extends Error {
      status = res.status
      details = payload?.error?.details
    })(message)

    if (typeof window !== 'undefined') {
      toast.error(message)
    }

    throw err
  } catch {
    // non‑JSON error
    if (typeof window !== 'undefined') {
      toast.error(message)
    }

    throw new Error(message)
  }
}

export async function fetchCollection<K extends keyof StrapiContentTypes>(
  contentType: K,
  params?: StrapiParams,
): Promise<StrapiListResponse<StrapiContentTypes[K]>> {
  const preset = strapiQueryMap[contentType]?.list
  const qs = toQueryString({ ...(preset ?? {}), ...(params ?? {}) })
  const res = await fetch(`${STRAPI_BASE_URL}/${String(contentType)}${qs}`, {
    headers: { 'Content-Type': 'application/json', ...authHeaders() },
    // Enable ISR-like caching on the server while still letting React Query manage client caching
    next: { revalidate: 30 },
  })

  return handle(res)
}

export async function fetchSingleBySlug<K extends keyof StrapiContentTypes>(
  contentType: K,
  slug: string,
  params?: StrapiParams,
): Promise<StrapiSingleResponse<StrapiContentTypes[K]>> {
  const preset = strapiQueryMap[contentType]?.single
  const merged: StrapiParams = {
    ...(preset ?? {}),
    ...(params ?? {}),
    filters: { ...(preset?.filters ?? {}), ...(params?.filters ?? {}), slug: { $eq: slug } },
  }
  const qs = toQueryString(merged)
  const res = await fetch(`${STRAPI_BASE_URL}/${String(contentType)}${qs}`, {
    headers: { 'Content-Type': 'application/json', ...authHeaders() },
    next: { revalidate: 30 },
  })
  const list = await handle<StrapiListResponse<StrapiContentTypes[K]>>(res)

  return { data: list.data?.[0] ?? null, meta: list.meta }
}

export async function fetchSingleById<K extends keyof StrapiContentTypes>(
  contentType: K,
  id: number | string,
  params?: StrapiParams,
): Promise<StrapiSingleResponse<StrapiContentTypes[K]>> {
  const preset = strapiQueryMap[contentType]?.single
  const qs = toQueryString({ ...(preset ?? {}), ...(params ?? {}) })
  const res = await fetch(`${STRAPI_BASE_URL}/${String(contentType)}/${id}${qs}`, {
    headers: { 'Content-Type': 'application/json', ...authHeaders() },
    next: { revalidate: 30 },
  })

  return handle(res)
}
