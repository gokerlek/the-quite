'use client'

import { useEffect, useState } from 'react'

import { useTranslations } from 'use-intl'

import Hero from '@/components/Hero'
import Layout from '@/components/Layout'
import { strapiApi } from '@/lib/api'
import { LandingPage } from '@/types/strapi'

export default function Home() {
  const [landingPage, setLandingPage] = useState<LandingPage | null>(null)
  const [loading, setLoading] = useState(true)
  const t = useTranslations()

  useEffect(() => {
    async function fetchLandingPage() {
      try {
        const response = await strapiApi.getLandingPage()

        console.log(response.data)

        setLandingPage(response.data)
      } catch (error) {
        console.error('Failed to fetch landing page:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchLandingPage()
  }, [])

  if (loading) {
    return (
      <Layout>
        <div className='flex items-center justify-center min-h-[60vh]'>
          <div className='animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900'></div>
        </div>
      </Layout>
    )
  }

  if (!landingPage) {
    return (
      <Layout>
        <div className='flex items-center justify-center min-h-[60vh]'>
          <div className='text-center'>
            <h1 className='text-4xl font-bold text-gray-900 mb-4'>{t('welcome')}</h1>

            <p className='text-lg text-gray-600'>
              Your Strapi backend is ready. Add some content to get started.
            </p>
          </div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      {landingPage.blocks && landingPage.blocks.length > 0 && (
        <div>
          {landingPage.blocks.map((block, index) => (
            <Hero key={`hero-${index}`} hero={block} />
          ))}
        </div>
      )}
    </Layout>
  )
}
