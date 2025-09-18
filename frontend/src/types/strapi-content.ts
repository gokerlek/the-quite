import type { StrapiEntity } from './strapi-core'

// Strapi media format interface
export interface StrapiMediaFormat {
  url: string
  width: number
  height: number
  name?: string
  ext?: string
  size?: number
  mime?: string
}

export interface StrapiMediaFormats {
  thumbnail?: StrapiMediaFormat
  small?: StrapiMediaFormat
  medium?: StrapiMediaFormat
  large?: StrapiMediaFormat
  [key: string]: StrapiMediaFormat | undefined
}

// Updated content types based on new API structure
export interface AboutAttributes {
  Team: {
    id: number
    MemberInfo: string
    memberPic: {
      id: number
      documentId: string
      alternativeText?: string
      url: string
      width?: number
      height?: number
      formats?: StrapiMediaFormats
    }
    Members: string
    Roles: string
  }[]
}

export interface AboutLandingAttributes {
  aboutLanding: string
}

export interface ContactPageAttributes {
  contact: {
    id: number
    addres: string
    email: string
    placeholder: {
      id: number
      documentId: string
      alternativeText?: string
      url: string
      width?: number
      height?: number
      formats?: StrapiMediaFormats
    }
  }
}

export interface EventsDetailAttributes {
  EventDetails: {
    id: number
    date1: number
    date2: number
    EventBody: string
    eventMedia: {
      id: number
      documentId: string
      alternativeText?: string
      url: string
      width?: number
      height?: number
      formats?: StrapiMediaFormats
    }
    PreviousEvents: {
      id: number
      documentId: string
      alternativeText?: string
      url: string
      width?: number
      height?: number
      formats?: StrapiMediaFormats
    }[]
  }[]
}

// Optional: if you need fully wrapped entities handy
export type StrapiAbout = StrapiEntity<AboutAttributes>
export type StrapiAboutLanding = StrapiEntity<AboutLandingAttributes>
export type StrapiContactPage = StrapiEntity<ContactPageAttributes>
export type StrapiEventsDetail = StrapiEntity<EventsDetailAttributes>

// 🔑 Single source of truth: keys must match Strapi collection names
export interface StrapiContentTypes {
  about: AboutAttributes
  'about-landing': AboutLandingAttributes
  'contact-page': ContactPageAttributes
  'events-detail': EventsDetailAttributes
}
