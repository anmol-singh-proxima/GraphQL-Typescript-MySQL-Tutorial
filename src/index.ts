const { ApolloServer, gql } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');
import { typeDefs } from './graphql/schema';
import { resolvers } from './graphql/resolvers';

/* 
 * Copy paste the functions from /database/mockdb.js file here to add the data in the database
 * Uncomment the below import statement to import all the required functions  
 */

// import { createUsersTable, createProjectsTable, createAssignmentTable ,addUser, addProject, addAssignment } from './utils';

// Function to start the Server
const startServer = async () => {
    const server = new ApolloServer({ typeDefs, resolvers });
    const { url } = await startStandaloneServer(server, {
        listen: { port: 4000 },
    });
    console.log(`🚀  Server ready at: ${url}`);
}

startServer();