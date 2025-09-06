'use client'

import { ReactNode } from 'react'

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className='min-h-screen flex flex-col bg-offblack-950'>
      <main className='flex-grow'>{children}</main>
    </div>
  )
}
