const { gql } = require('graphql-tag');

export const typeDefs = gql`
    type Query {
        users: [User]
    }
    type User {
        id: String!
        name: String
        email: String
        password: String
        projects: [Project]!
    }
    type Project {
        id: Int!
        title: String
        release: String
        status: String
        members: [User]
    }
`;