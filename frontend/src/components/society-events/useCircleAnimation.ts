import { useRef } from 'react'

import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'

import { getRandomAnimationConfig } from './animationConfigs'

export const useCircleAnimation = (circleId?: string) => {
  const elementRef = useRef<SVGGElement>(null)
  const timelineRef = useRef<gsap.core.Timeline | null>(null)

  useGSAP(() => {
    if (!elementRef.current) return

    const config = getRandomAnimationConfig()
    const timelines: gsap.core.Timeline[] = []

    // Hangi animasyonların atandığını logla
    const activeAnimations = []

    if (config.rotate)
      activeAnimations.push(`rotate(${config.rotate.direction}, ${config.rotate.duration}s)`)

    if (config.drift)
      activeAnimations.push(`drift(${config.drift.intensity}, ${config.drift.duration}s)`)

    if (config.pulse)
      activeAnimations.push(
        `pulse(${config.pulse.minScale}-${config.pulse.maxScale}, ${config.pulse.duration}s)`,
      )

    console.log(
      `🎯 ${circleId || 'Circle'}: [${activeAnimations.join(', ')}] | Start delay: ${config.startDelay.toFixed(2)}s`,
    )

    // SVG için transform origin'i optimize et
    gsap.set(elementRef.current, {
      transformOrigin: '50% 50%',
      transform: 'translate3d(0,0,0)', // Hardware acceleration için
    })

    // Rotate animasyonu - elastic sallanma
    if (config.rotate) {
      const maxRotation = 20
      const rotationDirection = config.rotate.direction === 'clockwise' ? maxRotation : -maxRotation

      const rotateTimeline = gsap.timeline({
        repeat: -1,
        delay: config.startDelay,
      })

      // Smooth elastic hareket - yoyo yerine iki ayrı hareket
      rotateTimeline
        .to(elementRef.current, {
          rotation: rotationDirection,
          duration: config.rotate.duration / 2,
          ease: 'elastic.out(1, 0.3)',
        })
        .to(elementRef.current, {
          rotation: 0,
          duration: config.rotate.duration / 2,
          ease: 'elastic.out(1, 0.3)',
        })

      timelines.push(rotateTimeline)
    }

    // Drift animasyonu - smooth sallanma hareketi
    if (config.drift) {
      const intensity = config.drift.intensity * 16 // rem'i px'e çevir

      const driftTimeline = gsap.timeline({
        repeat: -1,
        delay: config.startDelay + 0.5,
      })

      // Smooth sallanma döngüsü - yay gibi
      driftTimeline
        // Sağa yukarı sallan
        .to(elementRef.current, {
          x: intensity * 0.8,
          y: -intensity * 0.6,
          duration: config.drift.duration / 4,
          ease: 'back.out(1.2)',
        })
        // Sol aşağı sallan
        .to(elementRef.current, {
          x: -intensity * 0.7,
          y: intensity * 0.8,
          duration: config.drift.duration / 4,
          ease: 'back.out(1.2)',
        })
        // Sağ aşağı sallan
        .to(elementRef.current, {
          x: intensity * 0.6,
          y: intensity * 0.5,
          duration: config.drift.duration / 4,
          ease: 'back.out(1.2)',
        })
        // Merkeze geri dön - elastic
        .to(elementRef.current, {
          x: 0,
          y: 0,
          duration: config.drift.duration / 4,
          ease: 'elastic.out(1, 0.5)',
        })

      timelines.push(driftTimeline)
    }

    // Pulse animasyonu - elastic nefes alma
    if (config.pulse) {
      const pulseTimeline = gsap.timeline({
        repeat: -1,
        delay: config.startDelay + 1,
      })

      // Elastic büyüme - küçülme döngüsü
      pulseTimeline
        .to(elementRef.current, {
          scale: config.pulse.maxScale,
          duration: config.pulse.duration / 2,
          ease: 'elastic.out(1, 0.3)',
        })
        .to(elementRef.current, {
          scale: config.pulse.minScale,
          duration: config.pulse.duration / 2,
          ease: 'elastic.out(1, 0.3)',
        })

      timelines.push(pulseTimeline)
    }

    // Ana timeline referansı (cleanup için)
    timelineRef.current = timelines[0] || gsap.timeline()

    // Cleanup - tüm timeline'ları temizle
    return () => {
      timelines.forEach((timeline) => {
        if (timeline) {
          timeline.kill()
        }
      })
    }
  }, [])

  // Manuel kontrol fonksiyonları
  const pauseAnimation = () => {
    if (timelineRef.current) {
      timelineRef.current.pause()
    }
  }

  const resumeAnimation = () => {
    if (timelineRef.current) {
      timelineRef.current.resume()
    }
  }

  const resetAnimation = () => {
    if (timelineRef.current) {
      timelineRef.current.restart()
    }
  }

  return {
    elementRef,
    pauseAnimation,
    resumeAnimation,
    resetAnimation,
  }
}
