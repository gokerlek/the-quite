import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

import { TempleBaseMobile } from '@/components/society-events/templeBaseMobile'
import { TempleText1Mobile } from '@/components/society-events/templeText1Mobile'
import { TempleText2Mobile } from '@/components/society-events/templeText2Mobile'
import { TempleText3Mobile } from '@/components/society-events/templeText3Mobile'
import { GProps } from '@/components/society-events/type'

export const TempleMobile = (props: GProps) => {
  const { ...rest } = props

  useGSAP(
    () => {
      gsap.set(['#temple-text-1', '#temple-text-2', '#temple-text-3'], {
        opacity: 0,
      })

      gsap.set('#temple-gate-star', { transformOrigin: 'center center' })
    },
    { dependencies: [] },
  )

  return (
    <svg viewBox='0 0 375 852' fill='none' xmlns='http://www.w3.org/2000/svg' {...rest}>
      <TempleBaseMobile />

      <TempleText1Mobile id='temple-text-1' />

      <TempleText2Mobile id='temple-text-2' />

      <TempleText3Mobile id='temple-text-3' />

      <g id='temple-gate-circle'>
        <path
          d='M183.99 642.27C216.564 642.27 242.97 615.864 242.97 583.29C242.97 550.716 216.564 524.31 183.99 524.31C151.416 524.31 125.01 550.716 125.01 583.29C125.01 615.864 151.416 642.27 183.99 642.27Z'
          fill='transparent'
          stroke='#F0002C'
          strokeWidth='1.37'
          strokeLinecap='round'
          strokeLinejoin='round'
        />

        <path
          id='temple-gate-star'
          d='M254.62 583.29C189.71 586.45 187.15 589.02 183.98 653.93C180.82 589.02 178.25 586.46 113.34 583.29C178.25 580.13 180.81 577.56 183.98 512.65C187.14 577.56 189.71 580.12 254.62 583.29Z'
          fill='transparent'
          stroke='#F0002C'
          strokeWidth='1.37'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </g>

      <path
        d='M183.99 363.74C216.564 363.74 242.97 337.334 242.97 304.76C242.97 272.186 216.564 245.78 183.99 245.78C151.416 245.78 125.01 272.186 125.01 304.76C125.01 337.334 151.416 363.74 183.99 363.74Z'
        fill='#EDEDED'
        stroke='#F0002C'
        strokeWidth='1.37'
        strokeLinecap='round'
        strokeLinejoin='round'
      />

      <path
        id='temple-center-star'
        d='M254.62 304.76C189.71 307.92 187.15 310.49 183.98 375.4C180.82 310.49 178.25 307.93 113.34 304.76C178.25 301.6 180.81 299.03 183.98 234.12C187.14 299.03 189.71 301.59 254.62 304.76Z'
        fill='#EDEDED'
        stroke='#F0002C'
        strokeWidth='1.37'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}
