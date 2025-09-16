'use client'

import Image from 'next/image'
import Link from 'next/link'

import Text from '@/components/ui/text'

export default function ContactPage() {
  return (
    <div className='flex flex-col h-[calc(100dvh-192px)]'>
      <div className='max-h-[120px] h-full md:block hidden'></div>

      <div className='flex flex-row md:gap-24 gap-5 h-full'>
        <div className='flex flex-1 flex-col justify-between max-h-[645px]'>
          <div className='flex flex-col gap-6'>
            <Text variant='headingS' weight={300} t>
              contact.title
            </Text>

            <Link
              href='mailto:info@thequiet.com'
              onClick={(e) => {
                e.preventDefault()
                window.location.href = 'mailto:info@thequiet.com'
              }}
              className='underline underline-offset-5 decoration-1 hover:underline-offset-4 cursor-pointer'
            >
              <Text
                variant='pXL'
                t
                className='underline underline-offset-5 decoration-1 hover:underline-offset-4 cursor-pointer'
              >
                contact.link
              </Text>
            </Link>
          </div>

          <div className='flex flex-col gap-3 md:gap-6 items-end'>
            <div className='flex flex-col gap-2 md:gap-5 items-end'>
              <Image src='/contact/icon.svg' alt='icon' width={64} height={24} />

              <Text variant='pL' t>
                contact.mail
              </Text>
            </div>

            <Text variant='pL' t className='whitespace-pre-line text-end md:text-'>
              contact.address
            </Text>
          </div>
        </div>

        <div className='relative max-w-[406px] max-h-[645px] min-h-[277px] w-full h-full'>
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
