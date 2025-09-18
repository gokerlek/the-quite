import { ReactNode } from 'react'

import Text from '@/components/ui/text'

export interface FormFieldProps {
  children: ReactNode
  label: string
  suffix?: string
  error?: string
  required?: boolean
  className?: string
}

export function FormField({
  children,
  label,
  suffix,
  error,
  required,
  className = '',
}: FormFieldProps) {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <div className='flex flex-wrap items-center gap-3'>
        <Text variant='p2XL' t className='inline'>
          {label}
        </Text>

        {required}

        {children}

        {suffix && (
          <Text variant='p2XL' as='span' className='inline'>
            {suffix}
          </Text>
        )}
      </div>

      {error && (
        <Text variant='p2XL' className='text-red-500 text-sm'>
          {error}
        </Text>
      )}
    </div>
  )
}
