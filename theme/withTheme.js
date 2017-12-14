/* eslint-disable flowtype/require-valid-file-annotation */
import { MuiThemeProvider, withStyles as withMUIStyles } from 'material-ui/styles'
import React, { Component } from 'react'
import { getContext } from './index'
import wrapDisplayName from 'recompose/wrapDisplayName'

// Apply some reset
const GlobalStyles = () => ({
  '@global': {
    html: {
      background: '#fff',
      WebkitFontSmoothing: 'antialiased', // Antialiasing.
      MozOsxFontSmoothing: 'grayscale' // Antialiasing.
    },
    body: { margin: 0 }
  }
})

const AppWrapper = withMUIStyles(GlobalStyles)(props => props.children)

export default function withTheme(BaseComponent) {
  class WithTheme extends Component {
    static getInitialProps(ctx) {
      if (BaseComponent.getInitialProps) {
        return BaseComponent.getInitialProps(ctx)
      }

      return {}
    }

    componentWillMount() {
      this.styleContext = getContext()
    }

    componentDidMount() {
      // Remove the server-side injected CSS.
      const jssStyles = document.querySelector('#jss-server-side')
      if (jssStyles && jssStyles.parentNode) {
        jssStyles.parentNode.removeChild(jssStyles)
      }
    }

    render() {
      return (
        <MuiThemeProvider
          sheetsManager={ this.styleContext.sheetsManager }
          theme={ this.styleContext.theme }
        >
          <AppWrapper>
            <BaseComponent { ...this.props } />
          </AppWrapper>
        </MuiThemeProvider>
      )
    }
  }

  if (process.env.NODE_ENV !== 'production') {
    WithTheme.displayName = wrapDisplayName(BaseComponent, 'withStyles')
  }

  return WithTheme
}
