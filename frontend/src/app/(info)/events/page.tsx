'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import Text from '@/components/ui/text'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'

const ROLE_OPTIONS = ['member', 'volunteer', 'participant', 'supporter', 'organizer'] as const

type FormData = {
  name: string
  occupation: string
  role: string
  email: string
}

const FormField = ({
  children,
  label,
  suffix,
}: {
  children: React.ReactNode
  label: string
  suffix?: string
}) => (
  <div className='flex flex-wrap items-center gap-3'>
    <Text variant='p2XL' t className='inline'>
      {label}
    </Text>
    {children}
    {suffix && (
      <Text variant='p2XL' as='span' className='inline'>
        {suffix}
      </Text>
    )}
  </div>
)

export default function EventsPage() {
  const t = useTranslations()
  const [formData, setFormData] = useState<FormData>({
    name: '',
    occupation: '',
    role: '',
    email: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    // Here you would typically send the data to your backend
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <div className='flex flex-col h-[calc(100dvh-192px)]'>
      <div className='max-h-[120px] h-full md:block hidden' aria-hidden='true'></div>

      <div className='flex flex-col lg:flex-row md:gap-24 gap-5 h-full'>
        <div className='relative max-w-[406px] max-h-[645px] min-h-[277px] w-full h-full order-2 lg:order-1'>
          <div
            className='w-full h-full bg-offblack-200 rounded-lg flex items-center justify-center'
            role='img'
            aria-label='Event image placeholder'
          >
            <Text variant='p2XL' className='text-offblack-500'>
              Event Image Placeholder
            </Text>
          </div>
        </div>

        <div className='flex flex-1 flex-col justify-between max-h-[645px] order-1 lg:order-2'>
          <div className='flex flex-col gap-8'>
            <form onSubmit={handleSubmit} className='flex flex-col gap-6' noValidate>
              <FormField label='events.form.name'>
                <Input
                  type='text'
                  name='name'
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className='inline-flex w-auto min-w-[200px] flex-1 max-w-[300px]'
                  aria-label={t('events.form.name')}
                />
                <Text variant='p2XL' t className='inline'>
                  events.form.occupation
                </Text>
                <Input
                  type='text'
                  name='occupation'
                  value={formData.occupation}
                  onChange={handleChange}
                  required
                  className='inline-flex w-auto min-w-[200px] flex-1 max-w-[300px]'
                  aria-label={t('events.form.occupation')}
                />
              </FormField>

              <FormField label='events.form.role' suffix="in Quiet's Society.">
                <Select
                  name='role'
                  value={formData.role}
                  onChange={handleChange}
                  required
                  className='inline-flex w-auto min-w-[250px] flex-1 max-w-[350px]'
                  aria-label={t('events.form.role')}
                >
                  <option value=''>{t('events.form.rolePlaceholder')}</option>
                  {ROLE_OPTIONS.map((role) => (
                    <option key={role} value={role}>
                      {t(`events.form.roles.${role}`)}
                    </option>
                  ))}
                </Select>
              </FormField>

              <FormField label='events.form.email'>
                <Input
                  type='email'
                  name='email'
                  value={formData.email}
                  onChange={handleChange}
                  placeholder={t('events.form.emailPlaceholder')}
                  required
                  className='inline-flex w-auto min-w-[250px] flex-1 max-w-[350px]'
                  aria-label={t('events.form.email')}
                />
              </FormField>

              <Button type='submit' className='w-fit mt-4 px-8'>
                <Text variant='p2XL' t>
                  events.form.invite
                </Text>
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
