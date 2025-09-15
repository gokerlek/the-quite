'use client'

import { DockProvider, useDock } from '@/components/ui/dock/dockContext'
import { HamburgerButton } from '@/components/ui/dock/hamburgerButton'
import { MenuBox } from '@/components/ui/dock/menuBox'
import { NavItems } from '@/components/ui/dock/navItems'

const DockContent = () => {
  const { toggleWithAnimation, menuBoxRef, navItemsRef } = useDock()

  return (
    <div className='px-6 container mx-auto'>
      <div className='fixed bottom-5 sm:bottom-8  flex items-center justify-between gap-1 z-10 overflow-hidden '>
        <HamburgerButton onToggle={toggleWithAnimation || (() => {})} />

        <MenuBox ref={menuBoxRef} />

        <div ref={navItemsRef} className='flex gap-1'>
          <NavItems />
        </div>
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
