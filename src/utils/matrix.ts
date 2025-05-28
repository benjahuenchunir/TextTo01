import { DataMatrix } from '@/types'

export function getNewMatrix(): DataMatrix {
  return Array(28).fill(Array(28).fill(false))
}

export function matrixToText(data: DataMatrix, oneLine = false) {
  let text = ''
  data.forEach(row => {
    row.forEach(isActive => {
      text += isActive ? '1' : '0'
    })
    if (!oneLine) {
      text += '\n'
    }
  })
  return text
}
