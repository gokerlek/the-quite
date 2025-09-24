'use client'

import { usePathname } from 'next/navigation'

import { useLoadingContext } from '@/context/LoadingContext'

import { Dock } from '../ui/dock/index'

export default function Footer() {
  const { loaded } = useLoadingContext()
  const pathname = usePathname()

  // Ana sayfada sadece loaded durumunda göster, diğer sayfalarda her zaman göster
  if (pathname === '/' && !loaded) return null

  return <Dock />
}
