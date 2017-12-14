// @flow
/* eslint-disable new-cap, no-param-reassign */
import { applyMiddleware, compose, createStore, type Store as ReduxStore } from 'redux'
import { isCollection, Map } from 'immutable'
import ApolloClient from 'apollo-client'
import { createLogger } from 'redux-logger'
import getReducers from './reducer'
import { install as installOffline } from './offline'

export type State = Map<string, any>
export type Store = ReduxStore<State, any>

let reduxStore: Store

const loggerStateTransformer = state => {
  if (isCollection(state)) {
    return state.toJS()
  }
  return state
}

// Get the Redux DevTools extension and fallback to a no-op function
let devtools = _ => _
if (process.browser && window.__REDUX_DEVTOOLS_EXTENSION__) {
  devtools = window.__REDUX_DEVTOOLS_EXTENSION__()
}


function create(apolloClient: ApolloClient, initialState: Map<string, any>): Store {
  const middlewares = [ apolloClient.middleware() ]

  let storeEnhancer

  if (process.env.NODE_ENV !== 'production') {
    storeEnhancer = compose(
      applyMiddleware(...middlewares, createLogger({ stateTransformer: loggerStateTransformer })),
      devtools
    )
  } else {
    storeEnhancer = compose(applyMiddleware(...middlewares), f => f)
  }

  return createStore(getReducers(apolloClient), initialState, storeEnhancer)
}

export default (apollo: ApolloClient, initialState: Object | Map<string, any> = Map()): Store => {
  installOffline()

  if (!isCollection(initialState)) {
    initialState = Map(initialState)
  }

  // Make sure to create a new store for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (!process.browser) {
    return create(apollo, initialState)
  }

  // Reuse store on the client-side
  if (!reduxStore) {
    reduxStore = create(apollo, initialState)
  }

  return reduxStore
}
