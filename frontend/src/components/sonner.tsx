'use client'

import { Toaster, ToasterProps } from 'sonner'

const Sonner = ({ ...props }: ToasterProps) => {
  return <Toaster theme={'light'} {...props} />
}

export { Sonner }
