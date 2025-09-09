'use client'

import { useState } from 'react'

import { HamburgerButton } from '@/components/ui/dock/hamburgerButton'
import { MenuBox } from '@/components/ui/dock/menuBox'
import { NavItems } from '@/components/ui/dock/navItems'

export const Dock = () => {
  const [open, setOpen] = useState(false)

  return (
    <div className=' fixed bottom-5 sm:bottom-8 sm:left-20 left-5 flex items-center justify-between gap-1 z-10'>
      <HamburgerButton open={open} onClick={() => setOpen((prevState) => !prevState)} />

      <MenuBox />

      <NavItems />
    </div>
  )
}
