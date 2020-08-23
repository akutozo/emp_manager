// get the client
const mysql = require('mysql2');

// NPM installations
const inquirer = require('inquirer');

// Additional Requirements
const fs = require("fs")

 
// create the connection to database
const connection = mysql.createConnection({
  host: 'localhost',
  port: '3005',
  user: 'root',
  password: 'swordfish',
  database: 'emp_mgr_db'
});

connection.connect(err => {
  if (err) throw err;
  console.log('connected as id ' + connection.threadId);
  start();
});

//Application Runs
runEmpMgr = () => {
    console.log(`
        Welcome to the Employee Management Interface.
    `
    );
    empMgrMenu();
};

empMgrMenu = () => {
    console.log(`Accessing Database...`)
    inquirer.prompt(
      {
        type: 'list',
        name: 'mainmenu',
        message: 'What do you need to do today?',
        choices: 
      [
       'View All Departments', 
       'View All Roles', 
       'View All Employees', 
       'Add a Department', 
       'Add a Role', 
       'Add An Employee', 
       'Update Employee Role'
      ]
      })
      .then(function (response) {
        switch (response.mainmenu) {
          case 'View All Departments':
            viewAllDepartments()
            break;
        }
      })    
};

viewAllDepartments = () => {
  console.log(`Viewing all Departments - Placeholder`)
  inquirer.prompt(
    {
      type: 'list',
    name: 'dptmenu',
    message: 'All Derpartments',
    choices: 
      [
        'Return to Main Menu',
        'Exit Employee Manager'
      ]
    })
    .then(function (response) {
      switch (response.dptmenu) {
        case 'Return to Main Menu':
          empMgrMenu()
          break;
        case "Exit Employee Manager":
          break;
      }
    }) 
};

 
// simple query
connection.query(
  'SELECT * FROM `table` WHERE `name` = "Page" AND `age` > 45',
  function(err, results, fields) {
    // console.log(results); // results contains rows returned by server
    // console.log(fields); // fields contains extra meta data about results, if available
  }
);
 
// with placeholder
connection.query(
  'SELECT * FROM `table` WHERE `name` = ? AND `age` > ?',
  ['Page', 45],
  function(err, results) {
    // console.log(results);
  }
);


runEmpMgr();