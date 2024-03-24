import { getAllUsersQuery } from '../utils';

export const resolvers = {
    Query: {
        users: async () => getAllUsersQuery()
    },
};