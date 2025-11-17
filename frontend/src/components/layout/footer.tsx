'use client'

import { usePathname } from 'next/navigation'

import { useLoadingContext } from '@/context/LoadingContext'
import { useMobileDetection } from '@/hooks/useMobileDetection'

import { Dock } from '../ui/dock/index'

export default function Footer() {
  const { loaded } = useLoadingContext()
  const pathname = usePathname()
  const isMobile = useMobileDetection()

  // Ana sayfada sadece loaded durumunda göster, diğer sayfalarda her zaman göster
  if (pathname === '/' && !loaded) return null

  // Mobilde Footer'ı gizle (hamburger menu kullanılıyor)
  if (isMobile) return null

  return <Dock />
}
