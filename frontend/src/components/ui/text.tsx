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
  | 'pXL'
  | 'pL'
  | 'pM'
  | 'pS'
  | 'pXS'
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
  h1: { className: 'text-[96px] leading-[114px] font-montagne', fontFamily: 'MontagneetRiviäre' },
  h2: { className: 'text-[72px] leading-[86px] font-montagne', fontFamily: 'MontagneetRiviäre' },
  h3: { className: 'text-[60px] leading-[73px] font-montagne', fontFamily: 'MontagneetRiviäre' },
  h4: { className: 'text-[56px] leading-[68px] font-montagne', fontFamily: 'MontagneetRiviäre' },
  h5: { className: 'text-[48px] leading-[56px] font-montagne', fontFamily: 'MontagneetRiviäre' },
  h6: { className: 'text-[40px] leading-[48px] font-montagne', fontFamily: 'MontagneetRiviäre' },
  headingL: { className: 'text-[32px] leading-[40px] font-lemon', fontFamily: 'Lemon' },
  headingM: { className: 'text-[24px] leading-[32px] font-lemon', fontFamily: 'Lemon' },
  headingS: { className: 'text-[20px] leading-[24px] font-lemon', fontFamily: 'Lemon' },
  pXL: { className: 'text-[20px] leading-[32px]', fontFamily: 'var(--font-inconsolata)' },
  pL: { className: 'text-[18px] leading-[28px]', fontFamily: 'var(--font-inconsolata)' },
  pM: { className: 'text-[16px] leading-[24px]', fontFamily: 'var(--font-inconsolata)' },
  pS: { className: 'text-[14px] leading-[22px]', fontFamily: 'var(--font-inconsolata)' },
  pXS: { className: 'text-[12px] leading-[18px]', fontFamily: 'var(--font-inconsolata)' },
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
