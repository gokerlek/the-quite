import { useCallback, useEffect, useRef, useState } from 'react'

import { useOutsideClick } from './useOutsideClick'

import type { Member } from '@/components/about/teamList'

export const useTeamModal = () => {
  const [active, setActive] = useState<Member | boolean | null>(null)
  const [activeHoverId, setActiveHoverId] = useState<string | undefined>(undefined)
  const ref = useRef<HTMLDivElement>(null)

  const discover = (member: Member) => () => {
    setActive(member)
    setActiveHoverId(member.id)
  }

  const unDiscover = useCallback(() => {
    const closingHoverId = activeHoverId

    setActive(null)
    setTimeout(() => {
      setActiveHoverId((prev) => (prev === closingHoverId ? undefined : prev))
    }, 1000)
  }, [activeHoverId])

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        unDiscover()
      }
    }

    if (active && typeof active === 'object') {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }

    window.addEventListener('keydown', onKeyDown)

    return () => window.removeEventListener('keydown', onKeyDown)
  }, [active, unDiscover])

  useOutsideClick(ref, () => unDiscover())

  return {
    active,
    activeHoverId,
    ref,
    discover,
    unDiscover,
  }
}
