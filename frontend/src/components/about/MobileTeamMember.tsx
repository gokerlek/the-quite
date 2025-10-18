'use client'

import React from 'react'

import { motion } from 'motion/react'

import { Member } from './teamList'

interface MobileTeamMemberProps {
  member: Member
  activeHoverId: string | undefined
  id: string
  onDiscover: () => void
}

const text = 'name surname - role'

export const MobileTeamMember = ({ member, id, onDiscover }: MobileTeamMemberProps) => {
  return (
    <li
      key={`card-${member.id}-${id}`}
      className='relative group cursor-pointer overflow-visible w-full justify-center items-center flex'
      onClick={onDiscover}
    >
      <motion.div layoutId={`title-${member.name}-${member.surname}-${id}`}>
        <div className='group-hover:font-medium heading-s-light cursor-default block text-center'>
          {text
            .replace('name', member.name)
            .replace('surname', member.surname)
            .replace('role', member.role)}
        </div>
      </motion.div>
    </li>
  )
}
