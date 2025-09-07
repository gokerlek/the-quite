'use client'

import { ForwardedRef, forwardRef } from 'react'

export const HeroLogo = forwardRef(function HeroLogo(_: {}, ref: ForwardedRef<SVGSVGElement>) {
  return (
    <svg
      ref={ref}
      id='quiet-drawing-logo'
      viewBox='0 0 860 654'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className='fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[20vw] pointer-events-none min-w-40'
      shapeRendering='geometricPrecision'
      opacity={0}
    >
      {/* Path content is sourced from page.tsx original SVG */}
      <path
        id='quiet-drawing-path'
        strokeWidth='7.5'
        className='stroke-offblack-50'
        strokeMiterlimit='10'
        fill='none'
      />
    </svg>
  )
})
