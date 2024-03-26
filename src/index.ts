const { ApolloServer, gql } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');
import { typeDefs } from './graphql/schema';
import { resolvers } from './graphql/resolvers';
import db from '../models';

/**
 * Uncomment the following lines of Code and execute them only once just to add the data in the database in all the three tables
 */
// import { createUsers, createProjects, createAssignments } from './utils'; 
// createUsers();
// createProjects();
// createAssignments();

// Function to start the Server
const startServer = async () => {
    const server = new ApolloServer({ typeDefs, resolvers });
    db.sequelize.sync().then(async () => {
        const { url } = await startStandaloneServer(server, {
            listen: { port: 4000 },
        });
        console.log(`🚀  Server ready at: ${url}`);
    })
}

startServer();
