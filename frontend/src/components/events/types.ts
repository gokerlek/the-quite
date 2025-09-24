export type RoleType = 'member' | 'volunteer' | 'participant' | 'supporter' | 'organizer'

export interface RoleOption {
  value: RoleType
  translationKey: string
}

export interface EventFormData {
  name: string
  occupation: string
  role: RoleType | ''
  email: string
}

export interface EventFormProps {
  onSubmit?: (data: EventFormData) => void | Promise<void>
  initialData?: Partial<EventFormData>
  submitButtonText?: string
  validateOnChange?: boolean
  roleOptions?: RoleOption[]
}

export interface EventProps {
  onSubmit?: (data: EventFormData) => void | Promise<void>
  initialData?: Partial<EventFormData>
  showImage?: boolean
  imageSrc?: string
  imageAlt?: string
  className?: string
  submitButtonText?: string
  validateOnChange?: boolean
  roleOptions?: RoleOption[]
}
