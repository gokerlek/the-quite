import { useDock } from './dockContext'

export const HamburgerButton = () => {
  const { open, toggleWithAnimation, hamburgerRefs } = useDock()
  const { topRef, midRef, botRef } = hamburgerRefs

  return (
    <button
      type='button'
      onClick={toggleWithAnimation}
      className='border bg-offblack-50 border-offblack-950 size-12 min-w-12 flex items-center justify-center cursor-pointer z-50'
      aria-label={open ? 'Close menu' : 'Open menu'}
      aria-pressed={open}
    >
      <svg viewBox='0 0 200 200' width='100%' height='100%' aria-hidden='true'>
        <g fill='none' strokeWidth={10} className='stroke-offblack-950'>
          <line ref={topRef} x1='60' y1='70' x2='140' y2='70' />

          <line ref={midRef} x1='60' y1='100' x2='140' y2='100' />

          <line ref={botRef} x1='60' y1='130' x2='140' y2='130' />
        </g>
      </svg>
    </button>
  )
}
