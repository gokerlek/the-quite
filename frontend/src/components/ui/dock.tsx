'use client'

import { useEffect, useRef } from 'react'

import gsap from 'gsap'

import { DockProvider, useDock } from '@/components/ui/dock/dockContext'
import { HamburgerButton } from '@/components/ui/dock/hamburgerButton'
import { MenuBox } from '@/components/ui/dock/menuBox'
import { NavItems } from '@/components/ui/dock/navItems'

const DockContent = () => {
  const { open, toggleOpen } = useDock()
  const menuBoxRef = useRef<HTMLDivElement>(null)
  const navItemsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const menuBox = menuBoxRef.current
    const navItems = navItemsRef.current

    if (!menuBox || !navItems) return

    if (open) {
      // Close animation: MenuBox moves left under hamburger, then NavItems appear
      gsap.to(menuBox, { x: -120, duration: 0.5 })
      gsap.to(navItems.children, {
        x: -58,
        duration: 0.8,
        stagger: 0.1,
        delay: 0.1,
      })
    } else {
      // Open animation: NavItems move left under hamburger, then MenuBox returns
      gsap.to(navItems.children, {
        x: -500,
        duration: 0.8,
        stagger: 0.1,
      })
      gsap.to(menuBox, {
        x: 0,
        duration: 0.5,
        delay: 0.1,
      })
    }
  }, [open])

  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && open) {
        toggleOpen()
      }
    }

    document.addEventListener('keydown', handleEscapeKey)

    return () => document.removeEventListener('keydown', handleEscapeKey)
  }, [open, toggleOpen])

  return (
    <div className='fixed bottom-5 sm:bottom-8 sm:left-20 left-5 flex items-center justify-between gap-1 z-10 overflow-hidden'>
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
