const { prompt } = require("inquirer");
const logo = require("asciiart-logo");
const db = require("./db");
require("console.table");
init();
// Display logo text, load main prompts
function init() {
  const logoText = logo({ name: "Employee Manager" }).render();
  console.log(logoText);
  loadMainPrompts();
}
function loadMainPrompts(){
    prompt([
        {
            type: 'list',
            name: 'choice',
            message: 'What would you like to do?',
            choices: [
                {
                    name: "View All Employees",
                    value: "VIEW_EMPLOYEES"
                  },
                  {
                    name: "View All Employees By Department",
                    value: "VIEW_EMPLOYEES_BY_DEPARTMENT"
                  },
            ]
        }
    ]).then(res => {
        let choice = res.choice;
        switch (choice) {
            case 'VIEW_EMPLOYEES':
                viewAllEmployees();
                break;
            case 'VIEW_EMPLOYEES_BY_DEPARTMENT':
                viewAllEmployeesByDepartment();
            default:
                break;
        }
    })
}
function viewAllEmployees(){
    db.findAllEmployees(([rows]) => {
        let employees = rows;
        console.log('\n');
        console.table(employees);
    }).then(() => loadMainPrompts());
}
function viewAllEmployeesByDepartment(){
    db.findAllDepartments(([rows]) => {
        let departments = rows;
        const departmentChoices = departments.map(department => ({
            name: department.name,
            value: department.id,
        }))
        prompt([{
            type: 'list',
            name: 'departmentId',
            message: 'Which department would you like to see employees for?',
            choices: departmentChoices
        }])
           .then(res => db.findAllEmployeesByDepartment(res.departmentId))
           .then(([rows]) => {
               let employees = rows;
               console.log('\n');
               console.table(employees);
           })
           .then(() => loadMainPrompts())
        })
}