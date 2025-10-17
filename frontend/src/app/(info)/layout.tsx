import { ReactNode } from 'react'

export default function InfoLayout({ children }: { children: ReactNode }) {
  // Shared layout for /about, /events, /contact
  // This is a lightweight wrapper to provide consistent spacing and container.
  return <section className='px-5 md:px-16'>{children}</section>
}
