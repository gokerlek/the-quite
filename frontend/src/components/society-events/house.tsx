import { BaseHouse } from '@/components/society-events/baseHouse'
import { GProps } from '@/components/society-events/type'

export const House = (props: GProps) => {
  return (
    <g {...props}>
      <BaseHouse />

      <g id='first-circles'>
        <path
          d='M228.1 333.5C256.752 333.5 279.98 310.273 279.98 281.62C279.98 252.968 256.752 229.74 228.1 229.74C199.447 229.74 176.22 252.968 176.22 281.62C176.22 310.273 199.447 333.5 228.1 333.5Z'
          fill='#EDEDED'
          stroke='#F0002C'
          strokeWidth='2.56'
          strokeLinecap='round'
          strokeLinejoin='round'
        />

        <path
          d='M296.17 281.62C233.62 284.67 231.14 287.14 228.1 349.69C225.05 287.14 222.58 284.66 160.03 281.62C222.58 278.57 225.06 276.1 228.1 213.55C231.15 276.1 233.62 278.58 296.17 281.62Z'
          fill='#EDEDED'
          stroke='#F0002C'
          strokeWidth='2.56'
          strokeLinecap='round'
          strokeLinejoin='round'
        />

        <path
          d='M1211.9 333.5C1183.25 333.5 1160.02 310.273 1160.02 281.62C1160.02 252.968 1183.25 229.74 1211.9 229.74C1240.55 229.74 1263.78 252.968 1263.78 281.62C1263.78 310.273 1240.55 333.5 1211.9 333.5Z'
          fill='#EDEDED'
          stroke='#F0002C'
          strokeWidth='2.56'
          strokeLinecap='round'
          strokeLinejoin='round'
        />

        <path
          d='M1143.83 281.62C1206.38 284.67 1208.86 287.14 1211.9 349.69C1214.95 287.14 1217.42 284.66 1279.97 281.62C1217.42 278.57 1214.94 276.1 1211.9 213.55C1208.85 276.1 1206.38 278.58 1143.83 281.62Z'
          fill='#EDEDED'
          stroke='#F0002C'
          strokeWidth='2.56'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </g>
    </g>
  )
}
