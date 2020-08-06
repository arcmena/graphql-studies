const { ApolloServer, gql } = require("apollo-server");

// All requests are POST requests
// All requests go through the same endpoint (/graphql)

// Query -> Get data (GET)
// Mutation -> Mutate / Manipulate data (POST/PUT/PATCH/DELETE)
// Scalar Types -> String, Int, Boolean, Float and ID

const typeDefs = gql`
  type Query {
    hello: String
  }
`;

const resolvers = {
  Query: {
    hello: () => "Hello World",
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => console.log(`Server listening at ${url}`));
