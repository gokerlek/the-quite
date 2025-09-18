'use client'

import { toast } from 'sonner'

import EventForm from '@/components/events/event-form'

import type { EventFormData } from '@/components/events/hooks/useEventForm'

export default function EventsPage() {
  const handleFormSubmit = async (data: EventFormData) => {
    try {
      console.log('Submitting event form:', data)

      // Send form data to email API
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Failed to submit form')
      }

      // Handle success
      console.log('Email sent successfully:', result.messageId)
      toast.success(
        'Thank you for your interest! We have received your registration and will contact you soon.',
      )
    } catch (error) {
      console.error('Form submission error:', error)
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'

      toast.error(`There was an error submitting the form: ${errorMessage}. Please try again.`)
    }
  }

  return <EventForm onSubmit={handleFormSubmit} validateOnChange={true} showImage={true} />
}
