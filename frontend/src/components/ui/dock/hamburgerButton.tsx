import { useEffect, useRef } from 'react'

import gsap from 'gsap'

import { useDock } from './dockContext'

export const HamburgerButton = () => {
  const { open, toggleWithAnimation } = useDock()
  const tlRef = useRef<gsap.core.Timeline | null>(null)
  const topRef = useRef<SVGLineElement | null>(null)
  const midRef = useRef<SVGLineElement | null>(null)
  const botRef = useRef<SVGLineElement | null>(null)

  // Create timeline once
  useEffect(() => {
    const tl = gsap.timeline({ paused: true })

    if (topRef.current && midRef.current && botRef.current) {
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
    }

    tlRef.current = tl

    return () => {
      tl.kill()
      tlRef.current = null
    }
  }, [])

  // React to prop changes
  useEffect(() => {
    const tl = tlRef.current

    if (!tl) return

    if (open) {
      tl.play()
    } else {
      tl.reverse()
    }
  }, [open])

  return (
    <button
      type='button'
      onClick={toggleWithAnimation}
      className='border bg-offblack-50 border-offblack-950 size-12 min-w-12 flex items-center justify-center cursor-pointer z-50'
      aria-label={open ? 'Close menu' : 'Open menu'}
      aria-pressed={open}
    >
      <svg viewBox='0 0 200 200' width='100%' height='100%' aria-hidden='true'>
        <g fill='none' strokeWidth={10} className='stroke-offblack-950'>
          <line ref={topRef} x1='60' y1='70' x2='140' y2='70' />

          <line ref={midRef} x1='60' y1='100' x2='140' y2='100' />

          <line ref={botRef} x1='60' y1='130' x2='140' y2='130' />
        </g>
      </svg>
    </button>
  )
}
