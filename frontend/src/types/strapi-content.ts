import type { StrapiEntity } from './strapi-core'

export interface PostAttributes {
  title: string
  content: string
  slug: string
  // cover?: MediaRelation; // add as needed
}

export interface ProjectAttributes {
  name: string
  description: string
  slug: string
}

// Optional: if you need fully wrapped entities handy
export type StrapiPost = StrapiEntity<PostAttributes>
export type StrapiProject = StrapiEntity<ProjectAttributes>

// 🔑 Single source of truth: keys must match Strapi collection names
export interface StrapiContentTypes {
  posts: PostAttributes
  projects: ProjectAttributes
  // add new types here (e.g., pages, categories, etc.)
}
