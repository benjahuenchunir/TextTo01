import { useState } from 'react'

import { DataMatrix } from '@/types'

export default function GridSelection(props: {
  grid: DataMatrix
  getAffectedSquares: (row: number, col: number) => {row: number, col: number}[]
  activeSquares: (squares: {row: number, col: number}[]) => void
  toggleSquares: (squares: {row: number, col: number}[]) => void
}) {
  const { grid, getAffectedSquares, activeSquares, toggleSquares } = props
  const [isSelecting, setIsSelecting] = useState(false)

  const handleSquareInteraction = (row: number, col: number) => () => {
    if (!isSelecting) {
      setIsSelecting(true)
      toggleSquares(getAffectedSquares(row, col))
    }
  }

  const handleSquareMouseEnter = (row: number, col: number) => () => {
    if (isSelecting) {
      activeSquares(getAffectedSquares(row, col))
    }
  }

  const handleMouseUp = () => setIsSelecting(false)

  return (
    <div 
      className="flex flex-col select-none touch-none" 
      onMouseUp={handleMouseUp} 
      onTouchEnd={handleMouseUp}
    >
      {grid.map((row, rowIndex) => (
        <div className="flex flex-row" key={rowIndex}>
          {row.map((isActive, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className={`w-3 h-3 md:w-4 md:h-4 cursor-pointer select-none touch-none ${
                isActive 
                  ? 'bg-green-500 dark:bg-green-600' 
                  : 'bg-red-500 dark:bg-red-700'
              }`}
              draggable={false}
              onMouseDown={handleSquareInteraction(rowIndex, colIndex)}
              onMouseEnter={handleSquareMouseEnter(rowIndex, colIndex)}
              onTouchStart={handleSquareInteraction(rowIndex, colIndex)}
              onTouchMove={handleSquareMouseEnter(rowIndex, colIndex)}
              onDragStart={(e) => e.preventDefault()}
            />
          ))}
        </div>
      ))}
    </div>
  )
}