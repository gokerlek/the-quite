import { EmailFormData } from '@/app/api/send-email/route'

export interface ValidationResult {
  isValid: boolean
  errors: string[]
}

export interface IValidationService {
  validateEmailForm(data: EmailFormData): ValidationResult
  validateEmail(email: string): boolean
}

export class ValidationService implements IValidationService {
  private readonly emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  validateEmailForm(data: EmailFormData): ValidationResult {
    const errors: string[] = []

    // Check required fields
    if (!data.name?.trim()) errors.push('Name is required')

    if (!data.occupation?.trim()) errors.push('Occupation is required')

    if (!data.role?.trim()) errors.push('Role is required')

    if (!data.email?.trim()) errors.push('Email is required')

    // Validate email format if provided
    if (data.email && !this.validateEmail(data.email)) {
      errors.push('Invalid email format')
    }

    return {
      isValid: errors.length === 0,
      errors,
    }
  }

  validateEmail(email: string): boolean {
    return this.emailRegex.test(email.trim())
  }
}

// Factory function for dependency injection
export const createValidationService = (): IValidationService => {
  return new ValidationService()
}
