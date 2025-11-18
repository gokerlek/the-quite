'use client'

import React from 'react'
import Image from 'next/image'

import { motion } from 'motion/react'

import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

import { Member } from './teamList'

interface MobileTeamMemberModalProps {
  member: Member
  id: string
  onClose: () => void
}

const text = 'name surname - role'

export const MobileTeamMemberModal = ({ member, id, onClose }: MobileTeamMemberModalProps) => {
  return (
    <div className='absolute grid place-items-center z-[100] bg-offblack-50 h-[calc(100vh-10rem)] overflow-y-scroll '>
      <motion.div className='w-full flex flex-col items-center gap-5 h-screen mb-20'>
        <motion.div
          className='relative w-36 h-36 min-w-36 aspect-square  min-h-36 '
          layoutId={`image-${member.name}-${member.surname}-${id}`}
        >
          <Image
            fill
            src={member.img}
            alt={`${member.name} ${member.surname}`}
            className='object-cover'
          />
        </motion.div>

        <motion.div layoutId={`title-${member.name}-${member.surname}-${id}`}>
          <div className='heading-xxs-medium text-center'>
            {text
              .replace('name', member.name)
              .replace('surname', member.surname)
              .replace('role', member.role)}
          </div>
        </motion.div>

        <motion.div
          layout
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className='p-xs text-center  mx-10'
        >
          {member.sum}
        </motion.div>

        <div className='flex gap-2 items-center justify-center flex-wrap'>
          {member.links.map((link, index) => (
            <motion.a
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              key={index}
              href={link.link}
              target='_blank'
              rel='noopener noreferrer'
              className={cn(
                buttonVariants({
                  variant: 'outline',
                }),
                'text-xs h-8 px-3',
              )}
            >
              {link.name}
            </motion.a>
          ))}
        </div>

        <motion.button
          layoutId={`button-${member.name}-${member.surname}-${id}`}
          onClick={onClose}
          className={cn(
            buttonVariants({
              variant: 'outline',
            }),
            'text-xs h-8 px-3',
          )}
        >
          Close
        </motion.button>
      </motion.div>
    </div>
  )
}
