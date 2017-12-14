// @flow
import MUIExpansionPanel, {
  ExpansionPanelDetails as MUIExpansionPanelDetails,
  ExpansionPanelSummary as MUIExpansionPanelSummary
} from 'material-ui/ExpansionPanel'
import MUIList, {
  ListItem as MUIListItem,
  ListItemText as MUIListItemText,
  ListSubheader as MUIListSubheader
} from 'material-ui/List'
import classNames from 'classnames'
import { InputAdornment as MUIInputAdornment } from 'material-ui/Input'
import { MenuItem as MUIMenuItem } from 'material-ui/Menu'
import React from 'react'
import { withStyles } from 'material-ui/styles'

export { default as AppBar } from 'material-ui/AppBar'
export { default as Drawer } from 'material-ui/Drawer'
export { default as Grid } from 'material-ui/Grid'
export { default as IconButton } from 'material-ui/IconButton'
export { default as Paper } from 'material-ui/Paper'
export { default as TextField } from 'material-ui/TextField'
export { default as Toolbar } from 'material-ui/Toolbar'
export { default as Typography } from 'material-ui/Typography'

const ContainerStyles = () => ({ root: { maxHeight: 50 } })
export const Container = withStyles(ContainerStyles)(
  ({ children, className, classes, ...props }: Object) =>
    (<div { ...props } className={ classNames(classes.root, className) }>{children}</div>)
)


export const ExpansionPanel = MUIExpansionPanel
export const ExpansionPanelSummary = MUIExpansionPanelSummary
export const ExpansionPanelDetails = MUIExpansionPanelDetails
export const InputAdornment = MUIInputAdornment
export const MenuItem = MUIMenuItem
export const List = MUIList
export const ListItem = MUIListItem
export const ListItemText = MUIListItemText
export const ListSubheader = MUIListSubheader
