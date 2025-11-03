import React, { createContext, ReactNode, useContext, useState } from 'react'

interface JourneyState {
  journeyStep: number
  showExitButton: boolean
  isGlowAnimationComplete: boolean
  isTempleAnimationComplete: boolean
}

interface JourneyContextType extends JourneyState {
  setJourneyStep: (step: number) => void
  setShowExitButton: (show: boolean) => void
  setIsGlowAnimationComplete: (complete: boolean) => void
  setIsTempleAnimationComplete: (complete: boolean) => void
  resetJourney: () => void
}

const JourneyContext = createContext<JourneyContextType | undefined>(undefined)

interface JourneyProviderProps {
  children: ReactNode
  initialStep?: number
}

export const JourneyProvider = ({ children, initialStep = 0 }: JourneyProviderProps) => {
  const [journeyStep, setJourneyStep] = useState(initialStep)
  const [showExitButton, setShowExitButton] = useState(false)
  const [isGlowAnimationComplete, setIsGlowAnimationComplete] = useState(false)
  const [isTempleAnimationComplete, setIsTempleAnimationComplete] = useState(false)

  const resetJourney = () => {
    setJourneyStep(0)
    setShowExitButton(false)
    setIsGlowAnimationComplete(false)
    setIsTempleAnimationComplete(false)
  }

  const value: JourneyContextType = {
    journeyStep,
    showExitButton,
    isGlowAnimationComplete,
    isTempleAnimationComplete,
    setJourneyStep,
    setShowExitButton,
    setIsGlowAnimationComplete,
    setIsTempleAnimationComplete,
    resetJourney,
  }

  return <JourneyContext.Provider value={value}>{children}</JourneyContext.Provider>
}

export const useJourneyContext = () => {
  const context = useContext(JourneyContext)

  if (context === undefined) {
    throw new Error('useJourneyContext must be used within a JourneyProvider')
  }

  return context
}
