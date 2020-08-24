// get the client
const mysql = require('mysql2');

// NPM installations
const inquirer = require('inquirer');
const logo = require("asciiart-logo");

// Additional Requirements
const connection = require('./connection')
const cTable = require('console.table');

//Application Runs
runEmpMgr = () => {
  const logoText = logo({ name: "Employee Manager" }).render();
  console.log(logoText)
    empMgrMenu();
};

//User Interface
empMgrMenu = () => {
    console.log(`Accessing Database...`)
    inquirer.prompt(
      {
        type: 'list',
        name: 'mainmenu',
        message: 'What do you need to do today?',
        choices: 
      [
       'View All Departments', //Interface Complete
       'View All Roles',  //Interface Complete
       'View All Employees', //Complete
       'Add a Department', 
       'Add a Role', 
       'Add An Employee', 
       'Update Employee Role',
       'Exit Employee Manager'
      ]
      })
      .then(function (response) {
        switch (response.mainmenu) {
          case 'View All Departments':
            viewAllDpt()
            break;
          case 'View All Roles':
            viewAllRoles()
            break;
          case 'View All Employees':
            viewAllEmp()
            break;
          case 'Add a Department':
            addDept()
            break;
          case 'Add a Role':
            addRole()
            break;
          case 'Add An Employee':
            addEmp()
            break;
          case 'Update Employee Role':
            updateEmpRole()
            break;
          case "Exit Employee Manager":
            process.exit()
      }
      })    
};

//Display Information and allow the user to move around the application.
viewAllDpt = () => {
  connection.query(
    `SELECT id AS "Department ID", dpt_name AS "Department Name" FROM department`,
    function (err, data) {
      if (err) throw err;
      console.table(data)
      inquirer.prompt(
        {
          type: 'list',
        name: 'allDpt',
        message: 'This is all of the information we have right now. What would you like to do next?',
        choices: 
          [
            'Return to Main Menu',
            'Exit Employee Manager'
          ]
        })
        .then(function (response) {
          switch (response.allEmp) {
            case 'Return to Main Menu':
              empMgrMenu()
              break;
            case "Exit Employee Manager":
              process.exit()
          }
        }) 
    }
  );
};

viewAllRoles = () => {
  connection.query(
    `SELECT emp_role.title, emp_role.salary, department.dpt_name AS department FROM emp_role
    LEFT JOIN department on emp_role.department_id = department.id`,
    function (err, data) {
      if (err) throw err;
      console.table(data)
      inquirer.prompt(
        {
          type: 'list',
        name: 'allRoles',
        message: 'This is all of the information we have right now. What would you like to do next?',
        choices: 
          [
            'Return to Main Menu',
            'Exit Employee Manager'
          ]
        })
        .then(function (response) {
          switch (response.allEmp) {
            case 'Return to Main Menu':
              empMgrMenu()
              break;
            case "Exit Employee Manager":
              process.exit()
          }
        }) 
    }
  );
};

viewAllEmp = () => {
  connection.query(
    `SELECT employee.id, employee.first_name, employee.last_name, 
    emp_role.title, department.dpt_name AS department, emp_role.salary, 
    CONCAT(manager.first_name, ' ', manager.last_name) AS manager 
    FROM employee LEFT JOIN emp_role on employee.role_id = emp_role.id 
    LEFT JOIN department on emp_role.department_id = department.id 
    LEFT JOIN employee manager on manager.id = employee.manager_id`,
    function (err, data) {
      if (err) throw err;
      console.table(data)
      inquirer.prompt(
        {
          type: 'list',
        name: 'allEmp',
        message: 'This is all of the information we have right now. What would you like to do next?',
        choices: 
          [
            'Return to Main Menu',
            'Exit Employee Manager'
          ]
        })
        .then(function (response) {
          switch (response.allEmp) {
            case 'Return to Main Menu':
              empMgrMenu()
              break;
            case "Exit Employee Manager":
              process.exit()
          }
        }) 
    }
  );
};

addDept = () => {

};

addRole = () => {

};

addEmp = () => {

};

updateEmpRole = () => {

};

 
// simple query
// connection.query(
//   'SELECT * FROM `table` WHERE `name` = "Page" AND `age` > 45',
//   function(err, results, fields) {
//     // console.log(results); // results contains rows returned by server
//     // console.log(fields); // fields contains extra meta data about results, if available
//   }
// );
 
// with placeholder
// connection.query(
//   'SELECT * FROM employee',
//   function(err, results) {
//   console.log(results);
//   }
// );


// runEmpMgr();