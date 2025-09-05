// Base Strapi response structure
export interface StrapiResponse<T> {
  data: T
  meta: {
    pagination?: {
      page: number
      pageSize: number
      pageCount: number
      total: number
    }
  }
}

// Component types based on your Strapi schema
export interface Link {
  id: number
  href: string
  label: string
  isExternal: boolean
  isButtonLink?: boolean
  type?: string
}

export interface Image {
  id: number
  documentId: string
  alternativeText?: string
  url: string
}

export interface Logo {
  id: number
  label: string
  href: string
  isExternal: boolean
  image: Image
}

export interface Header {
  id: number
  logo: Logo
  navItems: Link[]
  cta: Link
}

export interface Footer {
  id: number
  text: string
  logo: Logo
  navItems: Link[]
  socialLinks: Logo[]
}

export interface Hero {
  __component: string
  id: number
  heading: string
  text?: string
  link?: Link
  image?: Image
}

// Content types
export interface Global {
  id: number
  documentId: string
  title: string
  description?: string
  header: Header
  footer: Footer
  createdAt: string
  updatedAt: string
  publishedAt?: string
}

export interface LandingPage {
  id: number
  documentId: string
  title: string
  description?: string
  blocks: Hero[]
  createdAt: string
  updatedAt: string
  publishedAt?: string
}
