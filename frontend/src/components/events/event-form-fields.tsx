import { useTranslations } from 'next-intl'

import { FormField } from '@/components/ui/form-field'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'

import type { EventFormData, EventFormErrors } from '@/components/events/hooks/useEventForm'

export const ROLE_OPTIONS = [
  'member',
  'volunteer',
  'participant',
  'supporter',
  'organizer',
] as const
export type RoleOption = (typeof ROLE_OPTIONS)[number]

interface EventFormFieldsProps {
  formData: EventFormData
  errors: EventFormErrors
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
  disabled?: boolean
}

export function EventFormFields({
  formData,
  errors,
  onChange,
  disabled = false,
}: EventFormFieldsProps) {
  const t = useTranslations()

  return (
    <>
      <FormField label='events.form.name' error={errors.name} required>
        <Input
          type='text'
          name='name'
          value={formData.name}
          onChange={onChange}
          disabled={disabled}
          required
          className='inline-flex w-auto min-w-[200px] flex-1 max-w-[300px]'
          aria-label={t('events.form.name')}
        />
      </FormField>

      <FormField label='events.form.occupation' error={errors.occupation} required>
        <Input
          type='text'
          name='occupation'
          value={formData.occupation}
          onChange={onChange}
          disabled={disabled}
          required
          className='inline-flex w-auto min-w-[200px] flex-1 max-w-[300px]'
          aria-label={t('events.form.occupation')}
        />
      </FormField>

      <FormField label='events.form.role' suffix="in Quiet's Society." error={errors.role} required>
        <Select
          name='role'
          value={formData.role}
          onChange={onChange}
          disabled={disabled}
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

      <FormField label='events.form.email' error={errors.email} required>
        <Input
          type='email'
          name='email'
          value={formData.email}
          onChange={onChange}
          placeholder={t('events.form.emailPlaceholder')}
          disabled={disabled}
          required
          className='inline-flex w-auto min-w-[250px] flex-1 max-w-[350px]'
          aria-label={t('events.form.email')}
        />
      </FormField>
    </>
  )
}
