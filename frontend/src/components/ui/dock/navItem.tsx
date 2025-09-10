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

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    close()

    // Navigate after close animation completes
    setTimeout(() => {
      router.push(href)
    }, 1300) // Total animation time (0.8s navitems + 0.5s menubox)
  }

  return (
    <div
      onClick={handleClick}
      className='h-12 px-2 flex items-center justify-center border border-offblack-950 uppercase text-lg font-medium bg-offblack-50'
      style={{ zIndex: zIndex }}
    >
      <Image src={icon} alt={label} width={32} height={32} priority />

      {label}
    </div>
  )
}
