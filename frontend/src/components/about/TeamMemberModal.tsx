'use client'

import React from 'react'
import Image from 'next/image'

import { motion } from 'motion/react'

import { buttonVariants } from '@/components/ui/button'
import Text from '@/components/ui/text'

import { Member } from './teamList'

interface TeamMemberModalProps {
  member: Member
  id: string
  onClose: () => void
}

const text = 'name surname - role'

export const TeamMemberModal = ({ member, id, onClose }: TeamMemberModalProps) => {
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className='absolute inset-0 bg-offblack-50 h-full w-full z-10'
      />

      <div className='absolute grid place-items-center z-[100]'>
        <motion.div className='w-full flex items-start justify-between overflow-hidden'>
          <motion.div layoutId={`image-${member.name}-${member.surname}-${id}`}>
            <Image
              width={176}
              height={184}
              src={member.img}
              alt={`${member.name} ${member.surname}`}
              className='min-w-44'
            />
          </motion.div>

          <div className='relative px-4 flex justify-center flex-col items-center gap-5'>
            <motion.div layoutId={`title-${member.name}-${member.surname}-${id}`}>
              <Text variant='headingM' className='font-medium text-center'>
                {text
                  .replace('name', member.name)
                  .replace('surname', member.surname)
                  .replace('role', member.role)}
              </Text>
            </motion.div>

            <motion.div
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Text variant='pXL' className='text-center max-w-2/3 mx-auto'>
                {member.sum}
              </Text>
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
                  className={buttonVariants({
                    variant: 'outline',
                  })}
                >
                  {link.name}
                </motion.a>
              ))}
            </div>
          </div>

          <div className='flex justify-end'>
            <motion.button
              layoutId={`button-${member.name}-${member.surname}-${id}`}
              onClick={onClose}
              className={buttonVariants({
                variant: 'outline',
              })}
            >
              Close
            </motion.button>
          </div>
        </motion.div>
      </div>
    </>
  )
}
