const inquirer=require ('inquirer');
// const mysql=require('mysql');
const mysql=require('mysql2');

//required libraries

//Connect to mysql server

const dbConnection = mysql.createConnection(
    {
        host: "localhost",

        user:'root',

        password:'scarlett1994',

        database: 'tracker_db',

        port: 3306
    }) ;
    const questions = () => {  //initial inquirer prompt
      return inquirer
        .prompt([

          {
            type: "list",
            message: "What would you like to do?",
            name:"prompt",
            choices:[
            "view all departments", 
            "view all roles", 
            "view all employees", 
            "add a department", 
            "add a role", 
            "add an employee",
            "update an employee role"]

          }
        ])
      .then((answers)=> {
        const { prompt } = answers;

        if (prompt === "view all departments") {
          viewAllDepartments();
        }
        if (prompt ==="view all roles") {
          viewAllRoles();
        }
        if (prompt ==="view all employees") {
          viewAllEmployees();
        }
        if (prompt === "add a department") {
          addDepartment();
        }
        if (prompt === "add a role") {
          addRole();
        }
        if (prompt === "add an employee") {
          addEmployee();
        }
        if (prompt === "update an employee role") {
          updateRole();
        };


      });
      
      }; //view all departments t
      viewAllDepartments = () => {
        const query = "SELECT * FROM departments";
      
        dbConnection.query(query, (err, results) => {
          if (err) {
            console.error("Error fetching departments: " + err.message);
          } else {
            if (results.length === 0) {
              console.log("No departments found.");
            } else {
              console.table(results);
            }
      
            // Return to the main menu
            questions();
          }
        });
      };
//viewing all roles from table
      viewAllRoles = () => {
        console.log('Viewing all roles');
        const query = "SELECT * FROM role";
      
        dbConnection.query(query, (err, results) => {
          if (err) {
            console.error("Error fetching role: " + err.message);
          } else {
            if (results.length === 0) {
              console.log("No role found.");
            } else {
              console.table(results);
            }
      
            // Return to the main menu
            questions();
          }
        });
      };

     //viewing all emplloyees 
      viewAllEmployees = () => {
        console.log('Viewing all employees');
        const query = "SELECT * FROM employee";
      
        dbConnection.query(query, (err, results) => {
          if (err) {
            console.error("Error fetching employee: " + err.message);
          } else {
            if (results.length === 0) {
              console.log("No employee found.");
            } else {
              console.table(results);
            }
      
            // Return to the main menu
            questions();
          }
        });
      };

      //add department prompt
      addDepartment = () => {
        inquirer
          .prompt([
            {
              type: "input",
              message: "Enter the name of the department:",
              name: "department_name",
            },
          ])
          .then((answers) => {
            const { department_name } = answers;
      
            // SQL query to insert a new department into the 'departments' table
            const query = "INSERT INTO departments (department_name) VALUES (?)";
      
            // Execute the query with the user-provided department name
            dbConnection.query(query, [department_name], (err, results) => {
              if (err) {
                console.error("Error adding department: " + err.message);
              } else {
                console.log(`Department '${department_name}' added successfully.`);
              };
      
              // Return to the main menu
              questions();
            });
          });
      };
      //add role prompt
      // name, salary, and department for the role and that role is added to the database
      addRole = () => {
        inquirer
          .prompt([
            {
              type: "input",
              message: "Enter the name of the role:",
              name: "title",
            },
            {
              type: "input",
              message: "Enter the salary for the role:",
              name: "salary",
            },
            {
              type: "input",
              message: "Enter the department id for the role:",
              name: "department_id",
            },
          ])
          .then((answers) => {
            const { title, salary, department_id } = answers;
      
            // SQL query to insert a new department into the 'departments' table
            const query = "INSERT INTO role (title, salary, department_id) VALUES (?,?, ?)";
      
            // Execute the query with the user-provided department name
            dbConnection.query(query, [title, salary, department_id], (err, results) => {
              if (err) {
                console.error("Error adding role: " + err.message);
              } else {
                console.log(`Role '${title} ${salary} ${department_id}' added successfully.`);
              };
      
              // Return to the main menu
              questions();
            });
          });
      };

      //add employee 
      addEmployee = () => {
        inquirer
          .prompt([
            {
              type: "input",
              message: "Enter the first name of the employee:",
              name: "first_name",
            },
            {
              type: "input",
              message: "Enter the last name of the employee:",
              name: "last_name",
            },
            {
              type: "input",
              message: "Enter the role id of the employee:",
              name: "role_id",
            },
            {
              type: "input",
              message: "Enter the employee's manager",
              name: "manager",
            },
            
            
          ])
          .then((answers) => {
            const { first_name, last_name, role_id, manager } = answers;
      
            // SQL query to insert a new employee into the 'employee' table
            const query = "INSERT INTO employee (first_name, last_name, role_id, manager) VALUES (?, ?, ?, ?)";
      
            // Execute the query with the user-provided employee first name, last name, and role id
            dbConnection.query(query, [first_name, last_name, role_id, manager], (err, results) => {
              if (err) {
                console.error("Error adding employee: " + err.message);
              } else {
                console.log(`Employee '${first_name} ${last_name} ${role_id}' added successfully.`);
              };
      
              // Return to the main menu
              questions();
            });
          });
      };
//update employee role, use UPDATE
      updateRole = () => {
        inquirer
            .prompt([
                {
                    type: "input",
                    message: "Enter the ID of the employee whose role you want to update:",
                    name: "employee_id",
                },
                {
                    type: "input",
                    message: "Enter the new role ID for the employee:",
                    name: "role_id",
                },
            ])
            .then((answers) => {
                const { employee_id, role_id } = answers;
    
                // SQL query to update the employee's role
                const query = "UPDATE employee SET role_id = ? WHERE id = ?";
    
                // Execute the query with the user-provided employee_id and role_id
                dbConnection.query(query, [role_id, employee_id], (err, results) => {
                    if (err) {
                        console.error("Error updating employee role: " + err.message);
                    } else {
                        if (results.affectedRows === 0) {
                            console.log("Employee not found or role not updated.");
                        } else {
                            console.log(`Employee's role updated successfully.`);
                        }
                    }
    
                    // Return to the main menu
                    questions();
                });
            });
    };
    


questions();
