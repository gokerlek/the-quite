'use client'

import Image from 'next/image'

import { type EventFormData, useEventForm } from '@/components/events/hooks/useEventForm'
import { Button } from '@/components/ui/button'
import Text from '@/components/ui/text'

import { EventFormFields } from './event-form-fields'

export interface EventFormProps {
  onSubmit?: (data: EventFormData) => void | Promise<void>
  initialData?: Partial<EventFormData>
  showImage?: boolean
  imageSrc?: string
  imageAlt?: string
  className?: string
  submitButtonText?: string
  validateOnChange?: boolean
}

export default function EventForm({
  onSubmit,
  initialData,
  showImage = true,
  imageSrc,
  imageAlt = 'Event image placeholder',
  className = '',
  submitButtonText,
  validateOnChange = false,
}: EventFormProps) {
  const { formData, errors, isSubmitting, handleChange, handleSubmit } = useEventForm({
    initialData,
    onSubmit:
      onSubmit ||
      ((data) => {
        console.log('Form submitted:', data)
        // Default behavior - you can override with onSubmit prop
      }),
    validateOnChange,
  })

  return (
    <div className={`flex flex-col h-[calc(100dvh-192px)] ${className}`}>
      <div className='max-h-[120px] h-full md:block hidden' aria-hidden='true'></div>

      <div className='flex flex-col lg:flex-row md:gap-24 gap-5 h-full'>
        {showImage && (
          <div className='relative max-w-[406px] max-h-[645px] min-h-[277px] w-full h-full order-2 lg:order-1'>
            <div
              className='w-full h-full bg-offblack-200 rounded-lg flex items-center justify-center'
              role='img'
              aria-label={imageAlt}
            >
              {imageSrc ? (
                <Image src={imageSrc} alt={imageAlt} fill className='object-cover rounded-lg' />
              ) : (
                <Text variant='p2XL' className='text-offblack-500'>
                  {imageAlt}
                </Text>
              )}
            </div>
          </div>
        )}

        <div
          className={`flex flex-1 flex-col justify-between max-h-[645px] ${showImage ? 'order-1 lg:order-2' : ''}`}
        >
          <div className='flex flex-col gap-8'>
            <form onSubmit={handleSubmit} className='flex flex-col gap-6' noValidate>
              <EventFormFields
                formData={formData}
                errors={errors}
                onChange={handleChange}
                disabled={isSubmitting}
              />

              <Button type='submit' className='w-fit mt-4 px-8' disabled={isSubmitting}>
                <Text variant='p2XL' t>
                  {submitButtonText || 'events.form.invite'}
                </Text>
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
