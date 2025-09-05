# Strapi + React Query + TypeScript — Type‑Safe Frontend (Agent Playbook)

> A copy‑pasteable, agent‑friendly guide to implement a **single, scalable, type‑safe data layer** for any Strapi content type — without duplicating fetch logic.

---

## ✅ What this sets up
- One generic fetch layer for **collections** and **single items by slug**
- **TypeScript‑safe** models with full IntelliSense
- A central **per‑type query config** (e.g., `populate`, `fields`, `filters`)
- **React Query** hooks (`useQuery`, `useInfiniteQuery`) for caching/loading/errors
- Easy opt‑in **auth token** support (public/private content)
- Works in **Next.js (App or Pages router)** or any React app

> **Strapi v5** assumed. Replace or extend types if you use plugins like deep‑populate (or your own nested `populate` presets).

---

## 🧩 Minimal folder structure
```
src/
  types/
    strapi-core.ts
    strapi-content.ts
  lib/
    strapi-config.ts
    strapi-query.ts
    strapi-fetchers.ts
  hooks/
    useStrapi.ts
  app/ or pages/
    (usage examples)
```

---

## 1) Core Strapi generics (no model duplication)
**Works for Strapi v5** — response envelopes remain `{ data, meta }`.
```ts
// Strapi list/single wrappers (v4)
export interface StrapiEntity<TAttributes> {
  id: number;
  attributes: TAttributes;
}

export interface StrapiPagination {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

export interface StrapiMeta {
  pagination?: StrapiPagination;
  // extend here if you use locales, etc.
}

export interface StrapiListResponse<TAttributes> {
  data: Array<StrapiEntity<TAttributes>>;
  meta: StrapiMeta;
}

export interface StrapiSingleResponse<TAttributes> {
  data: StrapiEntity<TAttributes> | null;
  meta?: StrapiMeta;
}

// Error normalization
export interface StrapiErrorPayload {
  error?: { status?: number; name?: string; message?: string; details?: unknown };
}

export class StrapiHttpError extends Error {
  status?: number;
  details?: unknown;
  constructor(message: string, status?: number, details?: unknown) {
    super(message);
    this.name = "StrapiHttpError";
    this.status = status;
    this.details = details;
  }
}
```

---

## 2) Declare **your** content type interfaces
**Use `interface` (preferred) and map them once.**

**`src/types/strapi-content.ts`**
```ts
import type { StrapiEntity } from "./strapi-core";

export interface PostAttributes {
  title: string;
  content: string;
  slug: string;
  // cover?: MediaRelation; // add as needed
}

export interface ProjectAttributes {
  name: string;
  description: string;
  slug: string;
}

// Optional: if you need fully wrapped entities handy
export interface StrapiPost extends StrapiEntity<PostAttributes> {}
export interface StrapiProject extends StrapiEntity<ProjectAttributes> {}

// 🔑 Single source of truth: keys must match Strapi collection names
export interface StrapiContentTypes {
  posts: PostAttributes;
  projects: ProjectAttributes;
  // add new types here (e.g., pages, categories, etc.)
}
```

> Add/extend attribute interfaces freely (relations, components, media, locales, SEO fields).

---

## 3) Central config & query presets
**`src/lib/strapi-config.ts`**
```ts
export const STRAPI_BASE_URL =
  process.env.NEXT_PUBLIC_STRAPI_API_URL ?? "http://localhost:1337/api";

// Optional public token (only if you protect content on the public role)
export const STRAPI_PUBLIC_TOKEN = process.env.NEXT_PUBLIC_STRAPI_TOKEN ?? "";
```

**`src/lib/strapi-query.ts`** — small, typed query builder (no external deps)
```ts
import type { StrapiContentTypes } from "@/types/strapi-content";

// Narrow, safe param shape you can expand anytime
export interface StrapiParams {
  populate?: "*" | string | string[] | Record<string, any>;
  fields?: string[];
  sort?: string | string[];
  filters?: Record<string, any>; // e.g. { slug: { $eq: "hello" } }
  pagination?: { page?: number; pageSize?: number; start?: number; limit?: number };
  locale?: string;
}

export interface ContentTypePreset {
  list?: StrapiParams;
  single?: StrapiParams;
}

// Per‑type defaults (customize freely)
export const strapiQueryMap: Record<keyof StrapiContentTypes, ContentTypePreset> = {
  posts: {
    list: { populate: ["cover"], sort: ["-id"] },
    single: { populate: ["cover", "author"] },
  },
  projects: {
    list: { populate: "*" },
    single: { populate: "*" },
  },
};

// Convert StrapiParams → query string (handles arrays & objects)
export function toQueryString(params?: StrapiParams): string {
  if (!params) return "";
  const usp = new URLSearchParams();

  const append = (key: string, value: unknown) => {
    if (value === undefined || value === null) return;
    if (Array.isArray(value)) {
      value.forEach((v, i) => append(`${key}[${i}]`, v));
    } else if (typeof value === "object") {
      Object.entries(value as Record<string, unknown>).forEach(([k, v]) => {
        append(`${key}[${k}]`, v);
      });
    } else {
      usp.append(key, String(value));
    }
  };

  Object.entries(params).forEach(([k, v]) => append(k, v as unknown));
  const qs = usp.toString();
  return qs ? `?${qs}` : "";
}
```

