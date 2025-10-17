'use client'

import { DockProvider, useDock } from '@/components/ui/dock/dockContext'
import { HamburgerButton } from '@/components/ui/dock/hamburgerButton'
import { MenuBox } from '@/components/ui/dock/menuBox'
import { NavItems } from '@/components/ui/dock/navItems'

const DockContent = () => {
  const { menuBoxRef, navItemsRef } = useDock()

  return (
    <div className='fixed bottom-8 left-16 flex items-center justify-between gap-1 z-10 overflow-hidden pointer-events-none'>
      <HamburgerButton />

      <MenuBox ref={menuBoxRef} />

      <div ref={navItemsRef} className='flex gap-1'>
        <NavItems />
      </div>
    </div>
  )
}

export const Dock = () => {
  return (
    <DockProvider>
      <DockContent />
    </DockProvider>
  )
}
