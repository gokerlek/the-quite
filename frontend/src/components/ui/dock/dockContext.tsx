'use client'

import { createContext, ReactNode, RefObject, useContext, useState } from 'react'

interface DockContextType {
  open: boolean
  toggleOpen: () => void
  menuBoxRef: RefObject<HTMLDivElement> | null
  setMenuBoxRef: (ref: RefObject<HTMLDivElement>) => void
  close: () => void
  hasInteracted: boolean
}

const DockContext = createContext<DockContextType | undefined>(undefined)

export const useDock = () => {
  const context = useContext(DockContext)

  if (!context) {
    throw new Error('useDock must be used within a DockProvider')
  }

  return context
}

interface DockProviderProps {
  children: ReactNode
}

export const DockProvider = ({ children }: DockProviderProps) => {
  const [open, setOpen] = useState(false)
  const [menuBoxRef, setMenuBoxRefState] = useState<RefObject<HTMLDivElement> | null>(null)
  const [hasInteracted, setHasInteracted] = useState(false)

  const toggleOpen = () => {
    setHasInteracted(true)
    setOpen((prevState) => !prevState)
  }

  const close = () => {
    if (open) {
      setHasInteracted(true)
      setOpen(false)
    }
  }

  const setMenuBoxRef = (ref: RefObject<HTMLDivElement>) => {
    setMenuBoxRefState(ref)
  }

  return (
    <DockContext.Provider
      value={{ open, toggleOpen, menuBoxRef, setMenuBoxRef, close, hasInteracted }}
    >
      {children}
    </DockContext.Provider>
  )
}
