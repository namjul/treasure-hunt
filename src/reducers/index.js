
import { SET_START_INDEX } from '../actions'

const initialState = {
  table: [
    [55, 14, 25, 52, 21],
    [44, 31, 11, 53, 43],
    [24, 13, 45, 12, 34],
    [42, 22, 43, 32, 41],
    [51, 23, 33, 54, 15]
  ],
  startIndex: []
}

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case SET_START_INDEX:
      const { index } = action
      return Object.assign({}, state, {
        startIndex: index
      })
    default:
      return state
  }
}
