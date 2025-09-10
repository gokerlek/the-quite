import { MouseEvent } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

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

  const handleClick = async (e: MouseEvent) => {
    e.preventDefault()

    // Wait for close animation to complete, then navigate
    await close()
    router.push(href)
  }

  return (
    <div
      onClick={handleClick}
      className='h-12 px-2 flex items-center justify-center border border-offblack-950 uppercase text-lg font-medium bg-offblack-50 cursor-pointer'
      style={{ zIndex: zIndex, transform: 'translate(-500px, 0px)' }}
    >
      <Image src={icon} alt={label} width={32} height={32} priority />

      {label}
    </div>
  )
}
