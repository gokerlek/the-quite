export const STRAPI_BASE_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL ?? 'http://localhost:1337/api'

// Optional public token (only if you protect content on the public role)
export const STRAPI_PUBLIC_TOKEN = process.env.NEXT_PUBLIC_STRAPI_TOKEN ?? ''
