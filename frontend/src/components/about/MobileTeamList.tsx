'use client'

import React, { useId } from 'react'

import { AnimatePresence } from 'motion/react'

import { useTeamModal } from '@/hooks/useTeamModal'
import { team } from '@/mock/team'

import { MobileTeamMember } from './MobileTeamMember'
import { MobileTeamMemberModal } from './MobileTeamMemberModal'
import { Member, Team } from './teamList'

export const MobileTeamList = () => {
  const { active, activeHoverId, ref, discover, unDiscover } = useTeamModal()
  const id = useId()

  return (
    <div className=' w-full'>
      <AnimatePresence>
        {active && typeof active === 'object' && (
          <div ref={ref}>
            <MobileTeamMemberModal member={active} id={id} onClose={unDiscover} />
          </div>
        )}
      </AnimatePresence>

      {!active && (
        <ul className='w-full gap-4 flex justify-between flex-col items-center'>
          {(team as Team).map((member: Member) => (
            <MobileTeamMember
              key={member.id}
              member={member}
              activeHoverId={activeHoverId}
              id={id}
              onDiscover={discover(member)}
            />
          ))}
        </ul>
      )}
    </div>
  )
}
