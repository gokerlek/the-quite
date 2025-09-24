'use client'

import { useForm } from 'react-hook-form'

import { isEmpty } from 'ramda'
import { toast } from 'sonner'
import { useTranslations } from 'use-intl'

import { Button } from '@/components/ui/button'
import Text from '@/components/ui/text'
import { cn } from '@/lib/utils'

import { DEFAULT_ROLE_OPTIONS } from './constants'
import { type EventFormData, type EventFormProps, type RoleOption } from './types'

export default function EventForm({
  initialData,
  validateOnChange = true,
  roleOptions = DEFAULT_ROLE_OPTIONS,
}: EventFormProps) {
  const t = useTranslations('events')

  const { register, handleSubmit, watch } = useForm<EventFormData>({
    mode: validateOnChange ? 'onChange' : 'onSubmit',
    defaultValues: {
      name: initialData?.name || '',
      occupation: initialData?.occupation || '',
      role: initialData?.role || '',
      email: initialData?.email || '',
    },
  })

  const handleFormSubmit = async (data: EventFormData) => {
    try {
      console.log('Submitting event form:', data)

      // Send form data to email API
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Failed to submit form')
      }

      // Handle success
      console.log('Email sent successfully:', result.messageId)
      toast.success(
        'Thank you for your interest! We have received your registration and will contact you soon.',
      )
    } catch (error) {
      console.error('Form submission error:', error)
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'

      toast.error(`There was an error submitting the form: ${errorMessage}. Please try again.`)
    }
  }
  const { role } = watch()

  const inputClassName =
    'border-b outline-none bg-transparent text-offblack-950  font-inconsolata font-normal text-2xl placeholder:text-offblack-950/30 px-2 py-0.5 mx-5   flex-1 min-w-0 [&>option[disabled]]:text-offblack-950/30'

  const formSentence = t.raw('sentence_form')

  const renderFormSentence = () => {
    const lines = formSentence.split('\n')

    return lines.map((line: string, lineIndex: number) => {
      const parts = line.split(/(\{[^}]+\})/g)

      const lineContent = parts.map((part: string, partIndex: number) => {
        if (part === '{name}') {
          return (
            <input
              key={partIndex}
              type='text'
              className={cn(inputClassName)}
              {...register('name', { required: true })}
            />
          )
        } else if (part === '{occupation}') {
          return (
            <input
              key={partIndex}
              type='text'
              className={cn(inputClassName)}
              {...register('occupation', { required: true })}
            />
          )
        } else if (part === '{role}') {
          return (
            <select
              key={partIndex}
              className={cn(inputClassName, {
                'text-offblack-950/30  border-offblack-950': isEmpty(role),
              })}
              {...register('role', { required: true })}
            >
              <option value='' disabled>
                {t('roles.placeholder')}
              </option>

              {roleOptions.map((roleOption: RoleOption) => (
                <option key={roleOption.value} value={roleOption.value}>
                  {t(roleOption.translationKey)}
                </option>
              ))}
            </select>
          )
        } else if (part === '{email}') {
          return (
            <input
              key={partIndex}
              type='text'
              placeholder='email@email.com'
              className={cn(inputClassName)}
              {...register('email', {
                required: true,
                pattern:
                  /^(?!.*\.\.)[A-Za-z0-9._%+-]+@(?:(?!-)[A-Za-z0-9-]{1,63}(?<!-)\.)+[A-Za-z]{2,}$/i,
              })}
            />
          )
        } else {
          return <span key={partIndex}>{part}</span>
        }
      })

      return (
        <div key={lineIndex} className='flex items-center gap-1'>
          {lineContent}
        </div>
      )
    })
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className='flex flex-col gap-6'>
      <div className='text-offblack-950 font-inconsolata font-normal text-2xl leading-relaxed flex flex-col gap-4'>
        {renderFormSentence()}
      </div>

      <Button type='submit'>
        <Text variant='inherit' t>
          events.invite_me
        </Text>
      </Button>
    </form>
  )
}
