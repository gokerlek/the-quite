import { useRef, useState } from 'react'

import { AnimatePresence, motion } from 'framer-motion'

import { BaseWebEvent } from '@/components/event-organization/baseWebEvent'

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

export const WebEvent = () => {
  const [activeModal, setActiveModal] = useState<string | null>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const svgRef = useRef<SVGSVGElement>(null)

  const handleMouseMove = (e: React.MouseEvent) => {
    // Viewport pixel koordinatları - scaling'den etkilenmesin
    setMousePosition({ x: e.clientX, y: e.clientY })
  }

  const handleRectHover = (rectId: string) => {
    setActiveModal(rectId)
  }

  const handleRectLeave = () => {
    setActiveModal(null)
  }

  const getModalPosition = () => {
    if (!activeModal) return { left: 0, top: 0 }

    // Base font size'ı al - responsive scaling için
    const baseFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize)

    const baseX = mousePosition.x
    const baseY = mousePosition.y

    // REM değerlerini pixel'e çevir - consistent mesafe için
    switch (activeModal) {
      case 'btn-1':
        return {
          left: baseX + baseFontSize, // 1rem sağa
          top: baseY - baseFontSize, // 1rem yukarı
        }

      case 'btn-2':
        return {
          left: baseX - 22 * baseFontSize, // 12.5rem sola
          top: baseY - baseFontSize, // 1rem yukarı
        }

      case 'btn-3':
        return {
          left: baseX + 1.25 * baseFontSize, // 1.25rem sağa
          top: baseY - 6 * baseFontSize, // 4rem yukarı
        }

      case 'btn-4':
        return {
          left: baseX - 22 * baseFontSize, // 15.5rem sola
          top: baseY - 6 * baseFontSize, // 4rem yukarı
        }

      default:
        return {
          left: baseX + 0.75 * baseFontSize, // 0.75rem sağa
          top: baseY - 2.5 * baseFontSize, // 2.5rem yukarı
        }
    }
  }

  return (
    <>
      <svg
        ref={svgRef}
        viewBox='0 0 1440 1024'
        fill='none'
        className='relative'
        xmlns='http://www.w3.org/2000/svg'
        onMouseMove={handleMouseMove}
      >
        <BaseWebEvent />

        <motion.rect
          width='120'
          height='120'
          x={410}
          y={56}
          fill='transparent'
          className='cursor-pointer'
          id='btn-1'
          initial={{ opacity: 0 }}
          animate={{ opacity: 0 }}
          whileHover={{ opacity: 0.3, scale: 1.05 }}
          transition={{ duration: 0.2 }}
          onHoverStart={() => handleRectHover('btn-1')}
          onHoverEnd={handleRectLeave}
        />

        <motion.rect
          width='120'
          height='120'
          x={910}
          y={56}
          fill='transparent'
          className='cursor-pointer'
          id='btn-2'
          initial={{ opacity: 0 }}
          animate={{ opacity: 0 }}
          whileHover={{ opacity: 0.3, scale: 1.05 }}
          transition={{ duration: 0.2 }}
          onHoverStart={() => handleRectHover('btn-2')}
          onHoverEnd={handleRectLeave}
        />

        <motion.rect
          width='180'
          height='200'
          x={200}
          y={656}
          fill='transparent'
          className='cursor-pointer'
          id='btn-3'
          initial={{ opacity: 0 }}
          animate={{ opacity: 0 }}
          whileHover={{ opacity: 0.3, scale: 1.05 }}
          transition={{ duration: 0.2 }}
          onHoverStart={() => handleRectHover('btn-3')}
          onHoverEnd={handleRectLeave}
        />

        <motion.rect
          width='190'
          height='200'
          x={1070}
          y={656}
          fill='transparent'
          className='cursor-pointer'
          id='btn-4'
          initial={{ opacity: 0 }}
          animate={{ opacity: 0 }}
          whileHover={{ opacity: 0.3, scale: 1.05 }}
          transition={{ duration: 0.2 }}
          onHoverStart={() => handleRectHover('btn-4')}
          onHoverEnd={handleRectLeave}
        />
      </svg>

      {/* Modal */}
      <AnimatePresence>
        {activeModal && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            className='fixed pointer-events-none z-50 bg-offblack-50 text-offblack-950 p-6 rounded-lg text-sm max-w-xs border border-offblack-300 shadow-lg text-justify'
            style={getModalPosition()}
          >
            {rectData[activeModal as keyof typeof rectData]}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
