const connection = require('./connection');
class DB {
  constructor(connection) {
    this.connection = connection;
  }
  findAllEmployees() {
    return this.connection
      .promise()
      .query(
        "SELECT employee.id, employee.first_name, employee.last_name, emp_role.title, department.dpt_name AS department, emp_role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN emp_role on employee.role_id = emp_role.id LEFT JOIN department on emp_role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;"
      );
  }
  findAllEmployeesByDepartment(departmentId) {
    return this.connection.promise().query(
        "SELECT employee.id, employee.first_name, employee.last_name, emp_role.title FROM employee LEFT JOIN emp_role on employee.role_id = emp_role.id LEFT JOIN department department on emp_role.department_id = department.id WHERE department.id = ?;",
      departmentId
    );
  }
}
module.exports = new DB(connection);