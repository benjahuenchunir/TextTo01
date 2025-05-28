import { Roboto_Mono as RobotoMono } from 'next/font/google'

import { DataMatrix } from '@/types'

const robotoMono = RobotoMono({ subsets: ['latin'] })

export default function GridText(props: { grid: DataMatrix }) {
  const { grid } = props
  return (
    <div className="flex flex-col">
      {grid.map((row, rowIndex) => (
        <div className="flex flex-row" key={rowIndex}>
          {row.map((isActive, colIndex) => (
            <div
              key={`text-${rowIndex}-${colIndex}`}
              className={`${robotoMono.className} text-sm/3 md:text-lg/4 `}>
              {isActive ? '1' : '0'}
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}
