import { useRef } from 'react'

import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'

import { BaseCircle } from '@/components/society-events/baseCircle'
import { GProps } from '@/components/society-events/type'

import { useCircleAnimation } from './useCircleAnimation'

export const Circle = (props: GProps) => {
  // Her circle için ayrı animasyon hook'ları
  const circle1Animation = useCircleAnimation()
  const circle2Animation = useCircleAnimation()
  const circle3Animation = useCircleAnimation()
  const circle4Animation = useCircleAnimation()
  const circle5Animation = useCircleAnimation()
  const circle6Animation = useCircleAnimation()

  // Center circle için ref
  const centerCircleRef = useRef<SVGPathElement>(null)

  // Center circle initial state - glow will be controlled externally
  useGSAP(() => {
    if (!centerCircleRef.current) return

    // Set initial state only
    gsap.set(centerCircleRef.current, {
      stroke: '#1C1C1C',
      filter: 'none',
      strokeWidth: 2,
    })
  }, [])

  return (
    <svg viewBox='0 0 1440 1024' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <g {...props}>
        <BaseCircle />

        <path
          ref={centerCircleRef}
          id='center-circle'
          d='M720 588.21C762.31 588.21 796.61 553.911 796.61 511.6C796.61 469.289 762.31 434.99 720 434.99C677.689 434.99 643.39 469.289 643.39 511.6C643.39 553.911 677.689 588.21 720 588.21Z'
          stroke='#1C1C1C'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        />

        <g id='base-circle'>
          <path
            d='M574.2 236.74C546.96 251.18 522.1 269.58 500.04 291.63C489.8 301.88 480.35 312.72 471.71 324.12C456.27 344.53 443.43 366.74 433.38 390.5C425.67 408.7 419.77 427.45 415.71 446.6C411.2 467.81 408.93 489.53 408.93 511.59C408.93 535.29 411.55 558.59 416.75 581.29C420.76 598.8 426.31 615.96 433.38 632.67C444.06 657.92 457.88 681.43 474.66 702.88C482.48 712.89 490.95 722.46 500.03 731.55C523.24 754.76 549.55 773.91 578.47 788.68C585.15 792.09 591.96 795.26 598.9 798.2C637.26 814.43 677.99 822.65 719.98 822.65C725.33 822.65 730.66 822.51 735.96 822.25C772.31 820.42 807.59 812.36 841.07 798.2C849.51 794.63 857.76 790.71 865.8 786.44C893.04 771.99 917.89 753.6 939.95 731.54C950.19 721.3 959.64 710.45 968.27 699.05C983.72 678.64 996.56 656.44 1006.6 632.67C1014.3 614.46 1020.2 595.72 1024.26 576.57C1028.78 555.36 1031.05 533.64 1031.05 511.59C1031.05 487.89 1028.43 464.58 1023.22 441.88C1019.21 424.37 1013.66 407.2 1006.6 390.5C995.92 365.25 982.1 341.74 965.32 320.29C957.5 310.28 949.04 300.72 939.95 291.63C916.74 268.42 890.43 249.27 861.51 234.5'
            stroke='#1C1C1C'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />

          <path
            d='M580.2 248.07C541.64 268.56 508.11 297.28 481.96 331.88C456.12 366.04 437.48 405.93 428.27 449.3C423.99 469.4 421.75 490.24 421.75 511.6C421.75 534.58 424.35 556.95 429.27 578.44C439.16 621.62 458.41 661.23 484.79 695.01C511.47 729.17 545.43 757.37 584.32 777.28C625.02 798.11 671.14 809.86 720 809.86C725.14 809.86 730.25 809.73 735.33 809.48C780.14 807.21 822.36 795.05 859.81 775.13C898.37 754.64 931.89 725.93 958.05 691.33C983.89 657.17 1002.54 617.28 1011.75 573.9C1016.03 553.8 1018.27 532.96 1018.27 511.59C1018.27 488.61 1015.67 466.25 1010.75 444.76C1000.87 401.58 981.61 361.97 955.23 328.19C928.56 294.03 894.6 265.83 855.7 245.92'
            stroke='#1C1C1C'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </g>

        <g
          id='circle1'
          ref={circle1Animation.elementRef}
          onMouseEnter={circle1Animation.handleMouseEnter}
          onMouseLeave={circle1Animation.handleMouseLeave}
        >
          <path
            d='M442.97 419.09C493.173 419.09 533.87 378.393 533.87 328.19C533.87 277.987 493.173 237.29 442.97 237.29C392.768 237.29 352.07 277.987 352.07 328.19C352.07 378.393 392.768 419.09 442.97 419.09Z'
            fill='#EDEDED'
            stroke='#F0002C'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />

          <path
            d='M533.86 328.19C450.33 332.26 447.03 335.56 442.96 419.09C438.89 335.56 435.59 332.26 352.06 328.19C435.59 324.12 438.89 320.82 442.96 237.29C447.03 320.82 450.33 324.12 533.86 328.19Z'
            fill='#EDEDED'
            stroke='#F0002C'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </g>

        <g
          id='circle2'
          ref={circle2Animation.elementRef}
          onMouseEnter={circle2Animation.handleMouseEnter}
          onMouseLeave={circle2Animation.handleMouseLeave}
        >
          <path
            d='M966.76 369.77C1006.09 369.77 1037.98 337.884 1037.98 298.55C1037.98 259.216 1006.09 227.33 966.76 227.33C927.426 227.33 895.54 259.216 895.54 298.55C895.54 337.884 927.426 369.77 966.76 369.77Z'
            fill='#EDEDED'
            stroke='#F0002C'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />

          <path
            d='M1037.94 298.55C972.53 301.74 969.94 304.32 966.76 369.73C963.57 304.32 960.99 301.73 895.58 298.55C960.99 295.36 963.58 292.78 966.76 227.37C969.95 292.78 972.53 295.37 1037.94 298.55Z'
            fill='#EDEDED'
            stroke='#F0002C'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </g>

        <g
          id='circle3'
          ref={circle3Animation.elementRef}
          onMouseEnter={circle3Animation.handleMouseEnter}
          onMouseLeave={circle3Animation.handleMouseLeave}
        >
          <path
            d='M429.32 628.18C462.54 628.18 489.47 601.25 489.47 568.03C489.47 534.81 462.54 507.88 429.32 507.88C396.1 507.88 369.17 534.81 369.17 568.03C369.17 601.25 396.1 628.18 429.32 628.18Z'
            fill='#EDEDED'
            stroke='#F0002C'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />

          <path
            d='M487.31 568.03C434.02 570.63 431.91 572.73 429.31 626.03C426.71 572.74 424.61 570.63 371.31 568.03C424.6 565.43 426.71 563.33 429.31 510.03C431.91 563.32 434.01 565.43 487.31 568.03Z'
            fill='#EDEDED'
            stroke='#F0002C'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </g>

        <g
          id='circle4'
          ref={circle4Animation.elementRef}
          onMouseEnter={circle4Animation.handleMouseEnter}
          onMouseLeave={circle4Animation.handleMouseLeave}
        >
          <path
            d='M898.12 604.24C914.827 604.24 928.37 590.697 928.37 573.99C928.37 557.283 914.827 543.74 898.12 543.74C881.414 543.74 867.87 557.283 867.87 573.99C867.87 590.697 881.414 604.24 898.12 604.24Z'
            fill='#EDEDED'
            stroke='#F0002C'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />

          <path
            d='M950.67 573.99C902.38 576.34 900.47 578.25 898.12 626.54C895.77 578.25 893.86 576.34 845.57 573.99C893.86 571.64 895.77 569.73 898.12 521.44C900.47 569.73 902.38 571.64 950.67 573.99Z'
            fill='#EDEDED'
            stroke='#F0002C'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </g>

        <g
          id='circle5'
          ref={circle5Animation.elementRef}
          onMouseEnter={circle5Animation.handleMouseEnter}
          onMouseLeave={circle5Animation.handleMouseLeave}
        >
          <path
            d='M598.11 872.35C651.831 872.35 695.38 828.801 695.38 775.08C695.38 721.359 651.831 677.81 598.11 677.81C544.389 677.81 500.84 721.359 500.84 775.08C500.84 828.801 544.389 872.35 598.11 872.35Z'
            fill='#EDEDED'
            stroke='#F0002C'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />

          <path
            d='M690.49 775.08C605.6 779.22 602.24 782.57 598.11 867.46C593.97 782.57 590.62 779.21 505.73 775.08C590.62 770.94 593.98 767.59 598.11 682.7C602.25 767.59 605.6 770.95 690.49 775.08Z'
            fill='#EDEDED'
            stroke='#F0002C'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </g>

        <g
          id='circle6'
          ref={circle6Animation.elementRef}
          onMouseEnter={circle6Animation.handleMouseEnter}
          onMouseLeave={circle6Animation.handleMouseLeave}
        >
          <path
            d='M911.54 800.94C947.687 800.94 976.99 771.637 976.99 735.49C976.99 699.343 947.687 670.04 911.54 670.04C875.393 670.04 846.09 699.343 846.09 735.49C846.09 771.637 875.393 800.94 911.54 800.94Z'
            fill='#EDEDED'
            stroke='#F0002C'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />

          <path
            d='M976.99 735.49C916.85 738.42 914.47 740.8 911.54 800.94C908.61 740.8 906.23 738.42 846.09 735.49C906.23 732.56 908.61 730.18 911.54 670.04C914.47 730.18 916.85 732.56 976.99 735.49Z'
            fill='#EDEDED'
            stroke='#F0002C'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </g>

        <g id='lines-group'>
          <path
            d='M720 511.6V511.59L684.1 443.91L496.27 89.8398'
            stroke='#1C1C1C'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />

          <path
            d='M720 511.6L937.15 86.4102'
            stroke='#1C1C1C'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </g>
      </g>
    </svg>
  )
}
