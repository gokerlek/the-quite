'use client'

type Props = { onDiscoverAction: () => void }

export function TheQuietDescription({ onDiscoverAction }: Props) {
  return (
    <section
      id='the_quiet_description'
      className='absolute left-1/12 top-1/12 flex-col gap-5 items-start opacity-0'
      style={{ display: 'none' }}
    >
      <div className='text-2xl sm:text-5xl sm:max-w-1/2 font-light  text-left text-offblack-50 text-balance'>
        We are the curators of the moment. Seekers of the unforgettable. We are the quiet. It&apos;s
        a society, ıt&apos;s a journey.
      </div>

      <button
        onClick={onDiscoverAction}
        className='bt-white px-5 py-2 bg-offblack-50 text-offblack-950 hover:opacity-80 transform hover:scale-95 transition-all duration-300 ease-in-out cursor-pointer'
      >
        DISCOVER
      </button>
    </section>
  )
}
