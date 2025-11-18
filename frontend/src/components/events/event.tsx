'use client'

import Image from 'next/image'

import EventForm from './eventForm'
import { type EventProps } from './types'

export default function Event({
  onSubmit,
  initialData,
  imageAlt = 'Event image placeholder',
  submitButtonText,
  validateOnChange,
}: EventProps) {
  return (
    <div className='flex flex-col lg:flex-row md:gap-24 gap-10 h-dvh min-h-fit w-full  items-center mb-20 md:mb-0'>
      <div className='block md:hidden h-20 min-h-20' />

      <div className=' relative aspect-2/3 md:aspect-[4/5] w-[80vw] md:w-1/3'>
        <Image src='/events/mock.png' alt={imageAlt} fill className='object-ccntain' />
      </div>

      <div className='flex flex-1 flex-col justify-between w-full'>
        <div className='flex flex-col gap-8'>
          <EventForm
            onSubmit={onSubmit}
            initialData={initialData}
            submitButtonText={submitButtonText}
            validateOnChange={validateOnChange}
          />
        </div>
      </div>
    </div>
  )
}
