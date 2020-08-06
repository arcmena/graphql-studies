const { ApolloServer, gql } = require('apollo-server');

// All requests are POST requests
// All requests go through the same endpoint (/graphql)

// Query -> Get data (GET)
// Mutation -> Mutate / Manipulate data (POST/PUT/PATCH/DELETE)
// Scalar Types -> String, Int, Boolean, Float and ID

const typeDefs = gql`
    type User {
        _id: ID!
        name: String!
        email: String
        active: Boolean
    }

    type Post {
        _id: ID!
        title: String!
        content: String!
        author: User!
    }

    type Query {
        hello: String
        users: [User!]!
        getUserByEmail(email: String!): User!
    }

    type Mutation {
        createUser(name: String!, email: String!): User!
    }
`;

const users = [
    { _id: String(Math.random()), name: 'Marcelo', email: 'marcelo@test', active: true },
    { _id: String(Math.random()), name: 'Marcelo 1', email: 'marcelo1@test', active: false },
    { _id: String(Math.random()), name: 'Marcelo 2', email: 'marcelo2@test', active: true },
];

const resolvers = {
    Query: {
        hello: () => 'Hello World',
        users: () => users,
        getUserByEmail: (_, args) => {
            return users.find((user) => user.email === args.email);
        },
    },
    Mutation: {
        createUser: (_, args) => {
            const newUser = {
                _id: String(Math.random()),
                name: args.name,
                email: args.email,
                active: true,
            };
            users.push(newUser);
            return newUser;
        },
    },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => console.log(`Server listening at ${url}`));