---

## 4) Generic fetchers (collection, single by slug, by id)
**`src/lib/strapi-fetchers.ts`**
```ts
import { STRAPI_BASE_URL, STRAPI_PUBLIC_TOKEN } from "./strapi-config";
import { strapiQueryMap, toQueryString, type StrapiParams } from "./strapi-query";
import type {
  StrapiListResponse,
  StrapiSingleResponse,
  StrapiHttpError,
} from "@/types/strapi-core";
import type { StrapiContentTypes } from "@/types/strapi-content";

function authHeaders() {
  return STRAPI_PUBLIC_TOKEN
    ? { Authorization: `Bearer ${STRAPI_PUBLIC_TOKEN}` }
    : {};
}

async function handle<T>(res: Response): Promise<T> {
  if (res.ok) return (await res.json()) as T;
  let message = `HTTP ${res.status}`;
  try {
    const payload = (await res.json()) as { error?: { message?: string; details?: unknown } };
    if (payload?.error?.message) message = payload.error.message;
    throw new (class extends Error {
      status = res.status;
      details = payload?.error?.details;
    })(message);
  } catch {
    // non‑JSON error
    throw new Error(message);
  }
}

export async function fetchCollection<K extends keyof StrapiContentTypes>(
  contentType: K,
  params?: StrapiParams
): Promise<StrapiListResponse<StrapiContentTypes[K]>> {
  const preset = strapiQueryMap[contentType]?.list;
  const qs = toQueryString({ ...(preset ?? {}), ...(params ?? {}) });
  const res = await fetch(`${STRAPI_BASE_URL}/${String(contentType)}${qs}`, {
    headers: { "Content-Type": "application/json", ...authHeaders() },
    cache: "no-store", // tweak per your SSR strategy
  });
  return handle(res);
}

export async function fetchSingleBySlug<K extends keyof StrapiContentTypes>(
  contentType: K,
  slug: string,
  params?: StrapiParams
): Promise<StrapiSingleResponse<StrapiContentTypes[K]>> {
  const preset = strapiQueryMap[contentType]?.single;
  const merged: StrapiParams = {
    ...(preset ?? {}),
    ...(params ?? {}),
    filters: { ...(preset?.filters ?? {}), ...(params?.filters ?? {}), slug: { $eq: slug } },
  };
  const qs = toQueryString(merged);
  const res = await fetch(`${STRAPI_BASE_URL}/${String(contentType)}${qs}`, {
    headers: { "Content-Type": "application/json", ...authHeaders() },
    cache: "no-store",
  });
  const list = await handle<StrapiListResponse<StrapiContentTypes[K]>>(res);
  return { data: list.data?.[0] ?? null, meta: list.meta };
}

export async function fetchSingleById<K extends keyof StrapiContentTypes>(
  contentType: K,
  id: number | string,
  params?: StrapiParams
): Promise<StrapiSingleResponse<StrapiContentTypes[K]>> {
  const preset = strapiQueryMap[contentType]?.single;
  const qs = toQueryString({ ...(preset ?? {}), ...(params ?? {}) });
  const res = await fetch(`${STRAPI_BASE_URL}/${String(contentType)}/${id}${qs}`, {
    headers: { "Content-Type": "application/json", ...authHeaders() },
    cache: "no-store",
  });
  return handle(res);
}
```

---

