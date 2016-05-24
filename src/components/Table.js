import React from 'react'
import Cell from './Cell'

export default ({ table, path, count, handleCellHover, handleMouseOut }) => {
  return (
    <table className="table" onMouseOut={handleMouseOut}>
      <tbody>
        {
          table.map((row, rowIndex) => (
            <tr key={rowIndex} className="row">
              {
                row.map((cellValue, columnIndex) => {
                  const { type, index } = path[rowIndex] ?
                    path[rowIndex][columnIndex] ? path[rowIndex][columnIndex] : {}
                    : {}
                  return (
                    <Cell
                      key={columnIndex}
                      value={cellValue}
                      contains={type}
                      index={index}
                      count={count}
                      handleHover={handleCellHover(rowIndex, columnIndex)}
                    />
                  )
                })
              }
            </tr>
          ))
        }
      </tbody>
    </table>
  )
}
