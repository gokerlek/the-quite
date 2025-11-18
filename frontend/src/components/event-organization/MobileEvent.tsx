import { useState } from 'react'

import { AnimatePresence, motion } from 'framer-motion'

import { BaseMobileEvent } from '@/components/event-organization/baseMobileEvent'
import { Star } from '@/components/event-organization/star'

// Rect data mapping
const rectData = {
  'btn-1':
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur sodales ex non urna porttitor fringilla. Quisque eu purus sapien. Cras ultricies ornare leo. Etiam quis convallis lectus. Pellentesque eleifend, elit in fermentum molestie, augue tortor eleifend purus, non dictum lacus dui vel libero. Suspendisse laoreet sem sed nisl laoreet facilisis. Morbi tristique nisi id vehicula elementum. Proin venenatis dolor id metus volutpat pulvinar. Vestibulum varius nisl id sapien sodales porttitor. Phasellus ornare neque eu ligula efficitur vulputate. Aliquam vehicula augue egestas ante ultrices, et sodales tortor ultrices. Duis non lacus a eros elementum scelerisque. Integer quis arcu ipsum. Integer eu aliquam leo. Fusce in cursus mauris.',
  'btn-2':
    'Nulla aliquet auctor lacus, eget rhoncus augue ornare sit amet. In sagittis blandit est ut maximus. In hac habitasse platea dictumst. Fusce dapibus arcu at dui ultrices fringilla. ',
  'btn-3':
    'Donec at ipsum non nunc sollicitudin interdum. Sed mattis dictum sapien et pretium. Nullam sit amet turpis nunc. Aliquam erat volutpat. Curabitur a metus laoreet nunc dapibus bibendum non vel magna. Suspendisse potenti. Vestibulum ut luctus est, eu aliquet diam. Aenean magna arcu, malesuada ac massa eget, rhoncus viverra sapien. Vestibulum interdum accumsan erat, non tincidunt nunc consequat in. Vivamus lobortis enim justo, lobortis suscipit quam pretium nec.',
  'btn-4': 'Integer vel purus gravida, mollis dolor idacinia odio nulla ut lectus.',
}

