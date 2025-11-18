import { useRef } from 'react'

import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

interface StarProps {
  strokeWidth?: number
  animationEnabled?: boolean
  animationDelay?: number
  d: {
    star: string
    base: string
  }
  id: string
}

export const Star = ({
  animationEnabled = true,
  animationDelay = 0,
  d,
  id,
  strokeWidth,
}: StarProps) => {
  const groupRef = useRef<SVGGElement>(null)

  // Wave/Ripple Animation
  useGSAP(
    () => {
      if (!animationEnabled) return

      // Delay ile animasyonu başlat
      gsap.fromTo(
        `#${id}-wave-path`,
        {
          scale: 0,
          opacity: 0.2,
          transformOrigin: 'center center',
        },
        {
          scale: 1.8,
          opacity: 0,
          duration: 2,
          repeat: -1,
          delay: animationDelay,
          ease: 'power2.out',
          transformOrigin: 'center center',
        },
      )
    },
    { scope: groupRef, dependencies: [animationEnabled, animationDelay] },
  )

  return (
    <g ref={groupRef}>
      {/* Base/Static Path */}
      <path
        d={d.base}
        fill='#EDEDED'
        stroke='#F0002C'
        strokeWidth={strokeWidth ?? 2}
        strokeLinecap='round'
        strokeLinejoin='round'
      />

      {/* Wave/Ripple Path - Only visible when animation is enabled */}
      {animationEnabled && (
        <path
          id={`${id}-wave-path`}
          d={d.star}
          fill='#F0002C'
          stroke='#F0002C'
          strokeWidth={strokeWidth ?? 2}
          strokeLinecap='round'
          strokeLinejoin='round'
          opacity='0'
        />
      )}

      <path
        d={d.star}
        stroke='#F0002C'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </g>
  )
}
