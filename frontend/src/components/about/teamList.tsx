'use client'

import React, { useId } from 'react'

import { AnimatePresence } from 'motion/react'

import { useTeamModal } from '@/hooks/useTeamModal'
import { team } from '@/mock/team'

import { TeamMember } from './TeamMember'
import { TeamMemberModal } from './TeamMemberModal'

export interface SocialLink {
  name: string
  link: `http${'s' | ''}://${string}`
}

export interface Member {
  id: string
  name: string
  surname: string
  role: string
  img: string
  sum: string
  links: SocialLink[]
}

export type Team = Member[]

export const TeamList = () => {
  const { active, activeHoverId, ref, discover, unDiscover } = useTeamModal()
  const id = useId()

  return (
    <div className='relative w-full'>
      <AnimatePresence>
        {active && typeof active === 'object' && (
          <div ref={ref}>
            <TeamMemberModal member={active} id={id} onClose={unDiscover} />
          </div>
        )}
      </AnimatePresence>

      <ul className='w-full gap-4 flex justify-between flex-col items-center'>
        {(team as Team).map((member: Member) => (
          <TeamMember
            key={member.id}
            member={member}
            activeHoverId={activeHoverId}
            id={id}
            onDiscover={discover(member)}
          />
        ))}
      </ul>
    </div>
  )
}
