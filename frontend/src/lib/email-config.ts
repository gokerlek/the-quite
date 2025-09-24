export interface EmailConfig {
  gmailUser: string
  gmailAppPassword: string
  recipientEmail: string
}

export interface IConfigService {
  getEmailConfig(): EmailConfig | null
  validateConfig(): boolean
}

export class ConfigService implements IConfigService {
  getEmailConfig(): EmailConfig | null {
    const gmailUser = process.env.GMAIL_USER
    const gmailAppPassword = process.env.GMAIL_APP_PASSWORD
    const recipientEmail = process.env.RECIPIENT_EMAIL || gmailUser

    if (!gmailUser || !gmailAppPassword) {
      console.error('Missing Gmail credentials in environment variables')

      return null
    }

    return {
      gmailUser,
      gmailAppPassword,
      recipientEmail: recipientEmail!,
    }
  }

  validateConfig(): boolean {
    const config = this.getEmailConfig()

    return config !== null
  }
}

// Factory function for dependency injection
export const createConfigService = (): IConfigService => {
  return new ConfigService()
}
