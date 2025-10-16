'use client'

import React from 'react'

import { useTranslations } from 'use-intl'

type Variant =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'headingL'
  | 'headingM'
  | 'headingS'
  | 'p2XL'
  | 'pXL'
  | 'pL'
  | 'pM'
  | 'pS'
  | 'pXS'
  | 'inherit'
type Weight = 300 | 400 | 500 | 700

interface Props<T extends React.ElementType = 'span'> {
  as?: T
  variant: Variant
  weight?: Weight
  className?: string
  children: React.ReactNode
  t?: boolean
}

const map: Record<Variant, { className: string; fontFamily: string }> = {
  h1: { className: 'text-96 leading-114 font-montagne', fontFamily: 'MontagneetRiviäre' },
  h2: { className: 'text-72 leading-86 font-montagne', fontFamily: 'MontagneetRiviäre' },
  h3: { className: 'text-60 leading-73 font-montagne', fontFamily: 'MontagneetRiviäre' },
  h4: { className: 'text-56 leading-68 font-montagne', fontFamily: 'MontagneetRiviäre' },
  h5: { className: 'text-48 leading-56 font-montagne', fontFamily: 'MontagneetRiviäre' },
  h6: { className: 'text-40 leading-48 font-montagne', fontFamily: 'MontagneetRiviäre' },
  headingL: { className: 'text-32 leading-40 font-lemon', fontFamily: 'Lemon' },
  headingM: { className: 'text-24 leading-32 font-lemon', fontFamily: 'Lemon' },
  headingS: { className: 'text-20 leading-24 font-lemon', fontFamily: 'Lemon' },
  p2XL: { className: 'text-24 leading-32', fontFamily: 'var(--font-inconsolata)' },
  pXL: { className: 'text-20 leading-32', fontFamily: 'var(--font-inconsolata)' },
  pL: { className: 'text-18 leading-28', fontFamily: 'var(--font-inconsolata)' },
  pM: { className: 'text-16 leading-24', fontFamily: 'var(--font-inconsolata)' },
  pS: { className: 'text-14 leading-22', fontFamily: 'var(--font-inconsolata)' },
  pXS: { className: 'text-12 leading-18', fontFamily: 'var(--font-inconsolata)' },
  inherit: { className: 'inherit', fontFamily: 'inherit' },
}

const defaultTags: Record<string, string> = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
}

const Text = <T extends React.ElementType = 'span'>({
  as,
  variant,
  weight,
  className,
  t,
  children,
  ...rest
}: Props<T>) => {
  const Comp = (as ||
    defaultTags[variant] ||
    (variant.startsWith('p') ? 'p' : 'span')) as React.ElementType
  const cfg = map[variant]
  const translate = useTranslations()

  return (
    <Comp
      className={`${cfg.className} ${className || ''}`.trim()}
      style={{ fontFamily: cfg.fontFamily, fontWeight: weight }}
      {...rest}
    >
      {t ? translate(children as string) : children}
    </Comp>
  )
}

export default Text
