// @flow
/* eslint-disable new-cap */
import { ApolloClient, createNetworkInterface } from 'apollo-client'
import { Map } from 'immutable'

export const APOLLO_STORE_KEY = 'apollo'

let cachedApolloClient: ApolloClient

const createClient = headers => {
  const browser = (process: any).browser && true
  const ssrMode = !browser
  return new ApolloClient({
    initialState: Map(),
    ssrMode,
    ssrForceFetchDelay: 100,
    headers,
    reduxRootSelector: state => state.get(APOLLO_STORE_KEY),
    networkInterface: createNetworkInterface({
      uri: '/api/graphql',
      opts: { credentials: 'same-origin' }
    })
  })
}

export const apolloClient = (headers: any): ApolloClient => {
  if (!process.browser) {
    return createClient(headers)
  }
  if (!cachedApolloClient) {
    cachedApolloClient = createClient(headers)
  }
  return cachedApolloClient
}
