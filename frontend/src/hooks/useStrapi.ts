import {
  keepPreviousData,
  useInfiniteQuery,
  useQuery,
  type UseQueryOptions,
} from '@tanstack/react-query'

import {
  fetchCollection,
  fetchSingle,
  fetchSingleById,
  fetchSingleBySlug,
} from '@/lib/strapi-fetchers'

import type { StrapiParams } from '@/lib/strapi-query'
import type { StrapiContentTypes } from '@/types/strapi-content'
import type { StrapiListResponse, StrapiSingleResponse } from '@/types/strapi-core'

// Collection
export function useStrapiCollection<K extends keyof StrapiContentTypes>(
  contentType: K,
  params?: StrapiParams,
  options?: Omit<
    UseQueryOptions<
      StrapiListResponse<StrapiContentTypes[K]>,
      Error,
      StrapiListResponse<StrapiContentTypes[K]>
    >,
    'queryKey' | 'queryFn'
  >,
) {
  const query = useQuery({
    queryKey: ['strapi', contentType, params],
    queryFn: () => fetchCollection(contentType, params),
    staleTime: 30_000,
    placeholderData: keepPreviousData,
    ...options,
  })

  return query
}

// Single by slug
export function useStrapiSingleBySlug<K extends keyof StrapiContentTypes>(
  contentType: K,
  slug: string | undefined,
  params?: StrapiParams,
  options?: Omit<
    UseQueryOptions<
      StrapiSingleResponse<StrapiContentTypes[K]>,
      Error,
      StrapiSingleResponse<StrapiContentTypes[K]>
    >,
    'queryKey' | 'queryFn' | 'enabled'
  >,
) {
  const query = useQuery({
    queryKey: ['strapi', contentType, 'slug', slug, params],
    queryFn: () => fetchSingleBySlug(contentType, slug as string, params),
    enabled: Boolean(slug),
    staleTime: 30_000,
    placeholderData: keepPreviousData,
    ...options,
  })

  return query
}

// Single (for single types without ID)
export function useStrapiSingle<K extends keyof StrapiContentTypes>(
  contentType: K,
  params?: StrapiParams,
  options?: Omit<
    UseQueryOptions<
      StrapiSingleResponse<StrapiContentTypes[K]>,
      Error,
      StrapiSingleResponse<StrapiContentTypes[K]>
    >,
    'queryKey' | 'queryFn'
  >,
) {
  const query = useQuery({
    queryKey: ['strapi', contentType, params],
    queryFn: () => fetchSingle(contentType, params),
    staleTime: 30_000,
    placeholderData: keepPreviousData,
    ...options,
  })

  return query
}

// Single by id
export function useStrapiSingleById<K extends keyof StrapiContentTypes>(
  contentType: K,
  id: number | string | undefined,
  params?: StrapiParams,
  options?: Omit<
    UseQueryOptions<
      StrapiSingleResponse<StrapiContentTypes[K]>,
      Error,
      StrapiSingleResponse<StrapiContentTypes[K]>
    >,
    'queryKey' | 'queryFn' | 'enabled'
  >,
) {
  const query = useQuery({
    queryKey: ['strapi', contentType, 'id', id, params],
    queryFn: () => fetchSingleById(contentType, id as number | string, params),
    enabled: id !== undefined,
    staleTime: 30_000,
    placeholderData: keepPreviousData,
    ...options,
  })

  return query
}

// Infinite collections (page/pageSize)
export function useStrapiInfiniteCollection<K extends keyof StrapiContentTypes>(
  contentType: K,
  params?: StrapiParams & { pagination?: { page?: number; pageSize?: number } },
) {
  const query = useInfiniteQuery({
    queryKey: ['strapi', contentType, 'infinite', params],
    queryFn: ({ pageParam = 1 }) =>
      fetchCollection(contentType, {
        ...(params ?? {}),
        pagination: { page: pageParam as number, pageSize: params?.pagination?.pageSize ?? 12 },
      }),
    getNextPageParam: (last) => {
      const p = last.meta?.pagination

      if (!p) return undefined

      return p.page < p.pageCount ? p.page + 1 : undefined
    },
    staleTime: 30_000,
    initialPageParam: 1,
  })

  return query
}
