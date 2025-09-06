'use client'

import { useTheme } from 'next-themes'

import { Toaster, ToasterProps } from 'sonner'

const Sonner = ({ ...props }: ToasterProps) => {
  const { theme = 'light' } = useTheme()

  return <Toaster theme={(theme as ToasterProps['theme']) ?? 'light'} {...props} />
}

export { Sonner }
