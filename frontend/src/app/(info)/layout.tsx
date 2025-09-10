import { ReactNode } from 'react'

export default function InfoLayout({ children }: { children: ReactNode }) {
  // Shared layout for /about, /events, /contact
  // This is a lightweight wrapper to provide consistent spacing and container.
  return <section className='min-h-screen px-6 py-24 container mx-auto'>{children}</section>
}
