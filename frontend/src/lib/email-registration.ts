import { EmailFormData } from '@/app/api/send-email/route'

import { createConfigService, IConfigService } from './email-config'
import { createEmailService, IEmailService } from './email-service'
import { createEmailTemplateService, IEmailTemplateService } from './email-templates'
import { createValidationService, IValidationService } from './validation'

export interface RegistrationResult {
  success: boolean
  messageId?: string
  error?: string
  validationErrors?: string[]
}

export interface IEmailRegistrationService {
  processRegistration(formData: EmailFormData): Promise<RegistrationResult>
}

export class EmailRegistrationService implements IEmailRegistrationService {
  constructor(
    private validationService: IValidationService,
    private configService: IConfigService,
    private templateService: IEmailTemplateService,
    private emailService: IEmailService,
  ) {}

  async processRegistration(formData: EmailFormData): Promise<RegistrationResult> {
    // Step 1: Validate form data
    const validationResult = this.validationService.validateEmailForm(formData)

    if (!validationResult.isValid) {
      return {
        success: false,
        error: 'Validation failed',
        validationErrors: validationResult.errors,
      }
    }

    // Step 2: Get and validate configuration
    const config = this.configService.getEmailConfig()

    if (!config) {
      return {
        success: false,
        error: 'Email service configuration error',
      }
    }

    // Step 3: Generate email content
    const emailContent = this.templateService.generateRegistrationEmail(formData)

    // Step 4: Send email
    const emailResult = await this.emailService.sendRegistrationEmail(
      formData,
      emailContent,
      config,
    )

    if (!emailResult.success) {
      return {
        success: false,
        error: `Failed to send email: ${emailResult.error}`,
      }
    }

    return {
      success: true,
      messageId: emailResult.messageId,
    }
  }
}

// Factory function with dependency injection
export const createEmailRegistrationService = (): IEmailRegistrationService => {
  return new EmailRegistrationService(
    createValidationService(),
    createConfigService(),
    createEmailTemplateService(),
    createEmailService(),
  )
}
