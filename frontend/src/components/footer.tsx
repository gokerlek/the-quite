'use client'

import Image from 'next/image'
import Link from 'next/link'

import { Footer as FooterType } from '@/types/strapi'

interface FooterProps {
  footer?: FooterType
}

export default function Footer({ footer }: FooterProps) {
  if (!footer) {
    return (
      <footer className='bg-gray-900'>
        <div className='max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8'>
          <div className='text-center'>
            <p className='text-gray-400 text-sm'>
              © {new Date().getFullYear()} Your Company. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    )
  }

  return (
    <footer className='bg-gray-900'>
      <div className='max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8'>
        <div className='flex flex-col items-center space-y-8'>
          {footer.logo?.image && (
            <div className='flex items-center'>
              <Image
                src={`http://localhost:1337${footer.logo.image.url}`}
                alt={footer.logo.image.alternativeText || footer.logo.label}
                width={120}
                height={40}
                className='h-8 w-auto filter brightness-0 invert'
              />
            </div>
          )}

          {footer.navItems && footer.navItems.length > 0 && (
            <nav className='flex flex-wrap justify-center space-x-8'>
              {footer.navItems.map(
                (link) =>
                  link.label && (
                    <Link
                      key={link.id}
                      href={link.href || '/'}
                      className='text-gray-400 hover:text-white px-3 py-2 text-sm'
                      {...(link.isExternal && { target: '_blank', rel: 'noopener noreferrer' })}
                    >
                      {link.label}
                    </Link>
                  ),
              )}
            </nav>
          )}

          {footer.socialLinks && footer.socialLinks.length > 0 && (
            <div className='flex space-x-6'>
              {footer.socialLinks.map((social) => (
                <Link
                  key={social.id}
                  href={social.href}
                  className='text-gray-400 hover:text-white'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <span className='sr-only'>{social.label}</span>

                  {social.image ? (
                    <Image
                      src={`http://localhost:1337${social.image.url}`}
                      alt={social.label}
                      width={24}
                      height={24}
                      className='h-6 w-6 filter brightness-0 invert hover:brightness-100'
                    />
                  ) : (
                    <div className='h-6 w-6 bg-gray-400 hover:bg-white rounded'></div>
                  )}
                </Link>
              ))}
            </div>
          )}

          <div className='text-center'>
            <p className='text-gray-400 text-sm'>
              {footer.text || `© ${new Date().getFullYear()} Your Company. All rights reserved.`}
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
