import React, { forwardRef } from 'react'

import { useDock } from '@/components/ui/dock/dockContext'

export const MenuBox = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  (props, ref) => {
    const { toggleWithAnimation } = useDock()

    return (
      <div
        onClick={toggleWithAnimation}
        ref={ref}
        className='h-12 px-2 flex items-center justify-center border border-offblack-950 uppercase text-lg font-medium cursor-pointer bg-offblack-50 z-10'
        {...props}
      >
        Menu
      </div>
    )
  },
)

MenuBox.displayName = 'MenuBox'
