'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

import { AnimatePresence, motion } from 'framer-motion'
import { useTranslations } from 'use-intl'

import { navItems } from '../ui/dock/navItems'

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()
  const t = useTranslations()

  // Route navigation + menu kapama
  const handleNavigation = (href: string) => {
    router.push(href)
    setIsOpen(false)
  }

  // Arka plan menü animasyonu için variant'lar - Kare kutu animasyonu
  const menuVariants = {
    open: {
      clipPath: `inset(0% 0% 0% 0% round 0px)`, // Tam ekran
      transition: {
        type: 'spring' as const,
        stiffness: 40,
        restDelta: 2,
      },
    },
    closed: {
      // Buton top-5 (20px), right-5 (20px), w-12 h-12 (48px)
      // inset(top right bottom left)
      clipPath: `inset(20px 20px calc(100% - 68px) calc(100% - 68px) round 8px)`, // Buton boyutunda kare
      transition: {
        type: 'spring' as const,
        stiffness: 400,
        damping: 40,
        delay: 0.2,
      },
    },
  }

  // Navigasyon elemanlarının listesi için variant'lar (stagger efekti için)
  const listVariants = {
    open: {
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
    closed: {
      transition: { staggerChildren: 0.05, staggerDirection: -1 },
    },
  }

  // Her bir navigasyon elemanı için variant'lar (sağ üst köşeden merkeze)
  const itemVariants = {
    open: {
      x: 0,
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring' as const,
        stiffness: 300,
        damping: 24,
      },
    },
    closed: {
      x: '50vw',
      y: '-50vh',
      opacity: 0,
      transition: {
        type: 'spring' as const,
        stiffness: 300,
        damping: 24,
      },
    },
  }

  // Hamburger ikonunun çizgileri için animasyonlar
  const topBarVariant = {
    open: { rotate: 45, y: 6 },
    closed: { rotate: 0, y: 0 },
  }
  const middleBarVariant = {
    open: { opacity: 0 },
    closed: { opacity: 1 },
  }
  const bottomBarVariant = {
    open: { rotate: -45, y: -6 },
    closed: { rotate: 0, y: 0 },
  }

  return (
    <>
      {/* Hamburger Butonu - Her zaman görünür */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className='fixed top-5 right-5 size-9 flex flex-col items-center justify-center space-y-1 z-[1000] border border-offblack-950 bg-offblack-50 backdrop-blur-sm focus:outline-none'
        animate={isOpen ? 'open' : 'closed'}
        initial={false}
      >
        <motion.div className='w-3.5 h-0.5 bg-offblack-950 rounded-full' variants={topBarVariant} />

        <motion.div
          className='w-3.5 h-0.5 bg-offblack-950 rounded-full'
          variants={middleBarVariant}
        />

        <motion.div
          className='w-3.5 h-0.5 bg-offblack-950 rounded-full'
          variants={bottomBarVariant}
        />
      </motion.button>

      {/* Menü - Sadece isOpen true olduğunda render edilir */}
      <AnimatePresence>
        {isOpen && (
          <motion.nav
            className='fixed top-0 right-0 bottom-0 w-full z-[999] flex items-center justify-center'
            variants={menuVariants}
            initial='closed'
            animate='open'
            exit='closed'
          >
            {/* Arka Plan */}
            <div className='absolute top-0 right-0 bottom-0 w-full h-full bg-offblack-50' />

            {/* Menü Elemanları */}
            <motion.div
              className='relative z-10 grid grid-rows-3 grid-cols-1 gap-2'
              variants={listVariants}
              initial='closed'
              animate='open'
              exit='closed'
            >
              {navItems.map((item, index) => (
                <motion.div key={index} variants={itemVariants} className='flex items-center gap-4'>
                  <button
                    onClick={() => handleNavigation(item.href)}
                    className='flex items-center justify-start gap-3 p-s-medium text-offblack-950 uppercase'
                  >
                    <div className='relative size-5'>
                      <Image
                        src={item.icon}
                        alt={item.label}
                        fill
                        priority
                        className='object-cover'
                      />
                    </div>

                    <span>{t(item.label)}</span>
                  </button>
                </motion.div>
              ))}
            </motion.div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  )
}
