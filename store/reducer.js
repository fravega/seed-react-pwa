// @flow
import { ApolloClient } from 'apollo-client'
import { combineReducers } from 'redux-immutable'

export default function getReducers(client: ApolloClient) {
  return combineReducers({ apollo: client.reducer() })
}
