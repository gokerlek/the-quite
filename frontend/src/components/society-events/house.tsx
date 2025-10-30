import { useRef } from 'react'

import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

import { BaseHouse } from '@/components/society-events/baseHouse'
import { GProps } from '@/components/society-events/type'

interface TempleProps extends GProps {
  startAnimation: boolean
}

export const House = (props: TempleProps) => {
  const { startAnimation, ...rest } = props
  const timelineRef = useRef<gsap.core.Timeline | null>(null)

  // House animasyon konfigürasyonu
  const animationConfig = {
    startDelay: 2, // startAnimation'dan sonra 2s bekle
    circles: {
      fadeInDuration: 0.5,
      fadeOutDuration: 0.5,
      holdDuration: 1, // 1 saniye görünür kal
      ease: 'power2.out',
    },
    door: {
      // Gelecek aşama için hazır
      openDuration: 1,
      closeDuration: 1,
      ease: 'power2.inOut',
    },
  }

  // Element reset fonksiyonu
  const resetElements = () => {
    gsap.set(['#first-circles', '#second-circles', '#third-circles'], {
      opacity: 0,
    })
  }

  // Timeline cleanup fonksiyonu
  const cleanupAnimation = () => {
    if (timelineRef.current) {
      timelineRef.current.kill()
      timelineRef.current = null
    }

    resetElements()
  }

  // House circle animasyon sekansı
  useGSAP(
    () => {
      console.log('DEBUG: House useGSAP called, startAnimation:', startAnimation)

      // Önce cleanup yap
      cleanupAnimation()

      if (!startAnimation) {
        console.log('DEBUG: House startAnimation is false, elements should be hidden')

        return
      }

      // Element reset
      resetElements()

      // Sequential animasyon timeline
      const tl = gsap.timeline()

      timelineRef.current = tl

      tl
        // 2 saniye bekle, sonra animasyona başla
        .delay(animationConfig.startDelay)

        // First circles: fade in → hold → fade out
        .to('#first-circles', {
          opacity: 1,
          duration: animationConfig.circles.fadeInDuration,
          ease: animationConfig.circles.ease,
        })
        .to(
          '#first-circles',
          {
            opacity: 0,
            duration: animationConfig.circles.fadeOutDuration,
            ease: animationConfig.circles.ease,
          },
          `+=${animationConfig.circles.holdDuration}`,
        )

        // Second circles: aynı pattern
        .to('#second-circles', {
          opacity: 1,
          duration: animationConfig.circles.fadeInDuration,
          ease: animationConfig.circles.ease,
        })
        .to(
          '#second-circles',
          {
            opacity: 0,
            duration: animationConfig.circles.fadeOutDuration,
            ease: animationConfig.circles.ease,
          },
          `+=${animationConfig.circles.holdDuration}`,
        )

        // Third circles: aynı pattern
        .to('#third-circles', {
          opacity: 1,
          duration: animationConfig.circles.fadeInDuration,
          ease: animationConfig.circles.ease,
        })
        .to(
          '#third-circles',
          {
            opacity: 0,
            duration: animationConfig.circles.fadeOutDuration,
            ease: animationConfig.circles.ease,
          },
          `+=${animationConfig.circles.holdDuration}`,
        )

      console.log('DEBUG: House circle timeline created')

      // Return cleanup function
      return () => {
        cleanupAnimation()
      }
    },
    { dependencies: [startAnimation] },
  )

  return (
    <g {...rest}>
      <BaseHouse />

      <g id='first-circles' className='opacity-0'>
        <path
          d='M228.1 333.5C256.752 333.5 279.98 310.273 279.98 281.62C279.98 252.968 256.752 229.74 228.1 229.74C199.447 229.74 176.22 252.968 176.22 281.62C176.22 310.273 199.447 333.5 228.1 333.5Z'
          fill='#EDEDED'
          stroke='#F0002C'
          strokeWidth='2.56'
          strokeLinecap='round'
          strokeLinejoin='round'
        />

        <path
          d='M296.17 281.62C233.62 284.67 231.14 287.14 228.1 349.69C225.05 287.14 222.58 284.66 160.03 281.62C222.58 278.57 225.06 276.1 228.1 213.55C231.15 276.1 233.62 278.58 296.17 281.62Z'
          fill='#EDEDED'
          stroke='#F0002C'
          strokeWidth='2.56'
          strokeLinecap='round'
          strokeLinejoin='round'
        />

        <path
          d='M1211.9 333.5C1183.25 333.5 1160.02 310.273 1160.02 281.62C1160.02 252.968 1183.25 229.74 1211.9 229.74C1240.55 229.74 1263.78 252.968 1263.78 281.62C1263.78 310.273 1240.55 333.5 1211.9 333.5Z'
          fill='#EDEDED'
          stroke='#F0002C'
          strokeWidth='2.56'
          strokeLinecap='round'
          strokeLinejoin='round'
        />

        <path
          d='M1143.83 281.62C1206.38 284.67 1208.86 287.14 1211.9 349.69C1214.95 287.14 1217.42 284.66 1279.97 281.62C1217.42 278.57 1214.94 276.1 1211.9 213.55C1208.85 276.1 1206.38 278.58 1143.83 281.62Z'
          fill='#EDEDED'
          stroke='#F0002C'
          strokeWidth='2.56'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </g>

      <g id='second-circles' className='opacity-0'>
        <path
          d='M1002.5 439C986.208 439 973 425.792 973 409.5C973 393.208 986.208 380 1002.5 380C1018.79 380 1032 393.208 1032 409.5C1032 425.792 1018.79 439 1002.5 439Z'
          fill='#EDEDED'
          stroke='#F0002C'
          strokeWidth='1.86'
          strokeLinecap='round'
          strokeLinejoin='round'
        />

        <path
          d='M964 409.5C999.837 411.225 1001.26 412.622 1003 448C1004.75 412.622 1006.16 411.219 1042 409.5C1006.16 407.775 1004.74 406.378 1003 371C1001.25 406.378 999.837 407.781 964 409.5Z'
          fill='#EDEDED'
          stroke='#F0002C'
          strokeWidth='1.86'
          strokeLinecap='round'
          strokeLinejoin='round'
        />

        <path
          d='M437.5 439C453.792 439 467 425.792 467 409.5C467 393.208 453.792 380 437.5 380C421.208 380 408 393.208 408 409.5C408 425.792 421.208 439 437.5 439Z'
          fill='#EDEDED'
          stroke='#F0002C'
          strokeWidth='1.86'
          strokeLinecap='round'
          strokeLinejoin='round'
        />

        <path
          d='M476 409.5C440.163 411.225 438.742 412.622 437 448C435.253 412.622 433.837 411.219 398 409.5C433.837 407.775 435.258 406.378 437 371C438.747 406.378 440.163 407.781 476 409.5Z'
          fill='#EDEDED'
          stroke='#F0002C'
          strokeWidth='1.86'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </g>

      <g id='third-circles' className='opacity-0'>
        <path
          d='M547.5 531C563.792 531 577 517.792 577 501.5C577 485.208 563.792 472 547.5 472C531.208 472 518 485.208 518 501.5C518 517.792 531.208 531 547.5 531Z'
          fill='#EDEDED'
          stroke='#F0002C'
          strokeWidth='1.86'
          strokeLinecap='round'
          strokeLinejoin='round'
        />

        <path
          d='M586 501.5C550.163 503.225 548.742 504.622 547 540C545.253 504.622 543.837 503.219 508 501.5C543.837 499.775 545.258 498.378 547 463C548.747 498.378 550.163 499.781 586 501.5Z'
          fill='#EDEDED'
          stroke='#F0002C'
          strokeWidth='1.86'
          strokeLinecap='round'
          strokeLinejoin='round'
        />

        <path
          d='M892.5 531C876.208 531 863 517.792 863 501.5C863 485.208 876.208 472 892.5 472C908.792 472 922 485.208 922 501.5C922 517.792 908.792 531 892.5 531Z'
          fill='#EDEDED'
          stroke='#F0002C'
          strokeWidth='1.86'
          strokeLinecap='round'
          strokeLinejoin='round'
        />

        <path
          d='M854 501.5C889.837 503.225 891.258 504.622 893 540C894.747 504.622 896.163 503.219 932 501.5C896.163 499.775 894.742 498.378 893 463C891.253 498.378 889.837 499.781 854 501.5Z'
          fill='#EDEDED'
          stroke='#F0002C'
          strokeWidth='1.86'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </g>
    </g>
  )
}
