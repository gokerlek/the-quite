import { NextRequest, NextResponse } from 'next/server'

import { createEmailRegistrationService } from '@/lib/email-registration'

export interface EmailFormData {
  name: string
  occupation: string
  role: string
  email: string
}

export async function POST(request: NextRequest) {
  try {
    const body: EmailFormData = await request.json()

    // Use the email registration service to handle the entire process
    const emailRegistrationService = createEmailRegistrationService()
    const result = await emailRegistrationService.processRegistration(body)

    if (!result.success) {
      // Handle validation errors specifically
      if (result.validationErrors && result.validationErrors.length > 0) {
        return NextResponse.json(
          {
            error: result.error,
            validationErrors: result.validationErrors,
          },
          { status: 400 },
        )
      }

      // Handle other errors (config, email sending, etc.)
      const statusCode = result.error?.includes('configuration') ? 500 : 500

      return NextResponse.json({ error: result.error }, { status: statusCode })
    }

    return NextResponse.json(
      {
        message: 'Email sent successfully',
        messageId: result.messageId,
      },
      { status: 200 },
    )
  } catch (error) {
    console.error('Unexpected error in email route:', error)

    // Return appropriate error message
    if (error instanceof Error) {
      return NextResponse.json({ error: 'Failed to send email: ' + error.message }, { status: 500 })
    }

    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
  }
}