export const MobilEvent = () => {
  const [activeModal, setActiveModal] = useState<string | null>(null)
  const [animationEnabled, setAnimationEnabled] = useState({
    star1: true,
    star2: true,
    star3: true,
    star4: true,
  })

  const handleOpen = (rectId: string) => {
    setActiveModal((prev) => (prev === rectId ? null : rectId))

    if (rectId === 'btn-1') {
      setAnimationEnabled((prev) => ({ ...prev, star1: false }))
    }

    if (rectId === 'btn-2') {
      setAnimationEnabled((prev) => ({ ...prev, star2: false }))
    }

    if (rectId === 'btn-3') {
      setAnimationEnabled((prev) => ({ ...prev, star3: false }))
    }

    if (rectId === 'btn-4') {
      setAnimationEnabled((prev) => ({ ...prev, star4: false }))
    }
  }

  const handleClose = () => {
    setActiveModal(null)
  }

  return (
    <>
      <svg viewBox='0 0 375 852' fill='none' xmlns='http://www.w3.org/2000/svg'>
        <path d='M375 -1.01001H0V853H375V-1.01001Z' fill='#EDEDED' />

        <BaseMobileEvent />

        <Star
          strokeWidth={1.5}
          animationDelay={0}
          animationEnabled={animationEnabled.star1}
          d={{
            base: 'M64.4898 204.26C77.2752 204.26 87.6398 193.895 87.6398 181.11C87.6398 168.325 77.2752 157.96 64.4898 157.96C51.7044 157.96 41.3398 168.325 41.3398 181.11C41.3398 193.895 51.7044 204.26 64.4898 204.26Z',
            star: 'M94.8601 181.11C66.9501 182.47 65.8501 183.57 64.4901 211.48C63.1301 183.57 62.0301 182.47 34.1201 181.11C62.0301 179.75 63.1301 178.65 64.4901 150.74C65.8501 178.65 66.9501 179.75 94.8601 181.11Z',
          }}
          id='star-1'
        />

        <Star
          strokeWidth={1.5}
          animationDelay={0}
          animationEnabled={animationEnabled.star2}
          d={{
            base: 'M308.79 204.26C321.575 204.26 331.94 193.895 331.94 181.11C331.94 168.325 321.575 157.96 308.79 157.96C296.004 157.96 285.64 168.325 285.64 181.11C285.64 193.895 296.004 204.26 308.79 204.26Z',
            star: 'M339.16 181.11C311.25 182.47 310.15 183.57 308.79 211.48C307.43 183.57 306.33 182.47 278.42 181.11C306.33 179.75 307.43 178.65 308.79 150.74C310.15 178.65 311.25 179.75 339.16 181.11Z',
          }}
          id='star-2'
        />

        <Star
          strokeWidth={1.5}
          animationDelay={0}
          animationEnabled={animationEnabled.star3}
          d={{
            base: 'M85.6203 633.59C72.1703 654.68 96.2103 665.08 102.23 681.35C108.3 697.74 102.91 717.18 88.0403 726.63C79.4003 732.12 68.8203 732.04 58.6903 731.14C42.8503 729.73 30.5603 713.13 29.3703 697.95C27.3403 672 53.0003 663.72 52.6403 645.66C52.5503 641.24 49.8603 637.64 49.9103 633.53C53.2503 629.36 79.7403 630.73 85.6103 633.6L85.6203 633.59Z',
            star: 'M118.79 687.89C71.1699 690.21 69.2899 692.09 66.9599 739.72C64.6399 692.1 62.7599 690.22 15.1299 687.89C62.7499 685.57 64.6299 683.69 66.9599 636.06C69.2799 683.68 71.1599 685.56 118.79 687.89Z',
          }}
          id='star-3'
        />

        <Star
          strokeWidth={1.5}
          animationDelay={0.5}
          animationEnabled={animationEnabled.star4}
          d={{
            base: 'M330.86 637.29C328.83 644.74 322.69 650.47 319.94 658.3C313.14 677.71 320.57 679.17 330.28 692.17C337.9 702.37 337.48 712.72 329.38 722.57C311.63 744.17 272.95 726.55 280.9 699.48C283.06 692.12 291.81 686.85 295.37 680.45C303.98 664.96 290.56 650.59 284.17 637.27C299.35 634.26 315.67 634.06 330.85 637.29H330.86Z',
            star: 'M359.62 688.52C312 690.84 310.12 692.72 307.79 740.35C305.47 692.73 303.59 690.85 255.96 688.52C303.58 686.2 305.46 684.32 307.79 636.69C310.11 684.31 311.99 686.19 359.62 688.52Z',
          }}
          id='star-4'
        />

        <motion.rect
          width='70'
          height='70'
          x={32}
          y={145}
          fill='transparent'
          className='cursor-pointer'
          id='btn-1'
          initial={{ opacity: 0 }}
          animate={{ opacity: 0 }}
          onClick={() => handleOpen('btn-1')}
        />

        <motion.rect
          width='70'
          height='70'
          x={272}
          y={145}
          fill='black'
          className='cursor-pointer'
          id='btn-2'
          initial={{ opacity: 0 }}
          animate={{ opacity: 0 }}
          onClick={() => handleOpen('btn-2')}
        />

        <motion.rect
          width='120'
          height='120'
          x={16}
          y={625}
          fill='transparent'
          className='cursor-pointer'
          id='btn-3'
          initial={{ opacity: 0 }}
          animate={{ opacity: 0 }}
          onClick={() => handleOpen('btn-3')}
        />

        <motion.rect
          width='190'
          height='200'
          x={272}
          y={625}
          fill='transparent'
          className='cursor-pointer'
          id='btn-4'
          initial={{ opacity: 0 }}
          animate={{ opacity: 0 }}
          onClick={() => handleOpen('btn-4')}
        />
      </svg>

      <AnimatePresence>
        {activeModal && (
          <>
            <motion.div className='fixed inset-0  z-50 bg-transparent' onClick={handleClose} />

            <motion.div
              // ref={modalRef}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
              className='fixed  z-50 bg-offblack-50 text-offblack-950 p-6 rounded-lg text-sm  max-w-sm w-full border border-offblack-300 shadow-lg text-justify left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'
            >
              {rectData[activeModal as keyof typeof rectData]}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
