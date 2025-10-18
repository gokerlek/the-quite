import { GProps } from '@/components/society-events/type'

const LeftStar = (props: GProps) => {
  return (
    <g {...props}>
      <path
        d='M472.77 159.05C495.413 159.05 513.77 140.694 513.77 118.05C513.77 95.4064 495.413 77.05 472.77 77.05C450.126 77.05 431.77 95.4064 431.77 118.05C431.77 140.694 450.126 159.05 472.77 159.05Z'
        fill='#EDEDED'
        stroke='#F0002C'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />

      <path
        d='M526.57 118.05C477.13 120.46 475.18 122.41 472.77 171.85C470.36 122.41 468.41 120.46 418.97 118.05C468.41 115.64 470.36 113.69 472.77 64.25C475.18 113.69 477.13 115.64 526.57 118.05Z'
        fill='#EDEDED'
        stroke='#F0002C'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </g>
  )
}

export default LeftStar
