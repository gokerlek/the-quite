import { EmailFormData } from '@/app/api/send-email/route'

import { createConfigService, IConfigService } from './email-config'
import { createEmailService, IEmailService } from './email-service'
import { createEmailTemplateService, IEmailTemplateService } from './email-templates'
import {
  createGoogleSheetsService,
  getSheetsConfigFromEnv,
  GoogleSheetsService,
} from './google-sheets'
import { createValidationService, IValidationService } from './validation'

export interface RegistrationResult {
  success: boolean
  messageId?: string
  error?: string
  validationErrors?: string[]
  sheetsUpdated?: boolean
}

export interface IRegistrationService {
  processRegistration(formData: EmailFormData): Promise<RegistrationResult>
}

export class RegistrationService implements IRegistrationService {
  private sheetsService?: GoogleSheetsService

  constructor(
    private validationService: IValidationService,
    private configService: IConfigService,
    private templateService: IEmailTemplateService,
    private emailService: IEmailService,
  ) {
    // Initialize Google Sheets service if configuration is available
    const sheetsConfig = getSheetsConfigFromEnv()

    if (sheetsConfig) {
      try {
        this.sheetsService = createGoogleSheetsService(sheetsConfig)
        console.log('Google Sheets integration initialized successfully')
      } catch (error) {
        console.error('Failed to initialize Google Sheets service:', error)
        this.sheetsService = undefined
      }
    }
  }

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

    // Step 2: Get and validate email configuration
    const emailConfig = this.configService.getEmailConfig()

    if (!emailConfig) {
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
      emailConfig,
    )

    if (!emailResult.success) {
      return {
        success: false,
        error: `Failed to send email: ${emailResult.error}`,
      }
    }

    // Step 5: Save to Google Sheets (if configured)
    let sheetsUpdated = false

    if (this.sheetsService) {
      try {
        // Ensure headers exist first
        await this.sheetsService.ensureHeadersExist()

        // Append the registration data
        const sheetsResult = await this.sheetsService.appendRegistration({
          name: formData.name,
          occupation: formData.occupation,
          role: formData.role,
          email: formData.email,
        })

        if (sheetsResult.success) {
          sheetsUpdated = true
          console.log('Registration data saved to Google Sheets')
        } else {
          console.warn('Failed to save to Google Sheets:', sheetsResult.error)
          // Don't fail the entire registration if sheets fails
        }
      } catch (error) {
        console.error('Error saving to Google Sheets:', error)
        // Don't fail the entire registration if sheets fails
      }
    } else {
      console.log('Google Sheets not configured, skipping sheets integration')
    }

    return {
      success: true,
      messageId: emailResult.messageId,
      sheetsUpdated,
    }
  }
}

// Factory function with dependency injection
export const createRegistrationService = (): IRegistrationService => {
  return new RegistrationService(
    createValidationService(),
    createConfigService(),
    createEmailTemplateService(),
    createEmailService(),
  )
}
