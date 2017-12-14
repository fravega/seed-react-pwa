// @flow
import React, { PureComponent } from 'react'
import { type Router, withRouter } from 'next/router'
import compose from 'recompose/compose'
import { Helmet } from 'react-helmet'
import withData from '../../utils/withData'

type Props = {
  router?: Router
}

class HomePage extends PureComponent<Props> {
  state: State
  props: Props

  render() {
    return (
      <div>
        <Helmet />
        <div />
      </div>
    )
  }
}

export default compose(
  withData,
  withRouter
)(HomePage)
