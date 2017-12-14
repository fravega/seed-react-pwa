// @flow
/* eslint-disable new-cap */
import 'isomorphic-fetch'
import { APOLLO_STORE_KEY, apolloClient } from '../graphql/client'
import { ApolloProvider, getDataFromTree } from 'react-apollo'
import React, { type ComponentType } from 'react'
import reduxStore, { type State } from '../store'
import { ApolloClient } from 'apollo-client'
import { type Context } from 'next/document'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import wrapDisplayName from 'recompose/wrapDisplayName'

export default (Component: ComponentType<*>) =>
  class extends React.Component<Object> {
    static displayName = wrapDisplayName(Component, 'WithData')

    static propTypes = () => ({
      headers: PropTypes.object.isRequired,
      serverState: PropTypes.object.isRequired
    })

    static async getInitialProps(ctx: Context) {
      const headers = ctx.req ? ctx.req.headers : {}

      const client = apolloClient(headers)
      const store = reduxStore(client, client.initialState)
      const props = {
        url: { query: ctx.query, pathname: ctx.pathname },
        ...(await (Component.getInitialProps
          ? (Component: Object).getInitialProps(ctx)
          : {}))
      }

      if (!process.browser) {
        const app = (
          <ApolloProvider client={ client } store={ store }>
            <Component { ...props } />
          </ApolloProvider>
        )
        await getDataFromTree(app)
      }

      const state: State = store.getState()
      return {
        serverState: { [APOLLO_STORE_KEY]: { data: state.get(APOLLO_STORE_KEY, {}).data } },
        headers,
        ...props
      }
    }

    apolloClient: ApolloClient
    reduxStore: Store

    constructor(props: Object) {
      super(props)

      this.apolloClient = apolloClient(this.props.headers)
      this.reduxStore = reduxStore(this.apolloClient, this.props.serverState)
    }

    render() {
      return (
        <Provider store={ this.reduxStore }>
          <ApolloProvider client={ this.apolloClient }>
            <Component { ...this.props } />
          </ApolloProvider>
        </Provider>
      )
    }
  }
