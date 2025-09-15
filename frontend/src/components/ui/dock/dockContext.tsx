'use client'

import {
  createContext,
  ReactNode,
  RefObject,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'

import gsap from 'gsap'

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
  const hamburgerRefs = {
    topRef: useRef<SVGLineElement>(null),
    midRef: useRef<SVGLineElement>(null),
    botRef: useRef<SVGLineElement>(null),
  }

  // Hamburger animation timeline
  const hamburgerTimelineRef = useRef<gsap.core.Timeline | null>(null)

  // Initialize hamburger timeline
  useEffect(() => {
    const { topRef, midRef, botRef } = hamburgerRefs

    if (topRef.current && midRef.current && botRef.current) {
      const tl = gsap.timeline({ paused: true })

      tl.to(topRef.current, {
        y: 30,
        rotation: 45,
        transformOrigin: 'center center',
        duration: 0.4,
        ease: 'power2.inOut',
      })
        .to(
          botRef.current,
          {
            y: -30,
            rotation: -45,
            transformOrigin: 'center center',
            duration: 0.4,
            ease: 'power2.inOut',
          },
          0,
        )
        .to(
          midRef.current,
          {
            opacity: 0,
            duration: 0.2,
            ease: 'power2.inOut',
          },
          0,
        )

      hamburgerTimelineRef.current = tl
    }

    return () => {
      if (hamburgerTimelineRef.current) {
        hamburgerTimelineRef.current.kill()
        hamburgerTimelineRef.current = null
      }
    }
  }, [])

  const toggleOpen = useCallback(() => {
    setHasInteracted(true)
    setOpen((prevState) => !prevState)
  }, [])

  // Handle hamburger animation based on open state
  useEffect(() => {
    const tl = hamburgerTimelineRef.current

    if (tl) {
      if (open) {
        tl.play()
      } else {
        tl.reverse()
      }
    }
  }, [open])

  const openAnimation = useCallback((menuBox: HTMLDivElement, navItems: HTMLDivElement) => {
    gsap.to(menuBox, { x: -120, duration: 0.5 })
    gsap.to(navItems.children, {
      x: -58,
      duration: 0.8,
      stagger: -0.1,
      delay: 0.1,
      ease: 'power1.inOut',
    })
  }, [])

  const closeAnimation = useCallback((menuBox: HTMLDivElement, navItems: HTMLDivElement) => {
    const navItemsAnimation = gsap.to(navItems.children, {
      x: -500,
      duration: 0.8,
      stagger: 0.1,
      ease: 'power1.inOut',
    })
    const menuBoxAnimation = gsap.to(menuBox, {
      x: 0,
      duration: 0.5,
      delay: 0.1,
    })

    return Promise.all([navItemsAnimation, menuBoxAnimation])
  }, [])

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
