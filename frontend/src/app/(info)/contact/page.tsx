'use client'

import Image from 'next/image'
import Link from 'next/link'

import { useTranslations } from 'use-intl'

export default function ContactPage() {
  const t = useTranslations('contact')

  return (
    <div className='flex flex-col justify-center h-dvh md:py-24 pb-6 pt-24'>
      <div className='flex flex-row md:gap-24 gap-5 max-h-645px h-full'>
        <div className='flex flex-1 flex-col justify-between  h-full'>
          <div className='flex flex-col md:ap-6 gap-3'>
            <div className='heading-s md:heading-m'>{t('title')}</div>

            <Link
              href='mailto:info@thequiet.com'
              onClick={(e) => {
                e.preventDefault()
                window.location.href = 'mailto:info@thequiet.com'
              }}
              className='underline underline-offset-5 decoration-1 hover:underline-offset-4 cursor-pointer'
            >
              <div className='underline underline-offset-5 decoration-1 hover:underline-offset-4 cursor-pointer md:p-l p-xs'>
                {t('link')}
              </div>
            </Link>
          </div>

          <div className='flex flex-col gap-6 md:items-end items-start'>
            <div className='flex flex-col gap-5 md:items-end'>
              <div className='relative w-16 h-8'>
                <Image src='/contact/icon.svg' fill className='object-cover' alt='icon' />
              </div>

              <div className='md:text-end text-start p-m md:p-l'>{t('mail')}</div>
            </div>

            <div className='whitespace-pre-line md:text-end text-start md:p-l p-m'>
              {t('address')}
            </div>
          </div>
        </div>

        <div className='relative md:max-w-406px max-w-2/5 w-full h-full'>
          <Image
            src='/contact/img.png'
            alt='contact'
            fill
            className='grayscale object-cover'
            loading={'lazy' as const}
          />
        </div>
      </div>
    </div>
  )
}
