'use client'

import Image from 'next/image'

import { useLoadingContext } from '@/context/LoadingContext'

export default function Header() {
  const { loaded } = useLoadingContext()

  if (!loaded) return null

  return (
    <div className='absolute top-5 sm:top-8  px-4'>
      <Image src='/header-logo.svg' alt='The Quiet Header Logo' width={96} height={48} priority />
    </div>
  )
}
