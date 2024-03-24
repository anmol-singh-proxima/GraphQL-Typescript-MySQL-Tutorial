/* 
 * The following Data needs to be entered in the tables
 * By using the functions given in the src/utils.js file
 * These functions needs to be imported in the src/index.ts file
 * These functions needs to be executed only once
*/

createUsersTable();
createProjectsTable();
createAssignmentTable();
addUser("Shreya Ghosal", "shreya@zcorp.com", "shreya@123");
addUser("Sunidhi Chauhan", "sunidhi@zcorp.com", "sunidhi@123");
addUser("Sheetal Bhardwaj", "sheetal@zcorp.com", "sheetal@123");
addProject("Safety Automated Narrative Generation", "R1.1", "active");
addProject("Graphql Backend Development", "R1.0", "active");
addProject("Spontaneous Case Analysis", "R2.0", "active");
addProject("Database Maintainance", "R1.0", "completed");
addAssignment("shreya@zcorp.com", 1, "Shreya");
addAssignment("sunidhi@zcorp.com", 2, "Sunidhi");
addAssignment("sheetal@zcorp.com", 3, "Sheetal");
addAssignment("shreya@zcorp.com", 2, "Shreya");
addAssignment("sunidhi@zcorp.com", 3, "Sunidhi");
addAssignment("sheetal@zcorp.com", 1, "Sheetal");
addAssignment("sheetal@zcorp.com", 4, "Sheetal");