## 5) React Query hooks (typed, reusable)
**`src/hooks/useStrapi.ts`**
```ts
import { useQuery, useInfiniteQuery, type UseQueryOptions } from "@tanstack/react-query";
import {
  fetchCollection,
  fetchSingleBySlug,
  fetchSingleById,
} from "@/lib/strapi-fetchers";
import type { StrapiContentTypes } from "@/types/strapi-content";
import type { StrapiListResponse, StrapiSingleResponse } from "@/types/strapi-core";
import type { StrapiParams } from "@/lib/strapi-query";

// Collection
export function useStrapiCollection<K extends keyof StrapiContentTypes>(
  contentType: K,
  params?: StrapiParams,
  options?: Omit<
    UseQueryOptions<StrapiListResponse<StrapiContentTypes[K]>, Error, StrapiListResponse<StrapiContentTypes[K]>>,
    "queryKey" | "queryFn"
  >
) {
  return useQuery({
    queryKey: ["strapi", contentType, params],
    queryFn: () => fetchCollection(contentType, params),
    staleTime: 30_000,
    ...options,
  });
}

// Single by slug
export function useStrapiSingleBySlug<K extends keyof StrapiContentTypes>(
  contentType: K,
  slug: string | undefined,
  params?: StrapiParams,
  options?: Omit<
    UseQueryOptions<StrapiSingleResponse<StrapiContentTypes[K]>, Error, StrapiSingleResponse<StrapiContentTypes[K]>>,
    "queryKey" | "queryFn" | "enabled"
  >
) {
  return useQuery({
    queryKey: ["strapi", contentType, "slug", slug, params],
    queryFn: () => fetchSingleBySlug(contentType, slug as string, params),
    enabled: Boolean(slug),
    staleTime: 30_000,
    ...options,
  });
}

// Single by id
export function useStrapiSingleById<K extends keyof StrapiContentTypes>(
  contentType: K,
  id: number | string | undefined,
  params?: StrapiParams,
  options?: Omit<
    UseQueryOptions<StrapiSingleResponse<StrapiContentTypes[K]>, Error, StrapiSingleResponse<StrapiContentTypes[K]>>,
    "queryKey" | "queryFn" | "enabled"
  >
) {
  return useQuery({
    queryKey: ["strapi", contentType, "id", id, params],
    queryFn: () => fetchSingleById(contentType, id as number | string, params),
    enabled: id !== undefined,
    staleTime: 30_000,
    ...options,
  });
}

// Infinite collections (page/pageSize)
export function useStrapiInfiniteCollection<K extends keyof StrapiContentTypes>(
  contentType: K,
  params?: StrapiParams & { pagination?: { page?: number; pageSize?: number } },
) {
  return useInfiniteQuery({
    queryKey: ["strapi", contentType, "infinite", params],
    queryFn: ({ pageParam = 1 }) =>
      fetchCollection(contentType, {
        ...(params ?? {}),
        pagination: { page: pageParam as number, pageSize: params?.pagination?.pageSize ?? 12 },
      }),
    getNextPageParam: (last) => {
      const p = last.meta?.pagination;
      if (!p) return undefined;
      return p.page < p.pageCount ? p.page + 1 : undefined;
    },
    staleTime: 30_000,
  });
}
```

---

## 6) Provider setup (Next.js or plain React)
**Install**
```bash
npm i @tanstack/react-query
```

**Next.js (App Router)** — `src/app/providers.tsx`
```tsx
"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useState } from "react";

export default function Providers({ children }: { children: ReactNode }) {
  const [client] = useState(() => new QueryClient());
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}
```

`src/app/layout.tsx`
```tsx
import Providers from "./providers";
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
```

**Next.js (Pages Router)** — `src/pages/_app.tsx`
```tsx
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const client = new QueryClient();
export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={client}>
      <Component {...pageProps} />
    </QueryClientProvider>
  );
}
```

---

## 7) Usage examples (typed, DRY)
**Collection (homepage)** — works for any type by key
```tsx
import { useStrapiCollection } from "@/hooks/useStrapi";
import type { StrapiEntity } from "@/types/strapi-core";
import type { PostAttributes } from "@/types/strapi-content";

export default function HomePage() {
  const { data, isLoading, error } = useStrapiCollection("posts");
  const posts: Array<StrapiEntity<PostAttributes>> = data?.data ?? [];

  if (isLoading) return <p>Loading…</p>;
  if (error) return <p>Oops: {(error as Error).message}</p>;

  return (
    <div>
      <h1>Blog Posts</h1>
      {posts.map((p) => (
        <article key={p.id}>
          <h2>{p.attributes.title}</h2>
        </article>
      ))}
    </div>
  );
}
```

**Slug page**
```tsx
import { useRouter } from "next/router"; // or read params in App Router
import { useStrapiSingleBySlug } from "@/hooks/useStrapi";
import type { StrapiEntity } from "@/types/strapi-core";
import type { PostAttributes } from "@/types/strapi-content";

export default function PostPage() {
  const { query } = useRouter();
  const slug = query.slug as string | undefined;
  const { data, isLoading } = useStrapiSingleBySlug("posts", slug);

  const post: StrapiEntity<PostAttributes> | null = data?.data ?? null;
  if (isLoading) return <p>Loading…</p>;
  if (!post) return <p>Not found</p>;

  return (
    <article>
      <h1>{post.attributes.title}</h1>
      <p>{post.attributes.content}</p>
    </article>
  );
}
```

**Customizing per‑call params** (e.g., add fields, filters, pagination)
```tsx
useStrapiCollection("projects", {
  fields: ["name", "slug"],
  sort: ["name:asc"],
  pagination: { page: 1, pageSize: 24 },
});
```

