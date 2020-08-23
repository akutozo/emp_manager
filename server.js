//dpt = Department
//emp = Employee

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
       'View All Employees', //Interface Complete
       'Add a Department', 
       'Add a Role', 
       'Add An Employee', 
       'Update Employee Role'
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
        }
      })    
};

//Display Information and allow the user to move around the application.
viewAllDpt = () => {
  console.log(`Viewing all Departments - Placeholder`)
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
      switch (response.allDpt) {
        case 'Return to Main Menu':
          empMgrMenu()
          break;
        case "Exit Employee Manager":
          break;
      }
    }) 
};

viewAllRoles = () => {
  console.log(`Viewing All Roles - Placeholder`)
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
      switch (response.allRoles) {
        case 'Return to Main Menu':
          empMgrMenu()
          break;
        case "Exit Employee Manager":
          break;
      }
    }) 
};

viewAllEmp = () => {
  console.log(`Viewing All Employees - Placeholder`)
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
          break;
      }
    }) 
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