const {GraphQLServer} = require('graphql-yoga')

const messages = []
const typeDefs = `
type Message {
  _id: ID!
  user: String!
  text: String!
  createdAt: String!
}

type Query {
  messages: [Message!]
}

type Mutation {
  postMessage(user: String!, text: String!, createdAt: String): ID!
  deleteMessage(_id: ID!): ID!
}
`
const resolvers = {
  Query: {
    messages: () => messages,
  },
  Mutation: {
    postMessage: ( parent, {user, text, createdAt}) => {
      const _id = messages.length
      messages.push({
        _id,
        text,
        user,
        createdAt: new Date()
      })
      return _id
    },
    deleteMessage: (parent, {_id}) => {
      const msgIndex = messages.findIndex(msg => msg._id === args._id);
      const message = messages.splice(msgIndex, 1);
      return message[0];
    }
  }
}

const server = new GraphQLServer({typeDefs, resolvers})
server.start(({port}) => {
  console.log(`http://localhost:${port}`)
})
