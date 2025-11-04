import { useRef, useState } from 'react'

import { AnimatePresence, motion } from 'framer-motion'

import { BaseWebEvent } from '@/components/event-organization/baseWebEvent'
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

export const WebEvent = () => {
  const [activeModal, setActiveModal] = useState<string | null>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const svgRef = useRef<SVGSVGElement>(null)
  const [animationEnabled, setAnimationEnabled] = useState({
    star1: true,
    star2: true,
    star3: true,
    star4: true,
  })

  const handleMouseMove = (e: React.MouseEvent) => {
    // Viewport pixel koordinatları - scaling'den etkilenmesin
    setMousePosition({ x: e.clientX, y: e.clientY })
  }

  const handleRectHover = (rectId: string) => {
    setActiveModal(rectId)

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

        <Star
          animationDelay={1}
          animationEnabled={animationEnabled.star1}
          d={{
            base: 'M472.77 159.05C495.413 159.05 513.77 140.694 513.77 118.05C513.77 95.4063 495.413 77.05 472.77 77.05C450.126 77.05 431.77 95.4063 431.77 118.05C431.77 140.694 450.126 159.05 472.77 159.05Z',
            star: 'M526.57 118.05C477.13 120.46 475.18 122.41 472.77 171.85C470.36 122.41 468.41 120.46 418.97 118.05C468.41 115.64 470.36 113.69 472.77 64.25C475.18 113.69 477.13 115.64 526.57 118.05Z',
          }}
          id='star-1'
        />

        <Star
          animationDelay={0.5}
          animationEnabled={animationEnabled.star2}
          id='star-2'
          d={{
            base: 'M977.76 159.05C1000.4 159.05 1018.76 140.694 1018.76 118.05C1018.76 95.4063 1000.4 77.05 977.76 77.05C955.116 77.05 936.76 95.4063 936.76 118.05C936.76 140.694 955.116 159.05 977.76 159.05Z',
            star: 'M1031.56 118.05C982.12 120.46 980.17 122.41 977.76 171.85C975.35 122.41 973.4 120.46 923.96 118.05C973.4 115.64 975.35 113.69 977.76 64.25C980.17 113.69 982.12 115.64 1031.56 118.05Z',
          }}
        />

        <Star
          animationEnabled={animationEnabled.star3}
          animationDelay={0}
          id='star-3'
          d={{
            base: 'M317.16 664.46C293.33 701.83 335.92 720.24 346.59 749.06C357.33 778.1 347.79 812.53 321.45 829.28C306.15 839.01 287.39 838.86 269.46 837.26C241.4 834.76 219.63 805.35 217.53 778.46C213.94 732.5 259.4 717.82 258.75 685.82C258.59 677.99 253.83 671.62 253.92 664.33C259.84 656.94 306.76 659.36 317.16 664.45V664.46Z',
            star: 'M375.93 760.65C291.57 764.76 288.24 768.09 284.12 852.46C280.01 768.1 276.68 764.77 192.31 760.65C276.67 756.54 280 753.21 284.12 668.84C288.23 753.2 291.56 756.53 375.93 760.65Z',
          }}
        />

        <Star
          animationDelay={2}
          animationEnabled={animationEnabled.star4}
          d={{
            base: 'M1204.57 671.02C1200.97 684.22 1190.09 694.37 1185.23 708.24C1173.18 742.62 1186.35 745.2 1203.55 768.24C1217.04 786.31 1216.3 804.63 1201.95 822.09C1170.5 860.35 1101.98 829.13 1116.08 781.18C1119.91 768.15 1135.41 758.81 1141.72 747.46C1156.97 720.02 1133.19 694.56 1121.87 670.98C1148.75 665.65 1177.67 665.29 1204.56 671.02H1204.57Z',
            star: 'M1255.51 761.77C1171.15 765.88 1167.82 769.21 1163.7 853.58C1159.59 769.22 1156.26 765.89 1071.89 761.77C1156.25 757.66 1159.58 754.33 1163.7 669.96C1167.81 754.32 1171.14 757.65 1255.51 761.77Z',
          }}
          id='star-4'
        />

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
