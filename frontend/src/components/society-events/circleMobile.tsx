import { useRef } from 'react'

import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'

import { BaseCircleMobile } from '@/components/society-events/baseCircleMobile'
import { GProps } from '@/components/society-events/type'
import { useCircleAnimation } from '@/components/society-events/useCircleAnimation'

export const CircleMobile = (props: GProps) => {
  const centerCircleRef = useRef<SVGPathElement>(null)
  const circle1Animation = useCircleAnimation()
  const circle2Animation = useCircleAnimation()
  const circle3Animation = useCircleAnimation()
  const circle4Animation = useCircleAnimation()
  const circle5Animation = useCircleAnimation()
  const circle6Animation = useCircleAnimation()

  // Center circle initial state - glow will be controlled externally
  useGSAP(() => {
    if (!centerCircleRef.current) return

    // Set initial state only
    gsap.set(centerCircleRef.current, {
      stroke: '#1C1C1C',
      filter: 'none',
      strokeWidth: 1.5,
    })
  }, [])

  return (
    <svg viewBox='0 0 375 852' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <g {...props}>
        <BaseCircleMobile />

        <path
          ref={centerCircleRef}
          id='center-circle'
          d='M187.499 479.91C202.835 479.91 215.269 467.477 215.269 452.14C215.269 436.803 202.835 424.37 187.499 424.37C172.162 424.37 159.729 436.803 159.729 452.14C159.729 467.477 172.162 479.91 187.499 479.91Z'
          stroke='#1C1C1C'
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        />

        <g id='circle1' ref={circle1Animation.elementRef}>
          <path
            d='M143.31 582.91C162.783 582.91 178.57 567.124 178.57 547.65C178.57 528.177 162.783 512.39 143.31 512.39C123.836 512.39 108.05 528.177 108.05 547.65C108.05 567.124 123.836 582.91 143.31 582.91Z'
            fill='#EDEDED'
            stroke='#F0002C'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
          />

          <path
            d='M176.8 547.65C146.03 549.15 144.81 550.37 143.31 581.14C141.81 550.37 140.59 549.15 109.82 547.65C140.59 546.15 141.81 544.93 143.31 514.16C144.81 544.93 146.03 546.15 176.8 547.65Z'
            fill='#EDEDED'
            stroke='#F0002C'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </g>

        <g id='circle2' ref={circle2Animation.elementRef}>
          <path
            d='M87.0799 418.61C105.278 418.61 120.03 403.858 120.03 385.66C120.03 367.462 105.278 352.71 87.0799 352.71C68.8821 352.71 54.1299 367.462 54.1299 385.66C54.1299 403.858 68.8821 418.61 87.0799 418.61Z'
            fill='#EDEDED'
            stroke='#F0002C'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
          />

          <path
            d='M120.03 385.66C89.7499 387.14 88.5599 388.33 87.0799 418.61C85.5999 388.33 84.4099 387.14 54.1299 385.66C84.4099 384.18 85.5999 382.99 87.0799 352.71C88.5599 382.99 89.7499 384.18 120.03 385.66Z'
            fill='#EDEDED'
            stroke='#F0002C'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </g>

        <g id='circle3' ref={circle3Animation.elementRef}>
          <path
            d='M276.95 400.74C291.21 400.74 302.77 389.18 302.77 374.92C302.77 360.66 291.21 349.1 276.95 349.1C262.69 349.1 251.13 360.66 251.13 374.92C251.13 389.18 262.69 400.74 276.95 400.74Z'
            fill='#EDEDED'
            stroke='#F0002C'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
          />

          <path
            d='M302.75 374.92C279.04 376.08 278.1 377.01 276.95 400.72C275.79 377.01 274.86 376.07 251.15 374.92C274.86 373.76 275.8 372.83 276.95 349.12C278.11 372.83 279.04 373.77 302.75 374.92Z'
            fill='#EDEDED'
            stroke='#F0002C'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </g>

        <g id='circle4' ref={circle4Animation.elementRef}>
          <path
            d='M82.1303 494.41C94.1756 494.41 103.94 484.645 103.94 472.6C103.94 460.555 94.1756 450.79 82.1303 450.79C70.085 450.79 60.3203 460.555 60.3203 472.6C60.3203 484.645 70.085 494.41 82.1303 494.41Z'
            fill='#EDEDED'
            stroke='#F0002C'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
          />

          <path
            d='M103.15 472.6C83.8304 473.54 83.0703 474.3 82.1303 493.62C81.1903 474.3 80.4304 473.54 61.1104 472.6C80.4304 471.66 81.1903 470.9 82.1303 451.58C83.0703 470.9 83.8304 471.66 103.15 472.6Z'
            fill='#EDEDED'
            stroke='#F0002C'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </g>

        <g id='circle5' ref={circle5Animation.elementRef}>
          <path
            d='M252.07 485.73C258.128 485.73 263.04 480.819 263.04 474.76C263.04 468.701 258.128 463.79 252.07 463.79C246.011 463.79 241.1 468.701 241.1 474.76C241.1 480.819 246.011 485.73 252.07 485.73Z'
            fill='#EDEDED'
            stroke='#F0002C'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
          />

          <path
            d='M271.11 474.76C253.61 475.61 252.91 476.3 252.06 493.81C251.21 476.31 250.52 475.61 233.01 474.76C250.51 473.91 251.21 473.22 252.06 455.71C252.91 473.21 253.6 473.91 271.11 474.76Z'
            fill='#EDEDED'
            stroke='#F0002C'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </g>

        <g id='circle6' ref={circle6Animation.elementRef}>
          <path
            d='M179.21 356.08C190.764 356.08 200.13 346.714 200.13 335.16C200.13 323.606 190.764 314.24 179.21 314.24C167.656 314.24 158.29 323.606 158.29 335.16C158.29 346.714 167.656 356.08 179.21 356.08Z'
            fill='#EDEDED'
            stroke='#F0002C'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
          />

          <path
            d='M200.13 335.16C180.91 336.1 180.15 336.86 179.21 356.08C178.27 336.86 177.51 336.1 158.29 335.16C177.51 334.22 178.27 333.46 179.21 314.24C180.15 333.46 180.91 334.22 200.13 335.16Z'
            fill='#EDEDED'
            stroke='#F0002C'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </g>

        <g id='lines-group'>
          <path
            d='M720 588.21C762.31 588.21 796.61 553.911 796.61 511.6C796.61 469.289 762.31 434.99 720 434.99C677.689 434.99 643.39 469.289 643.39 511.6C643.39 553.911 677.689 588.21 720 588.21Z'
            fill='#EDEDED'
          />
        </g>
      </g>
    </svg>
  )
}
