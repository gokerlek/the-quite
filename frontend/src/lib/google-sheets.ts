import * as fs from 'fs'
import { GoogleAuth } from 'google-auth-library'
import { google, sheets_v4 } from 'googleapis'
import * as path from 'path'

export interface SheetsConfig {
  spreadsheetId: string
  serviceAccountKey?: string
  serviceAccountKeyPath?: string
  sheetName?: string
}

export interface EventRegistrationRow {
  timestamp: string
  name: string
  occupation: string
  role: string
  email: string
}

export interface SheetsResult {
  success: boolean
  error?: string
  rowsUpdated?: number
}

export class GoogleSheetsService {
  private sheets: sheets_v4.Sheets
  private config: SheetsConfig

  constructor(config: SheetsConfig) {
    this.config = config

    // Parse the service account key
    let serviceAccountKey

    try {
      if (config.serviceAccountKeyPath) {
        // Read from file
        const keyPath = path.resolve(config.serviceAccountKeyPath)
        const keyContent = fs.readFileSync(keyPath, 'utf8')

        serviceAccountKey = JSON.parse(keyContent)
        console.log('Loaded Google Sheets credentials from file:', keyPath)
      } else if (config.serviceAccountKey) {
        // Parse from environment variable
        const cleanedKey = config.serviceAccountKey.trim()

        serviceAccountKey = JSON.parse(cleanedKey)
        console.log('Loaded Google Sheets credentials from environment variable')
      } else {
        throw new Error('No service account key provided')
      }
    } catch (error) {
      console.error('Failed to parse Google Sheets service account key:', error)
      throw new Error(
        'Invalid Google Sheets service account key format. Please check your GOOGLE_SHEETS_SERVICE_ACCOUNT_KEY environment variable or service account file.',
      )
    }

    // Initialize Google Auth
    const auth = new GoogleAuth({
      credentials: serviceAccountKey,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    })

    // Initialize Sheets API
    this.sheets = google.sheets({ version: 'v4', auth })
  }

  async appendRegistration(data: Omit<EventRegistrationRow, 'timestamp'>): Promise<SheetsResult> {
    try {
      const timestamp = new Date().toISOString()
      const sheetName = this.config.sheetName || 'Event Registrations'

      // Prepare the row data
      const rowData = [timestamp, data.name, data.occupation, data.role, data.email]

      // Append the data to the sheet
      const response = await this.sheets.spreadsheets.values.append({
        spreadsheetId: this.config.spreadsheetId,
        range: `${sheetName}!A:E`, // Columns A through E
        valueInputOption: 'USER_ENTERED',
        requestBody: {
          values: [rowData],
        },
      })

      console.log('Data appended to Google Sheets:', response.data)

      return {
        success: true,
        rowsUpdated: response.data.updates?.updatedRows || 0,
      }
    } catch (error) {
      console.error('Error appending to Google Sheets:', error)

      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      }
    }
  }

  async ensureHeadersExist(): Promise<SheetsResult> {
    try {
      const sheetName = this.config.sheetName || 'Event Registrations'

      // Check if headers already exist
      const response = await this.sheets.spreadsheets.values.get({
        spreadsheetId: this.config.spreadsheetId,
        range: `${sheetName}!A1:E1`,
      })

      // If no data or headers don't match, add them
      if (!response.data.values || response.data.values.length === 0) {
        const headers = ['Timestamp', 'Name', 'Occupation', 'Role', 'Email']

        await this.sheets.spreadsheets.values.update({
          spreadsheetId: this.config.spreadsheetId,
          range: `${sheetName}!A1:E1`,
          valueInputOption: 'USER_ENTERED',
          requestBody: {
            values: [headers],
          },
        })

        console.log('Headers added to Google Sheets')
      }

      return { success: true }
    } catch (error) {
      console.error('Error ensuring headers exist:', error)

      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      }
    }
  }
}

// Factory function for dependency injection
export const createGoogleSheetsService = (config: SheetsConfig): GoogleSheetsService => {
  return new GoogleSheetsService(config)
}

// Helper function to get config from environment variables
export const getSheetsConfigFromEnv = (): SheetsConfig | null => {
  const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID
  const serviceAccountKey = process.env.GOOGLE_SHEETS_SERVICE_ACCOUNT_KEY
  const sheetName = process.env.GOOGLE_SHEETS_SHEET_NAME

  if (!spreadsheetId) {
    console.log('Google Sheets integration disabled: GOOGLE_SHEETS_SPREADSHEET_ID not configured')

    return null
  }

  // Try file-based approach first (more reliable)
  const serviceAccountFilePath = path.join(process.cwd(), 'google-service-account.json')

  if (fs.existsSync(serviceAccountFilePath)) {
    console.log('Using Google Sheets service account file:', serviceAccountFilePath)

    return {
      spreadsheetId,
      serviceAccountKeyPath: serviceAccountFilePath,
      sheetName,
    }
  }

  // Fall back to environment variable
  if (!serviceAccountKey) {
    console.log(
      'Google Sheets integration disabled: Neither service account file nor GOOGLE_SHEETS_SERVICE_ACCOUNT_KEY configured',
    )

    return null
  }

  // Basic validation of service account key format
  if (!serviceAccountKey.startsWith('{') || !serviceAccountKey.includes('private_key')) {
    console.warn('Google Sheets service account key appears to be malformed, trying anyway...')
  }

  return {
    spreadsheetId,
    serviceAccountKey,
    sheetName,
  }
}
