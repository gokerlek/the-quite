'use client'

import EventForm from '@/components/events/event-form'
import type { EventFormData } from '@/components/events/hooks/useEventForm'

export default function EventsPage() {
  const handleFormSubmit = async (data: EventFormData) => {
    try {
      // Here you would typically send the data to your backend/API
      console.log('Event form submitted:', data)

      // Example API call:
      // const response = await fetch('/api/events/register', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(data),
      // })

      // if (!response.ok) throw new Error('Failed to submit form')

      // Handle success (e.g., show toast, redirect, etc.)
      alert('Thank you for your interest! We will contact you soon.')
    } catch (error) {
      console.error('Form submission error:', error)
      alert('There was an error submitting the form. Please try again.')
    }
  }

  return <EventForm onSubmit={handleFormSubmit} validateOnChange={true} showImage={true} />
}
