import nodemailer from 'nodemailer'

import { EmailFormData } from '@/app/api/send-email/route'

import { EmailConfig } from './email-config'
import { EmailContent } from './email-templates'

export interface EmailResult {
  success: boolean
  messageId?: string
  error?: string
}

export interface MailOptions {
  from: string
  to: string
  replyTo: string
  subject: string
  text: string
  html: string
}

export interface IEmailService {
  sendRegistrationEmail(
    formData: EmailFormData,
    emailContent: EmailContent,
    config: EmailConfig,
  ): Promise<EmailResult>
}

export class EmailService implements IEmailService {
  async sendRegistrationEmail(
    formData: EmailFormData,
    emailContent: EmailContent,
    config: EmailConfig,
  ): Promise<EmailResult> {
    try {
      const transporter = this.createTransporter(config)
      const mailOptions = this.createMailOptions(formData, emailContent, config)

      const info = await transporter.sendMail(mailOptions)

      return {
        success: true,
        messageId: info.messageId,
      }
    } catch (error) {
      console.error('Error sending email:', error)

      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      }
    }
  }

  private createTransporter(config: EmailConfig) {
    return nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: config.gmailUser,
        pass: config.gmailAppPassword,
      },
    })
  }

  private createMailOptions(
    formData: EmailFormData,
    emailContent: EmailContent,
    config: EmailConfig,
  ): MailOptions {
    const { name, role, email } = formData

    return {
      from: `"The Quite Registration" <${config.gmailUser}>`,
      to: config.recipientEmail,
      replyTo: email,
      subject: `New Event Registration: ${name} - ${role}`,
      text: emailContent.text,
      html: emailContent.html,
    }
  }
}

// Factory function for dependency injection
export const createEmailService = (): IEmailService => {
  return new EmailService()
}
