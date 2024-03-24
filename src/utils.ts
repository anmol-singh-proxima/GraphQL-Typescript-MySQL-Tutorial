import { pool } from '../database/db';
import { v4 as uuidv4 } from 'uuid';



/**********************************************************************************
 * Interfaces for the Types required in the Graphql Schema used in some functions *
 *********************************************************************************/

// Interface of type User for returning User type Promise in some functions
interface User {
    id: string
    name: string
    email: string
    password: string
}

interface Project {
    id: number
    title: string
    release: string
    status: string
}



/****************************************************************
 * Additional Utility Functions required in the other functions *
 ***************************************************************/

// Function to execute all the read queries
export const readQuery = async (query: string) => {
    try {
        const res = await pool.query(query);
        return res.rows;
    } catch (err) {
        console.error(err);
    }
}

// Function to find a user by email
export const findUserByEmail = async (email: string): Promise<User[]> => {
    const query = {
        text: 'SELECT * FROM users WHERE email = $1',
        values: [email]
    }

    try {
        const res = await pool.query(query);
        return res.rows;
    } catch (err) {
        console.error(err);
    }
    // return a dummy User object to prevent the user to get added in the database in-case something fails in the query
    return [{
        id: '0',
        name: "J Doe",
        email: 'jdoe@zcorp.com',
        password: 'passwordz'
    }]
}



/******************************************************************
 * Functions to Add Data in the individual Tables in the Database *
 *****************************************************************/

// Function to check whether the user exists: if yes then return error, if not then add the user
export const addUser = async (name: string, email: string, password: string) => {
    const query = {
        text: 'INSERT INTO users(id, name, email, password) VALUES($1, $2, $3, $4)',
        values: [uuidv4(), name, email, password],
    }

    const userQuery = await findUserByEmail(email);
    if (userQuery?.length === 0) {
        try {
            const res = await pool.query(query);
            console.log("User added successfuly.");
        } catch (err) {
            console.error(err);
        }
    } else {
        console.log("Unable to add user. Check your email address.");
    }
}

// Function to add a project details in the Database
export const addProject = async (title: string, release: string, status: string) => {
    const query = {
        text: 'INSERT INTO projects(title, release, status) VALUES($1, $2, $3)',
        values: [title, release, status],
    }

    try {
        const res = await pool.query(query);
        console.log("Project added.");
    } catch (err) {
        console.error(err);
    } 
}

// Function to add a project to a user, and it uses email of user to fetch the user_id
export const addAssignment = async (user_email: string, project_id: number, user_name: string) => {
    let user_id: string = '';
    const user = await findUserByEmail(user_email);
    if (user?.length === 0) {
        console.error("User with that email not found.");
        return;
    } else {
        user_id = user[0].id;
    }

    const query = {
        text: 'INSERT INTO assignments(project_id, user_id, user_name) VALUES($1, $2, $3)',
        values: [project_id, user_id, user_name],
    }

    try {
        const res = await pool.query(query);
        console.log('Assignment created.');
    } catch (err) {
        console.error(err);
    } 
}



/*********************************************
 * Functions to fetch data from the Database *
 ********************************************/

// Function to fetch all the users data
export const getAllUserDetails = async () => {
    const query = `SELECT * FROM users;`;
    return readQuery(query);
}

// Function to fetch all the projects data (corresponding to the users) from the assignments table
export const getAssignmentDetails = async () => {
    const query = `
    SELECT a.user_id, u.name, a.project_id, p.title, p.release, p.status 
    FROM ((users u
    INNER JOIN assignments a
    ON u.id = a.user_id)
    INNER JOIN projects p
    ON a.project_id = p.id);
    `;

    return readQuery(query);
}

// Function to fetch all the data required in the Graphql Query { users }
export const getAllUsersQuery = async () => {
    const usersFromUsersTable = await getAllUserDetails();
    const assignments = await getAssignmentDetails();
    const users = await usersFromUsersTable?.map(async (user) => {
        let projects: object [] = [];
        await assignments?.forEach(assignment => {
            if (user.id === assignment.user_id) {
                projects.push({
                   id: assignment.project_id,
                   title: assignment.title,
                   release: assignment.release,
                   status: assignment.status 
                });
            }
        })
        return {
            id: user.id,
            name: user.name,
            email: user.email,
            projects: projects,
        }
    })
    return users; 
}



/**********************************************
 * Functions to Create Tables in the Database *
 *********************************************/

// Function to create users table in the Database
export const createUsersTable = async () => {
    const query = `
    create table users (
        id varchar primary key,
        name varchar,
        email varchar,
        password varchar
    );
    `;

    return await readQuery(query) ? "Table created." : "Unable to create table.";
}

// Function to create projects table in the Database
export const createProjectsTable = async () => {

    const query = `
    CREATE TABLE projects (
        id serial primary key,
        title varchar,
        release varchar,
        status varchar
    );
    `;

    return await readQuery(query) ? "Table created." : "Unable to create table.";
}

// Function to create table assignments, this table is used to map the users with the projects they are assigned to
export const createAssignmentTable = async () => {
    const query = `
    CREATE TABLE assignments (
        id serial,
        project_id int references projects (id),
        user_id varchar references users (id),
        primary key (project_id, user_id),
        user_name varchar
    )
    `;

    return await readQuery(query) ? "Table created" : "Unable to create table.";
}



/**************************************************
 * Function to fetch table data from the Database *
 *************************************************/

// Function to fetch the list of all the tables in the Database 
export const listTables = async () => {
    const query = `
    SELECT table_name 
    FROM information_schema.tables 
    WHERE table_schema  = 'public' 
    ORDER BY table_name;
    `;

    return readQuery(query);
}
