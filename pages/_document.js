// @flow weak
/* eslint-disable new-cap, react/display-name */
import Document, { Head, Main, NextScript } from 'next/document'
import AppIcons from '../components/AppIcons'
import { getContext } from '../theme'
import Helmet from 'react-helmet'
import JssProvider from 'react-jss/lib/JssProvider'
import React from 'react'


export default class MyDocument extends Document {
  static getInitialProps(ctx: any) {
    const { renderPage } = ctx

    // Resolution order
    //
    // On the server:
    // 1. page.getInitialProps
    // 2. document.getInitialProps
    // 3. page.render
    // 4. document.render
    //
    // On the server with error:
    // 2. document.getInitialProps
    // 3. page.render
    // 4. document.render
    //
    // On the client
    // 1. page.getInitialProps
    // 3. page.render

    // Get the context to collected side effects.
    const context = getContext()
    const page = renderPage(Component => props => (
      <JssProvider jss={ context.jss } registry={ context.sheetsRegistry }>
        <Component { ...props } />
      </JssProvider>
    ))

    return {
      ...page,
      stylesContext: context,
      styles: (
        <style
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: context.sheetsRegistry.toString() }}
          id="jss-server-side"
        />
      ),
      helmet: Helmet.rewind()
    }
  }

  // should render on <html>
  helmetHtmlAttrComponents() {
    return this.props.helmet.htmlAttributes.toComponent()
  }

  // should render on <head>
  helmetHeadComponents() {
    const keys = Object.keys(this.props.helmet)
      .filter(el => el !== 'htmlAttributes')
      .map(el => this.props.helmet[el].toComponent())
      .filter(
        el => !(Object.keys(el).length === 0 && el.constructor === Object)
      )

    return keys.length ? keys : []
  }

  render() {
    const { stylesContext } = this.props
    return (
      <html lang="en" { ...this.helmetHtmlAttrComponents() }>
        <Head>
          <meta content="index,follow" name="robots" />
          <meta content="10800" httpEquiv="expires" />
          <meta content="es-AR" name="language" />
          <meta content="ARG" name="country" />
          <meta content="$" name="currency" />
          <meta content="IE=edge" httpEquiv="X-UA-Compatible" />
          <meta content="no-cache" httpEquiv="pragma" />
          <meta content="text/html;charset=utf-8" httpEquiv="Content-Type" />
          <meta
            content={
              'Comprá smart tv, celulares, electrodoméstivos, heladeras, todos los productos en Frávega.'
              + ' Pagá en cuotas con todas las tarjetas!'
            }
            name="description"
          />
          <meta content="Frávega - Electrodomésticos, Tecnología y Artículos para el hogar" name="Abstract" />
          <meta content="Frávega" name="author" />
          <meta content="Frávega" name="copyright" />
          <meta
            content="user-scalable=0, initial-scale=1, minimum-scale=1, width=device-width, height=device-height"
            name="viewport"
          />
          <link href="/static/manifest.json" rel="manifest" />
          <link href="/static/favicon.png" rel="shortcut icon" type="image/x-icon" />
          <meta content={ stylesContext.theme.palette.primary[500] } name="theme-color" />
          { this.helmetHeadComponents() }
          { AppIcons() }
          <link
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500"
            rel="stylesheet"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}
