'use client'

import { useLoadingContext } from '@/context/LoadingContext'

import { Dock } from '../ui/dock'

export default function Footer() {
  const { loaded } = useLoadingContext()

  if (!loaded) return null

  return <Dock />
}
