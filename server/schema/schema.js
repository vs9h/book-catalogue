const QueryType = require('./QueryType')
const MutationType = require('./MutationType')
const { GraphQLSchema } = require('graphql');

module.exports = new GraphQLSchema({ query: QueryType, mutation: MutationType });
