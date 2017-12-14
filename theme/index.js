// @flow weak
/* eslint-disable new-cap */
import { create, SheetsRegistry } from 'jss'
import createGenerateClassName from 'material-ui/styles/createGenerateClassName'
import { createMuiTheme } from 'material-ui/styles'
import green from 'material-ui/colors/green'
import jssNested from 'jss-nested'
import preset from 'jss-preset-default'
import purple from 'material-ui/colors/purple'

const theme = createMuiTheme({
  palette: {
    primary: purple,
    secondary: green
  }
})

// Configure JSS
const jss = create(preset())
jss.use(jssNested)
jss.options.createGenerateClassName = createGenerateClassName

function createContext() {
  return {
    jss,
    theme,
    // This is needed in order to deduplicate the injection of CSS in the page.
    sheetsManager: new Map(),
    // This is needed in order to inject the critical CSS.
    sheetsRegistry: new SheetsRegistry()
  }
}

export function getContext() {
  // Make sure to create a new store for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (!process.browser) {
    return createContext()
  }

  // Reuse context on the client-side
  if (!global.__INIT_MATERIAL_UI__) {
    global.__INIT_MATERIAL_UI__ = createContext()
  }

  return global.__INIT_MATERIAL_UI__
}
