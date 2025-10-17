'use client'

import React from 'react'
import Image from 'next/image'

import { motion } from 'motion/react'

import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

import { Member } from './teamList'

interface TeamMemberProps {
  member: Member
  activeHoverId: string | undefined
  id: string
  onDiscover: () => void
}

const text = 'name surname - role'

export const TeamMember = ({ member, activeHoverId, id, onDiscover }: TeamMemberProps) => {
  return (
    <li
      key={`card-${member.id}-${id}`}
      className='relative group cursor-pointer overflow-visible w-full justify-center items-center flex'
    >
      <div
        className={cn(
          'absolute left-0 top-0 w-44 h-44 opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out pointer-events-none z-10',
          {
            'opacity-100': activeHoverId === member.id,
            'group-hover:opacity-0': activeHoverId,
          },
        )}
      >
        <motion.div
          layoutId={`image-${member.name}-${member.surname}-${id}`}
          className={cn('w-44 h-44 transition-all duration-700 ease-out overflow-hidden relative', {
            'h-44': activeHoverId === member.id,
            'transition-none': activeHoverId,
          })}
        >
          <Image
            fill
            src={member.img}
            alt={`${member.name} ${member.surname}`}
            className='object-cover object-center absolute top-1/2 '
          />
        </motion.div>
      </div>

      <motion.div layoutId={`title-${member.name}-${member.surname}-${id}`}>
        <div
          className={cn('group-hover:font-medium heading-m-light cursor-default block', {
            'font-medium': activeHoverId === member.id,
          })}
        >
          {text
            .replace('name', member.name)
            .replace('surname', member.surname)
            .replace('role', member.role)}
        </div>
      </motion.div>

      <div
        className={cn(
          'absolute right-0 top-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out z-10 ',
          {
            'opacity-100': activeHoverId === member.id,
            'group-hover:opacity-0': activeHoverId,
          },
        )}
      >
        <motion.button
          layoutId={`button-${member.name}-${member.surname}-${id}`}
          onClick={onDiscover}
          className={buttonVariants({
            variant: 'outline',
          })}
        >
          Discover
        </motion.button>
      </div>
    </li>
  )
}
