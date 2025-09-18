// Main service exports
export type { IEmailRegistrationService, RegistrationResult } from '../email-registration'
export { createEmailRegistrationService } from '../email-registration'

// Individual service exports for advanced usage
export type { EmailConfig, IConfigService } from '../email-config'
export { createConfigService } from '../email-config'
export type { EmailResult, IEmailService, MailOptions } from '../email-service'
export { createEmailService } from '../email-service'
export type { EmailContent, IEmailTemplateService } from '../email-templates'
export { createEmailTemplateService } from '../email-templates'
export type { IValidationService, ValidationResult } from '../validation'
export { createValidationService } from '../validation'
