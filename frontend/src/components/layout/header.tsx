'use client'

import Image from 'next/image'
import { usePathname } from 'next/navigation'

import { useLoadingContext } from '@/context/LoadingContext'

export default function Header() {
  const { loaded } = useLoadingContext()
  const pathname = usePathname()

  // Ana sayfada sadece loaded durumunda göster, diğer sayfalarda her zaman göster
  if (pathname === '/' && !loaded) return null

  return (
    <div className='px-6 container mx-auto'>
      <div className='fixed top-5 sm:top-8'>
        <Image src='/header-logo.svg' alt='The Quiet Header Logo' width={96} height={48} priority />
      </div>
    </div>
  )
}
