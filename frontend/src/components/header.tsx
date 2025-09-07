'use client'

import Image from 'next/image'
import Link from 'next/link'

import { Header as HeaderType } from '@/types/strapi'

interface HeaderProps {
  header?: HeaderType
}

export default function Header({ header }: HeaderProps) {
  if (!header) {
    return (
      <header className='bg-white shadow-sm'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex justify-between items-center py-6'>
            <div className='flex items-center'>
              <h1 className='text-xl font-bold text-gray-900'>Your Site</h1>
            </div>
          </div>
        </div>
      </header>
    )
  }

  return (
    <header className='bg-white shadow-sm'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between items-center py-6'>
          <div className='flex items-center'>
            {header.logo?.image && (
              <Link href={header.logo.href} className='flex items-center'>
                <Image
                  src={`http://localhost:1337${header.logo.image.url}`}
                  alt={header.logo.image.alternativeText || header.logo.label}
                  width={120}
                  height={40}
                  className='h-8 w-auto'
                />
              </Link>
            )}
          </div>

          <nav className='flex space-x-8'>
            {header.navItems &&
              header.navItems.length > 0 &&
              header.navItems.map(
                (link) =>
                  link.label && (
                    <Link
                      key={link.id}
                      href={link.href || '/'}
                      className='text-gray-900 hover:text-gray-600 px-3 py-2 text-sm font-medium'
                      {...(link.isExternal && { target: '_blank', rel: 'noopener noreferrer' })}
                    >
                      {link.label}
                    </Link>
                  ),
              )}

            {header.cta?.label && (
              <Link
                href={header.cta.href || '/'}
                className={`px-4 py-2 text-sm font-medium rounded-md ${
                  header.cta.type === 'PRIMARY'
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'text-gray-900 hover:text-gray-600'
                }`}
                {...(header.cta.isExternal && { target: '_blank', rel: 'noopener noreferrer' })}
              >
                {header.cta.label}
              </Link>
            )}
          </nav>
        </div>
      </div>
    </header>
  )
}
