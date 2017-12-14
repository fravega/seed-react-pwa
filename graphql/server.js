/* eslint-disable dot-notation, consistent-this */

const fetch = require('node-fetch')
const { HttpLink } = require('apollo-link-http')
const { introspectSchema, makeRemoteExecutableSchema, mergeSchemas } = require('graphql-tools')

const searchLink = new HttpLink({ uri: '<uri>', fetch })

const searchSchema = introspectSchema(searchLink)
  .then(schema => makeRemoteExecutableSchema({ schema, link: searchLink }))

const schemas = Promise.all([ searchSchema ])

module.exports = { schema: schemas.then(schemas => mergeSchemas({ schemas })) }
