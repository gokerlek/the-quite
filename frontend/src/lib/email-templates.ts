import { EmailFormData } from '@/app/api/send-email/route'

export interface EmailContent {
  html: string
  text: string
}

export interface IEmailTemplateService {
  generateRegistrationEmail(data: EmailFormData): EmailContent
}

export class EmailTemplateService implements IEmailTemplateService {
  generateRegistrationEmail(data: EmailFormData): EmailContent {
    const { name, occupation, role, email } = data
    const timestamp = new Date().toLocaleString()

    const html = this.generateHtmlTemplate(name, occupation, role, email, timestamp)
    const text = this.generateTextTemplate(name, occupation, role, email, timestamp)

    return { html, text }
  }

  private generateHtmlTemplate(
    name: string,
    occupation: string,
    role: string,
    email: string,
    timestamp: string,
  ): string {
    return `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #333; border-bottom: 2px solid #eee; padding-bottom: 10px;">
          New Event Registration from The Quite
        </h2>
        
        <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #555; margin-top: 0;">Registration Details</h3>
          
          <table style="width: 100%; border-collapse: collapse;">
            <tr style="border-bottom: 1px solid #ddd;">
              <td style="padding: 12px 0; font-weight: bold; color: #333; width: 120px;">Name:</td>
              <td style="padding: 12px 0; color: #555;">${name}</td>
            </tr>
            <tr style="border-bottom: 1px solid #ddd;">
              <td style="padding: 12px 0; font-weight: bold; color: #333;">Occupation:</td>
              <td style="padding: 12px 0; color: #555;">${occupation}</td>
            </tr>
            <tr style="border-bottom: 1px solid #ddd;">
              <td style="padding: 12px 0; font-weight: bold; color: #333;">Role:</td>
              <td style="padding: 12px 0; color: #555;">${role}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; font-weight: bold; color: #333;">Email:</td>
              <td style="padding: 12px 0; color: #555;">
                <a href="mailto:${email}" style="color: #007cba; text-decoration: none;">${email}</a>
              </td>
            </tr>
          </table>
        </div>

        <div style="background-color: #e8f4f8; padding: 15px; border-radius: 8px; border-left: 4px solid #007cba;">
          <p style="margin: 0; color: #555; font-size: 14px;">
            <strong>Next Steps:</strong> You can reply directly to this email to contact ${name} at ${email}
          </p>
        </div>

        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; text-align: center;">
          <p style="color: #888; font-size: 12px; margin: 0;">
            This email was sent from The Quite event registration form<br>
            Submitted on ${timestamp}
          </p>
        </div>
      </div>
    `
  }

  private generateTextTemplate(
    name: string,
    occupation: string,
    role: string,
    email: string,
    timestamp: string,
  ): string {
    return `
New Event Registration from The Quite

Registration Details:
- Name: ${name}
- Occupation: ${occupation}
- Role: ${role}
- Email: ${email}

Next Steps: You can reply directly to this email to contact ${name} at ${email}

This email was sent from The Quite event registration form
Submitted on ${timestamp}
    `
  }
}

// Factory function for dependency injection
export const createEmailTemplateService = (): IEmailTemplateService => {
  return new EmailTemplateService()
}
