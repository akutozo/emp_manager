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
            addDpt()
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
          switch (response.allDpt) {
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
          switch (response.allRoles) {
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

addDpt = () => {
  inquirer.prompt([
    {
      type: 'input',
      name: "dptName",
      message: "Give your Department a Name: "
    }
  ])
    .then(function (answer) {
      var query = connection.query("INSERT INTO department (dpt_name) VALUES (?)",
        [dpt_name = answer.dptName],

        function (err, result) {
          if (err) throw err;
          console.log(answer.dpt + " has been added to department list")
          inquirer.prompt(
            {
              type: 'list',
            name: 'addDptComplete',
            message: 'What would you like to do next?',
            choices: 
              [
                'Return to Main Menu',
                'View All Departments',
                'Add A Role',
                'Add An Employee',
                'Exit Employee Manager'
              ]
            })
            .then(function (response) {
              switch (response.addDptComplete) {
                case 'Return to Main Menu':
                  empMgrMenu()
                  break;
                case 'View All Departments':
                  viewAllDpt()
                  break;
                case 'Add a Role':
                  addRole()
                  break;
                case 'Add An Employee':
                  addEmp()
                  break;
                case "Exit Employee Manager":
                  process.exit()
                }
            })
        })
    })
}

addRole = () => {
  inquirer.prompt([
    {
      type: 'input',
      name: "title",
      message: "Give your Role a Title: "
    },
    {
      type: 'decimal',
      name: "salary",
      message: "Assign a Salary:"
    },
    {
      type: 'input',
      name: "department_id",
      message: "Provide the ID number for your Deparment (Use 7 if Unsure):"
    }
  ])
  .then(function (answer) {
    var query = "INSERT INTO emp_role SET ?"
        const values = {
          title: answer.title,
          salary: answer.salary,
          department_id: answer.department_id
        }
        connection.query(query, values, function (err) {
          if (err) throw err;
          console.table("Role created!");

        console.log(answer.title + " has been added to existing roles")
        inquirer.prompt(
          {
            type: 'list',
          name: 'addRoleComplete',
          message: 'What would you like to do next?',
          choices: 
            [
              'Return to Main Menu',
              'View All Departments',
              'Add Another Role',
              'Add An Employee',
              'Exit Employee Manager'
            ]
          })
          .then(function (response) {
            switch (response.addRoleComplete) {
              case 'Return to Main Menu':
                empMgrMenu()
                break;
              case 'View All Departments':
                viewAllDpt()
                break;
              case 'Add Another Role':
                addRole()
                break;
              case 'Add An Employee':
                addEmp()
                break;
              case "Exit Employee Manager":
                process.exit()
              }
          })
      })
  })
};

addEmp = () => {
  inquirer.prompt([
    {
      type: 'input',
      name: "first_name",
      message: "Enter First Name: "
    },
    {
      type: 'input',
      name: "last_name",
      message: "Enter Last Name"
    },
    {
      type: 'input',
      name: "role_id",
      message: "Provide the ID number their Role (Use 7 if Unsure):"
    },
    {
      type: 'input',
      name: "manager_id",
      message: "Provide the ID number their Role (Must Provide Number):"
    },
  ])
  .then(function (answer) {
    var query = "INSERT INTO employee SET ?"
        const values = {
          first_name: answer.first_name,
          last_name: answer.last_name,
          role_id: answer.role_id,
          manager_id: answer.manager_id
        }
        connection.query(query, values, function (err) {
          if (err) throw err;
          console.table("Employee has been added to the system.");
        inquirer.prompt(
          {
            type: 'list',
          name: 'addEmpComplete',
          message: 'What would you like to do next?',
          choices: 
            [
              'Return to Main Menu',
              'View All Departments',
              'Add Another Role',
              'Add An Employee',
              'Exit Employee Manager'
            ]
          })
          .then(function (response) {
            switch (response.addEmpComplete) {
              case 'Return to Main Menu':
                empMgrMenu()
                break;
              case 'View All Departments':
                viewAllDpt()
                break;
              case 'Add Another Role':
                addRole()
                break;
              case 'Add An Employee':
                addEmp()
                break;
              case "Exit Employee Manager":
                process.exit()
              }
          })
      })
  })
};

updateEmpRole = () => {
  //Need to add a put
  //Create List of Departments
  //Create List of Employees in that Department
  //Select Employee From List
  //Be Presented with List of Roles Inside Department
  //Be Presented with Option to Expand Roles Outside Department
  //Role Select UPDATE employee
}