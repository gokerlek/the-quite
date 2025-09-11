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

// New content types based on updated API structure
export interface TeamMember {
  id: number
  MemberInfo: string
  memberPic: Image
  Members: string
  Roles: string
}

export interface ContactInfo {
  id: number
  addres: string
  email: string
  placeholder: Image
}

export interface EventDetail {
  id: number
  date1: number
  date2: number
  EventBody: string
  eventMedia: Image
  PreviousEvents: Image[]
}

export interface About {
  id: number
  documentId: string
  Team: TeamMember[]
  createdAt: string
  updatedAt: string
  publishedAt?: string
}

export interface AboutLanding {
  id: number
  documentId: string
  aboutLanding: string
  createdAt: string
  updatedAt: string
  publishedAt?: string
}

export interface ContactPage {
  id: number
  documentId: string
  contact: ContactInfo
  createdAt: string
  updatedAt: string
  publishedAt?: string
}

export interface EventsDetail {
  id: number
  documentId: string
  EventDetails: EventDetail[]
  createdAt: string
  updatedAt: string
  publishedAt?: string
}
