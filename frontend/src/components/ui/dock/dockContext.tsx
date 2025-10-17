'use client'

import {
  createContext,
  ReactNode,
  RefObject,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from 'react'

import gsap from 'gsap'

const getBaseUnit = (): number => {
  if (typeof window === 'undefined') return 16

  const rootStyles = getComputedStyle(document.documentElement)
  const rootFontSize = rootStyles.fontSize

  return parseFloat(rootFontSize) || 16
}

interface DockContextType {
  open: boolean
  toggleOpen: () => void
  toggleWithAnimation: () => Promise<void>
  menuBoxRef: RefObject<HTMLDivElement | null>
  navItemsRef: RefObject<HTMLDivElement | null>
  hamburgerRefs: {
    topRef: RefObject<SVGLineElement | null>
    midRef: RefObject<SVGLineElement | null>
    botRef: RefObject<SVGLineElement | null>
  }
  close: () => Promise<void>
  hasInteracted: boolean
}

const DockContext = createContext<DockContextType | undefined>(undefined)

export const useDock = () => {
  const context = useContext(DockContext)

  if (!context) {
    throw new Error('useDock must be used within a DockProvider')
  }

  return context
}

interface DockProviderProps {
  children: ReactNode
}

export const DockProvider = ({ children }: DockProviderProps) => {
  const [open, setOpen] = useState(false)
  const [hasInteracted, setHasInteracted] = useState(false)
  const menuBoxRef = useRef<HTMLDivElement>(null)
  const navItemsRef = useRef<HTMLDivElement>(null)

  // Hamburger button refs
  const topRef = useRef<SVGLineElement>(null)
  const midRef = useRef<SVGLineElement>(null)
  const botRef = useRef<SVGLineElement>(null)

  // Memoized hamburger refs object
  const hamburgerRefs = useMemo(
    () => ({
      topRef,
      midRef,
      botRef,
    }),
    [topRef, midRef, botRef],
  )

  const toggleOpen = useCallback(() => {
    setHasInteracted(true)
    setOpen((prevState) => !prevState)
  }, [])

  const openAnimation = useCallback(
    (menuBox: HTMLDivElement, navItems: HTMLDivElement) => {
      const { topRef, midRef, botRef } = hamburgerRefs
      const baseUnit = getBaseUnit()

      // Menu animation
      gsap.to(menuBox, { x: -7.5 * baseUnit, duration: 0.5 })
      gsap.to(navItems.children, {
        x: -3.625 * baseUnit,
        duration: 0.8,
        stagger: -0.1,
        delay: 0.1,
        ease: 'power1.inOut',
      })

      // Hamburger animation - open state
      if (topRef.current && midRef.current && botRef.current) {
        gsap.to(topRef.current, {
          y: 30,
          rotation: 45,
          transformOrigin: 'center',
          duration: 0.4,
          ease: 'power2.inOut',
        })
        gsap.to(botRef.current, {
          y: -30,
          rotation: -45,
          transformOrigin: 'center',
          duration: 0.4,
          ease: 'power2.inOut',
        })
        gsap.to(midRef.current, {
          opacity: 0,
          duration: 0.2,
          ease: 'power2.inOut',
        })
      }
    },
    [hamburgerRefs],
  )

  const closeAnimation = useCallback(
    (menuBox: HTMLDivElement, navItems: HTMLDivElement) => {
      const { topRef, midRef, botRef } = hamburgerRefs
      const baseUnit = getBaseUnit()

      // Dock container width animation
      const dockAnimation = Promise.resolve()

      // Menu animation
      const navItemsAnimation = gsap.to(navItems.children, {
        x: -31.25 * baseUnit,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power1.inOut',
      })
      const menuBoxAnimation = gsap.to(menuBox, {
        x: 0,
        duration: 0.5,
        delay: 0.1,
      })

      // Hamburger animation - close state
      if (topRef.current && midRef.current && botRef.current) {
        gsap.to(topRef.current, {
          y: 0,
          rotation: 0,
          transformOrigin: 'center',
          duration: 0.4,
          ease: 'power2.inOut',
        })
        gsap.to(botRef.current, {
          y: 0,
          rotation: 0,
          transformOrigin: 'center',
          duration: 0.4,
          ease: 'power2.inOut',
        })
        gsap.to(midRef.current, {
          opacity: 1,
          duration: 0.2,
          ease: 'power2.inOut',
        })
      }

      return Promise.all([navItemsAnimation, menuBoxAnimation, dockAnimation])
    },
    [hamburgerRefs],
  )

  const toggleWithAnimation = useCallback(async () => {
    setHasInteracted(true)
    const menuBox = menuBoxRef.current
    const navItems = navItemsRef.current

    if (!menuBox || !navItems) {
      toggleOpen()

      return
    }

    if (!open) {
      openAnimation(menuBox, navItems)
    } else {
      await closeAnimation(menuBox, navItems)
    }

    toggleOpen()
  }, [open, toggleOpen, openAnimation, closeAnimation])

  const close = useCallback(async () => {
    const menuBox = menuBoxRef.current
    const navItems = navItemsRef.current

    if (open && menuBox && navItems) {
      setHasInteracted(true)
      setOpen(false)

      // Use the existing closeAnimation function and wait for completion
      await closeAnimation(menuBox, navItems)
    }
  }, [open, closeAnimation])

  return (
    <DockContext.Provider
      value={{
        open,
        toggleOpen,
        toggleWithAnimation,
        menuBoxRef,
        navItemsRef,
        hamburgerRefs,
        close,
        hasInteracted,
      }}
    >
      {children}
    </DockContext.Provider>
  )
}
