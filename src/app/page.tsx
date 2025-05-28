'use client'
import { useState } from 'react'

import { Roboto_Mono as RobotoMono } from 'next/font/google'

import GridSelection from '@/components/GridSelection'
import GridText from '@/components/GridText'
import { copyToClipboard } from '@/utils/clipboard'
import { getNewMatrix, matrixToText } from '@/utils/matrix'

const robotoMono = RobotoMono({ subsets: ['latin'] })

function Home() {
  const [grid, setGrid] = useState(getNewMatrix())
  const [paintMode, setPaintMode] = useState<'single' | 'threeByThree'>('single')

  const getAffectedSquares = (row: number, col: number) => {
    if (paintMode === 'threeByThree') {
      const squares = []
      for (let r = Math.max(0, row - 1); r <= Math.min(grid.length - 1, row + 1); r++) {
        for (let c = Math.max(0, col - 1); c <= Math.min(grid[0].length - 1, col + 1); c++) {
          squares.push({ row: r, col: c })
        }
      }
      return squares
    }
    return [{ row, col }]
  }

  const activeSquares = (squares: {row: number, col: number}[]) => {
    const newGrid = grid.map(subarray => [...subarray])
    squares.forEach(({row, col}) => {
      newGrid[row][col] = true
    })
    setGrid(newGrid)
  }

  const toggleSquares = (squares: {row: number, col: number}[]) => {
    const newGrid = grid.map(subarray => [...subarray])
    squares.forEach(({row, col}) => {
      newGrid[row][col] = !newGrid[row][col]
    })
    setGrid(newGrid)
  }

  const handleCopyToClipboard = () => copyToClipboard(matrixToText(grid))
  const handleCopyToClipboardOneLine = () => copyToClipboard(matrixToText(grid, true))

  const reset = () => setGrid(getNewMatrix())

  return (
    <main className="container mx-auto min-h-min flex flex-col items-center">
      <div className="h-32 flex items-center">
        <h1 className={`text-3xl text-gray-100 ${robotoMono.className}`}>
          TextTo01
        </h1>
      </div>
      
      <div className="flex flex-col md:flex-row w-full max-w-5xl">
        {/* Left side - Controls and settings */}
        <div className="w-full md:w-48 flex flex-col space-y-4 pr-4 mb-4 md:mb-0">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
            <h2 className="font-bold mb-2 text-gray-800 dark:text-gray-200">Brush Mode</h2>
            <div className="space-y-2">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  className="h-4 w-4 text-green-500 focus:ring-green-500 dark:focus:ring-green-600"
                  checked={paintMode === 'single'}
                  onChange={() => setPaintMode('single')}
                />
                <span className="text-gray-700 dark:text-gray-300">Single Pixel</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  className="h-4 w-4 text-green-500 focus:ring-green-500 dark:focus:ring-green-600"
                  checked={paintMode === 'threeByThree'}
                  onChange={() => setPaintMode('threeByThree')}
                />
                <span className="text-gray-700 dark:text-gray-300">3×3 Area</span>
              </label>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
            <h2 className="font-bold mb-2 text-gray-800 dark:text-gray-200">Actions</h2>
            <div className="flex flex-col space-y-2">
              <button 
                onClick={reset}
                className="px-3 py-1 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 rounded text-gray-800 dark:text-gray-200"
              >
                Reset Grid
              </button>
              <button 
                onClick={handleCopyToClipboard}
                className="px-3 py-1 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 rounded text-gray-800 dark:text-gray-200"
              >
                Copy as Text
              </button>
              <button 
                onClick={handleCopyToClipboardOneLine}
                className="px-3 py-1 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 rounded text-gray-800 dark:text-gray-200"
              >
                Copy as One Line
              </button>
            </div>
          </div>
        </div>

        {/* Right side - Grid and text output */}
        <div className="flex-1 flex flex-col md:flex-row">
          <div className="mb-5 md:mr-5">
            <GridSelection
              grid={grid}
              getAffectedSquares={getAffectedSquares}
              activeSquares={activeSquares}
              toggleSquares={toggleSquares}
            />
          </div>
          <GridText grid={grid} />
        </div>
      </div>
    </main>
  )
}

export default Home