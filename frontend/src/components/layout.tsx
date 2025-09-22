'use client'

import { ReactNode } from 'react'

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return <div className='min-h-dvh flex flex-col bg-offblack-50 fixed inset-0'>{children}</div>
}
