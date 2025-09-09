import Image from 'next/image'
import Link from 'next/link'

interface NavItem {
  href: string
  label: string
  icon: string
}

export const NavItem = ({ href, label, icon }: NavItem) => {
  return (
    <Link
      href={href}
      className='h-12 px-2 flex items-center justify-center border border-offblack-950 uppercase text-lg font-medium'
    >
      <Image src={icon} alt={label} width={32} height={32} priority />

      {label}
    </Link>
  )
}
