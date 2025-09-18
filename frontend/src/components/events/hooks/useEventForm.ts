import { useState, useCallback } from 'react'

export interface EventFormData {
  name: string
  occupation: string
  role: string
  email: string
}

export interface EventFormErrors {
  name?: string
  occupation?: string
  role?: string
  email?: string
}

export interface UseEventFormProps {
  initialData?: Partial<EventFormData>
  onSubmit?: (data: EventFormData) => void | Promise<void>
  validateOnChange?: boolean
}

const INITIAL_FORM_DATA: EventFormData = {
  name: '',
  occupation: '',
  role: '',
  email: '',
}

export function useEventForm({
  initialData = {},
  onSubmit,
  validateOnChange = false,
}: UseEventFormProps = {}) {
  const [formData, setFormData] = useState<EventFormData>({
    ...INITIAL_FORM_DATA,
    ...initialData,
  })
  const [errors, setErrors] = useState<EventFormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const validateField = useCallback(
    (name: keyof EventFormData, value: string): string | undefined => {
      switch (name) {
        case 'name':
          return value.trim().length < 2 ? 'Name must be at least 2 characters' : undefined
        case 'occupation':
          return value.trim().length < 2 ? 'Occupation must be at least 2 characters' : undefined
        case 'role':
          return !value ? 'Please select a role' : undefined
        case 'email':
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
          return !emailRegex.test(value) ? 'Please enter a valid email address' : undefined
        default:
          return undefined
      }
    },
    [],
  )

  const validateForm = useCallback((): EventFormErrors => {
    const newErrors: EventFormErrors = {}

    Object.entries(formData).forEach(([key, value]) => {
      const error = validateField(key as keyof EventFormData, value)
      if (error) {
        newErrors[key as keyof EventFormErrors] = error
      }
    })

    return newErrors
  }, [formData, validateField])

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target
      const fieldName = name as keyof EventFormData

      setFormData((prev) => ({
        ...prev,
        [fieldName]: value,
      }))

      if (validateOnChange) {
        const fieldError = validateField(fieldName, value)
        setErrors((prev) => ({
          ...prev,
          [fieldName]: fieldError,
        }))
      }
    },
    [validateField, validateOnChange],
  )

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault()

      const formErrors = validateForm()
      setErrors(formErrors)

      if (Object.keys(formErrors).length > 0) {
        return
      }

      if (!onSubmit) return

      setIsSubmitting(true)
      try {
        await onSubmit(formData)
      } catch (error) {
        console.error('Form submission error:', error)
      } finally {
        setIsSubmitting(false)
      }
    },
    [formData, validateForm, onSubmit],
  )

  const resetForm = useCallback(() => {
    setFormData({ ...INITIAL_FORM_DATA, ...initialData })
    setErrors({})
  }, [initialData])

  return {
    formData,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit,
    resetForm,
    setFieldValue: (field: keyof EventFormData, value: string) => {
      setFormData((prev) => ({ ...prev, [field]: value }))
    },
  }
}
