import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import reducer from './reducers'

const logger = store => next => action => {
  console.group(action.type)
  console.info('dispatching', action)
  let result = next(action)
  console.log('next state', store.getState())
  console.groupEnd(action.type)
  return result
}

let store = createStore(
  reducer,
  applyMiddleware(logger)
)

// Render the root component normally
let render = () => {
    const App = require('./components/App').default
    ReactDOM.render(
      <Provider store={store}>
        <App />
      </Provider>,
      document.getElementById('app')
    )
}

if (module.hot) {
    module.hot.accept('./components/App', () => {
      setTimeout(render)
    })
}

render()
