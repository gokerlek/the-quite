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
    <div className='flex flex-col lg:flex-row md:gap-24 gap-5 h-full w-full'>
      <div className='aspect-4/5 w-full max-w-[480px] relative'>
        <Image src='/events/mock.png' alt={imageAlt} fill className='object-cover' />
      </div>

      <div className='flex flex-1 flex-col justify-between'>
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
