'use client'

import { forwardRef, ReactNode } from 'react'

interface LayoutProps {
  children: ReactNode
  id?: string
}

const Layout = forwardRef<HTMLDivElement, LayoutProps>(({ children, id }, ref) => {
  return (
    <div ref={ref} id={id} className='min-h-dvh flex flex-col bg-offblack-50 fixed inset-0'>
      {children}
    </div>
  )
})

Layout.displayName = 'Layout'

export default Layout