**Infinite scroll**
```tsx
const {
  data,
  hasNextPage,
  fetchNextPage,
  isFetchingNextPage,
} = useStrapiInfiniteCollection("posts", { pagination: { pageSize: 10 } });
```

---

## 8) Add a new content type (1 min)
1. Create an **attributes interface** in `strapi-content.ts`
2. Add a key to `StrapiContentTypes` with that interface
3. (Optional) Extend `strapiQueryMap` presets for that key
4. Use hooks with the new key — **no new fetcher or hook code needed** ✅

---

## 9) SSR, caching & performance tips
- React Query options to consider per page: `{ staleTime, gcTime, refetchOnWindowFocus }`
- For Next.js App Router + server components, prefer fetching **on the client** via these hooks for simplicity. If doing server data fetching, keep the same `toQueryString` API for consistency.
- Use `fields` to limit payload; be explicit with `populate` to avoid over‑fetching.
- Set `cache: "force-cache"` or `next: { revalidate: N }` **only** if you control freshness (marketing pages).

---

## 10) Security notes
- Never expose an **admin token** to the browser. If needed, create a limited **public token** and assign only required permissions.
- Prefer Strapi **Public role** for read‑only APIs. Lock down writes to server‑side routes.
- Use environment vars: `NEXT_PUBLIC_STRAPI_API_URL`, `NEXT_PUBLIC_STRAPI_TOKEN` (optional).

---

## 11) Quick validation checklist (for humans or agents)
- [ ] ENV set: `NEXT_PUBLIC_STRAPI_API_URL` (and token if needed)
- [ ] `StrapiContentTypes` includes **all** needed collections
- [ ] `strapiQueryMap` defaults make sense per content type
- [ ] Hooks return expected shapes in dev console
- [ ] Error states render meaningful messages
- [ ] Pagination works (if used)

---

## 12) Agent runbook (do this in order)
1. **Create files** with the contents above:
   - `src/types/strapi-core.ts`
   - `src/types/strapi-content.ts`
   - `src/lib/strapi-config.ts`
   - `src/lib/strapi-query.ts`
   - `src/lib/strapi-fetchers.ts`
   - `src/hooks/useStrapi.ts`
2. **Install** `@tanstack/react-query` and wire the **Provider** (App or Pages router)
3. **Set env**: `NEXT_PUBLIC_STRAPI_API_URL` (and token if required)
4. **Run sample pages** shown above; confirm data renders
5. **Add new types** by editing only `strapi-content.ts` and `strapi-query.ts`
6. (Optional) Implement pages using `useStrapiInfiniteCollection` for lists

---

## 13) Troubleshooting
- **403/401**: Check public role permissions or token scope; verify `Authorization` header.
- **Empty `data`** from slug fetch: ensure `filters.slug[$eq]` matches actual field name; verify `slug` is in collection type.
- **Populate not working**: confirm relation names and that the public role can read relations.
- **TS inference missing**: confirm you used the **keys** from `StrapiContentTypes` and that interfaces are exported.

---

## 14) (TR) Kısa Notlar
- Tek bir generic katman ile **tüm** içerik tiplerini çekiyoruz.
- `StrapiContentTypes` içine **sadece yeni key ve interface** ekleyerek ölçekleniyor.
- `strapiQueryMap` ile her tipe özel `populate/fields/filters` varsayılanları tanımlanıyor.
- `useStrapi*` hook’ları React Query cache ve loading/error yönetimini üstleniyor.

---

## 15) Strapi v5 specifics & tips
- **Query params** remain the same style: `populate`, `fields`, `filters`, `sort`, `pagination`, `locale`, `publicationState` (draft/published). You can pass any of these through `StrapiParams`.
- **Populate**: v5 still supports nested population via object/array syntax. Prefer explicit arrays (e.g., `["cover", "author.avatar"]`) to avoid over-fetching.
- **Internationalization**: If you use i18n, include `locale` at call-site or bake a default into your presets.
- **Draft & Publish**: To fetch drafts in non-auth contexts you usually need proper role permissions or a token. Otherwise use `publicationState: 'live'`.
- **OpenAPI**: v5 can expose OpenAPI; consider codegen for large schemas.
- **Auth**: Never ship admin tokens to the client; if needed, configure a limited read-only token for public reads.

---

## 16) Nice‑to‑have extensions (optional)
- Add a **`qs`** serializer if you prefer the package; keep the `StrapiParams` API the same.
- Create `useStrapiMutation` wrappers for **server‑side** writes via Next.js route handlers.
- Generate models from Strapi **OpenAPI** or use a codegen step if your schema is large.

---

**You’re done.** Add content types, tweak presets, and ship confidently with full IntelliSense and zero duplicated fetch logic.

