import { createStore, applyMiddleware, compose } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import createSagaMiddleware from 'redux-saga'
import { createBrowserHistory as createHistory } from 'history'
import rootReducer from './reducers'
import sagas from './sagas'
import logger from 'redux-logger'

export const history = createHistory()

const initialState = {}
const enhancers = []

const sagaMiddleware = createSagaMiddleware()

const middleware = [sagaMiddleware, routerMiddleware(history)]

if (process.env.NODE_ENV === 'development') {
  const devToolsExtension = window.devToolsExtension

  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension())
  }
}

const composedEnhancers = compose(
  applyMiddleware(...middleware),
  ...enhancers,
  applyMiddleware(logger),
)

const store = createStore(rootReducer, initialState, composedEnhancers)

sagaMiddleware.run(sagas)

export default store
