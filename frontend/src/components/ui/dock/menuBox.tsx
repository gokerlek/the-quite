import React, { forwardRef } from 'react'

import { useTranslations } from 'use-intl'

export const MenuBox = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  (props, ref) => {
    const t = useTranslations()

    return (
      <div
        ref={ref}
        className='h-12 px-2 flex items-center justify-center cursor-default  uppercase text-lg font-medium  z-10 pointer-events-auto opacity-0'
        {...props}
      >
        {t('dock.menu')}
      </div>
    )
  },
)

MenuBox.displayName = 'MenuBox'
