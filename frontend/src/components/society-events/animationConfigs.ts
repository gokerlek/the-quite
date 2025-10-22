import { AnimationConfig } from './animationTypes'

// Smooth ve yavaş animasyon presetleri
export const animationPresets: AnimationConfig[] = [
  // Sadece yavaş sallanma
  {
    rotate: {
      duration: 8,
      direction: 'clockwise',
      ease: 'back.inOut(1.7)',
    },
    startDelay: Math.random() * 3,
    pauseDuration: Math.random() * 2 + 1,
  },

  // Ters yönde yavaş sallanma
  {
    rotate: {
      duration: 10,
      direction: 'counterclockwise',
      ease: 'elastic.inOut(1, 0.3)',
    },
    startDelay: Math.random() * 4,
    pauseDuration: Math.random() * 3 + 2,
  },

  // Sadece drift hareketi
  {
    drift: {
      duration: 6,
      intensity: 0.25,
      ease: 'slow(0.7, 0.7, false)',
    },
    startDelay: Math.random() * 2,
    pauseDuration: Math.random() * 4 + 2,
  },

  // Sadece pulse
  {
    pulse: {
      duration: 2,
      minScale: 0.95,
      maxScale: 1.05,
      ease: 'power1.inOut',
    },
    startDelay: Math.random() * 3,
    pauseDuration: Math.random() * 3 + 1,
  },

  // Drift + Pulse kombinasyonu
  {
    drift: {
      duration: 8,
      intensity: 0.2,
      ease: 'slow(0.7, 0.7, false)',
    },
    pulse: {
      duration: 3,
      minScale: 0.99,
      maxScale: 1.01,
      ease: 'power1.inOut',
    },
    startDelay: Math.random() * 2.5,
    pauseDuration: Math.random() * 2 + 1.5,
  },

  // Rotate + Pulse kombinasyonu
  {
    rotate: {
      duration: 12,
      direction: 'clockwise',
      ease: 'circ.inOut',
    },
    pulse: {
      duration: 2.5,
      minScale: 0.95,
      maxScale: 1.05,
      ease: 'power1.inOut',
    },
    startDelay: Math.random() * 3.5,
    pauseDuration: Math.random() * 2.5 + 2,
  },

  // Hafif drift + yavaş rotate
  {
    rotate: {
      duration: 14,
      direction: 'counterclockwise',
      ease: 'expo.inOut',
    },
    drift: {
      duration: 7,
      intensity: 0.18,
      ease: 'slow(0.7, 0.7, false)',
    },
    startDelay: Math.random() * 4,
    pauseDuration: Math.random() * 3 + 2,
  },

  // Üçlü kombinasyon - çok yavaş
  {
    rotate: {
      duration: 20,
      direction: 'clockwise',
      ease: 'none',
    },
    drift: {
      duration: 12,
      intensity: 0.15,
      ease: 'sine.inOut',
    },
    pulse: {
      duration: 8,
      minScale: 0.95,
      maxScale: 1.05,
      ease: 'power1.inOut',
    },
    startDelay: Math.random() * 5,
    pauseDuration: Math.random() * 4 + 3,
  },

  // Minimal pulse - çok hafif
  {
    pulse: {
      duration: 4,
      minScale: 0.95,
      maxScale: 1.05,
      ease: 'sine.inOut',
    },
    startDelay: Math.random() * 1.5,
    pauseDuration: Math.random() * 5 + 3,
  },

  // Çok yavaş drift
  {
    drift: {
      duration: 15,
      intensity: 0.2,
      ease: 'power1.inOut',
    },
    startDelay: Math.random() * 6,
    pauseDuration: Math.random() * 6 + 4,
  },
]

// Random config seçici fonksiyon
export const getRandomAnimationConfig = (): AnimationConfig => {
  const config = animationPresets[Math.floor(Math.random() * animationPresets.length)]

  // Her seferinde yeni random değerler oluştur
  return {
    ...config,
    startDelay: Math.random() * 4,
    pauseDuration: config.pauseDuration ? Math.random() * 4 + 2 : undefined,
  }
}
