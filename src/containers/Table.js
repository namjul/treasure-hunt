import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { setStartIndex } from '../actions'
import Table from '../components/Table'
import { createSelector } from 'reselect'

const getTable = (state) => state.table
const getStartIndex = (state) => state.startIndex

export const getPathToTreasure = createSelector(
  [ getTable, getStartIndex ],
  (table, [ rowIndex, columnIndex ]) => {

    let path = {}
    let count = 0
    const visits = []

    const nextClue = function(rowIndex, columnIndex) {
      const row = table && table[rowIndex]
      const cell = row && row[columnIndex]

      // mark as visited and cancle if inside endless loop
      if (!visits[rowIndex]) {
        visits[rowIndex] = []
      }
      if (!visits[rowIndex][columnIndex]) {
        visits[rowIndex][columnIndex] = columnIndex
      } else {
        path = {}
        return
      }

      if (row && cell) {
        const index = String(cell).split('')
        const nextRowIndex = Number(index[0]) - 1
        const nextColumnIndex = Number(index[1]) - 1

        if (!path[rowIndex]) {
          path[rowIndex] = {}
        }

        count++

        if (nextRowIndex === rowIndex && nextColumnIndex === columnIndex) {
          return path[rowIndex] = Object.assign({}, path[rowIndex], { [columnIndex]: { type: 'treasure', index: count } })
        } else {
          path[rowIndex] = Object.assign({}, path[rowIndex], { [columnIndex]: { type: 'clue', index: count } })
        }

        nextClue(nextRowIndex, nextColumnIndex)
      }
    }

    nextClue(rowIndex, columnIndex)

    return { path, count }
  }
)

export default connect(
  (state) => {
    const { path, count } = getPathToTreasure(state)
    return {
      table: state.table,
      path,
      count
    }
  },
  (dispatch) => ({
    handleCellHover: (rowIndex, columnIndex) => {
      return function(event) {
        event.preventDefault()
        dispatch(setStartIndex([rowIndex, columnIndex]))
      }
    },
    handleMouseOut: () => {
      dispatch(setStartIndex([]))
    }
  })
)(Table)
