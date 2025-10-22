export interface AnimationConfig {
  rotate?: {
    duration: number
    direction: 'clockwise' | 'counterclockwise'
    ease?: string
  }
  drift?: {
    duration: number
    intensity: number
    ease?: string
  }
  pulse?: {
    duration: number
    minScale: number
    maxScale: number
    ease?: string
  }
  startDelay: number
  pauseDuration?: number
}

export type CircleAnimationType = 'rotate' | 'drift' | 'pulse' | 'combo'
