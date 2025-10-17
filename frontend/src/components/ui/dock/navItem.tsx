import { MouseEvent } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

import { useTranslations } from 'use-intl'

import { useDock } from './dockContext'

interface NavItem {
  href: string
  label: string
  icon: string
  zIndex: number
}

export const NavItem = ({ href, label, icon, zIndex }: NavItem) => {
  const { close } = useDock()
  const router = useRouter()
  const t = useTranslations()

  const handleClick = async (e: MouseEvent) => {
    e.preventDefault()

    // Wait for close animation to complete, then navigate
    await close()
    router.push(href)
  }

  return (
    <div
      onClick={handleClick}
      className='h-12 px-2 min-w-max flex items-center justify-center border border-offblack-950 uppercase text-lg font-medium bg-offblack-50 cursor-pointer pointer-events-auto'
      style={{ zIndex: zIndex, transform: 'translate(-31.25rem, 0rem)' }}
    >
      <div className='relative w-8 h-8 '>
        <Image src={icon} alt={label} fill priority className='object-cover' />
      </div>

      {t(label)}
    </div>
  )
}
