import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

import { TempleBase } from '@/components/society-events/tampleBase'
import { GProps } from '@/components/society-events/type'

export const Temple = (props: GProps) => {
  const { ...rest } = props

  // Animasyon sürelerini yönetmek için obje
  const animationConfig = {
    circle: {
      fadeInDuration: 1,
      fadeOutDuration: 1,
      scaleIn: 1,
      scaleOut: 0.95,
      delay: 1,
      easeIn: 'elastic.out(1, 0.3)',
      easeOut: 'elastic.in(1, 0.3)',
    },
    text: {
      fadeInDuration: 1,
      fadeOutDuration: 1,
      delay: 0.5,
      ease: 'power2.out',
    },
  }

  // Temple initial state setup - animations will be controlled externally
  useGSAP(
    () => {
      // Set initial states - hide all elements
      gsap.set(['#temple-left-circle', '#temple-center-circle', '#temple-right-circle'], {
        opacity: 0,
        scale: animationConfig.circle.scaleOut,
        transformOrigin: 'center center',
      })

      gsap.set(
        ['#temple-left-circle-text', '#temple-center-circle-text', '#temple-right-circle-text'],
        {
          opacity: 0,
        },
      )

      gsap.set('#temple-gate-star', { transformOrigin: 'center center' })
    },
    { dependencies: [] },
  )

  return (
    <g {...rest}>
      <path
        d='M1443.74 -2.65039V1026.66H-3.73047V-2.65039H1443.74ZM713.44 446.93C652.628 446.93 603.33 496.228 603.33 557.04C603.33 617.852 652.628 667.149 713.44 667.149C774.252 667.149 823.55 617.852 823.55 557.04C823.55 496.228 774.252 446.93 713.44 446.93Z'
        fill='#EDEDED'
      />

      <g id='temple-gate-circle'>
        <path
          d='M713.44 667.15C774.252 667.15 823.55 617.852 823.55 557.04C823.55 496.228 774.252 446.93 713.44 446.93C652.628 446.93 603.33 496.228 603.33 557.04C603.33 617.852 652.628 667.15 713.44 667.15Z'
          fill='transparent'
          stroke='#F0002C'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        />

        <path
          id='temple-gate-star'
          d='M845.3 557.04C724.13 562.94 719.34 567.73 713.44 688.9C707.54 567.73 702.75 562.94 581.58 557.04C702.75 551.14 707.54 546.35 713.44 425.18C719.34 546.35 724.13 551.14 845.3 557.04Z'
          fill='transparent'
          stroke='#F0002C'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </g>

      {/* Center Circle */}

      <g id='temple-center-circle'>
        <path
          d='M713.44 278.45C774.252 278.45 823.55 229.152 823.55 168.34C823.55 107.528 774.252 58.23 713.44 58.23C652.628 58.23 603.33 107.528 603.33 168.34C603.33 229.152 652.628 278.45 713.44 278.45Z'
          fill='#EDEDED'
          stroke='#F0002C'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        />

        <path
          d='M845.3 168.34C724.13 174.24 719.34 179.03 713.44 300.2C707.54 179.03 702.75 174.24 581.58 168.34C702.75 162.44 707.54 157.65 713.44 36.48C719.34 157.65 724.13 162.44 845.3 168.34Z'
          fill='#EDEDED'
          stroke='#F0002C'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </g>

      <g id='temple-center-circle-text'>
        <text
          x='39.24%'
          y='33.55%'
          className='heading-s-medium fill-offblack-950 tracking-[0.105em]'
        >
          IDEAS ARE OFFERED LIKE
        </text>

        <text
          x='37.85%'
          y='36.9%'
          className='heading-s-medium fill-offblack-950 tracking-[0.105em]'
        >
          OBJECTS ON A VELVET TRAY
        </text>
      </g>

      {/* Left Circle */}

      <g id='temple-left-circle'>
        <path
          d='M198.86 409.97C259.672 409.97 308.97 360.672 308.97 299.86C308.97 239.048 259.672 189.75 198.86 189.75C138.048 189.75 88.75 239.048 88.75 299.86C88.75 360.672 138.048 409.97 198.86 409.97Z'
          fill='#EDEDED'
          stroke='#F0002C'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        />

        <path
          d='M330.72 299.86C209.55 305.76 204.76 310.55 198.86 431.72C192.96 310.55 188.17 305.76 67 299.86C188.17 293.96 192.96 289.17 198.86 168C204.76 289.17 209.55 293.96 330.72 299.86Z'
          fill='#EDEDED'
          stroke='#F0002C'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </g>

      <g id='temple-left-circle-text'>
        <text
          x='4.56%'
          y='49.37%'
          className='heading-s-medium fill-offblack-950 tracking-[0.108em]'
        >
          SHAPING THE UNSPOKEN
        </text>

        <text
          x='4.56%'
          y='52.73%'
          className='heading-s-medium fill-offblack-950 tracking-[0.108em]'
        >
          A CONVERSATION BECOMES
        </text>

        <text
          x='4.56%'
          y='56.05%'
          className='heading-s-medium fill-offblack-950 tracking-[0.108em]'
        >
          A SKETCH
        </text>
      </g>

      {/* Right Circle */}

      <g id='temple-right-circle'>
        <path
          d='M1227.86 409.97C1288.67 409.97 1337.97 360.672 1337.97 299.86C1337.97 239.048 1288.67 189.75 1227.86 189.75C1167.05 189.75 1117.75 239.048 1117.75 299.86C1117.75 360.672 1167.05 409.97 1227.86 409.97Z'
          fill='#EDEDED'
          stroke='#F0002C'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        />

        <path
          d='M1359.72 299.86C1238.55 305.76 1233.76 310.55 1227.86 431.72C1221.96 310.55 1217.17 305.76 1096 299.86C1217.17 293.96 1221.96 289.17 1227.86 168C1233.76 289.17 1238.55 293.96 1359.72 299.86Z'
          fill='#EDEDED'
          stroke='#F0002C'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </g>

      <g id='temple-right-circle-text'>
        <text
          x='76.35%'
          y='49.37%'
          className='heading-s-medium fill-offblack-950 tracking-[0.108em]'
        >
          NOTHING READY-MADE
        </text>

        <text
          x='70.28%'
          y='52.73%'
          className='heading-s-medium fill-offblack-950 tracking-[0.108em]'
        >
          ONLY WHAT RESONATES STAYS
        </text>
      </g>

      <TempleBase />
    </g>
  )
}
