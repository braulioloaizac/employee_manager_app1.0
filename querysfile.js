const cTable = require('console.table');

const mysql = require('mysql2');
//Imports the envivorment variables
require('dotenv').config();

// Connect to database
const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: process.env.password,
      database: 'employee_traker'
    },
    console.log('Connected to the database.')
  );





const viewDpt = () => {
    const sql = `SELECT id AS Id, name AS Department FROM department;`;

    db.query(sql, (err, results) => {
        if (err) {
          console.log(err)
        return;
        }
        
        const table = cTable.getTable(results);
        console.log(table);
        

  });
}






const viewRol = () => {
    const sql = `SELECT r.id AS Id, 
                        r.title AS Title, 
                        r.salary AS Salary, 
                        d.name AS Department 
                FROM role AS r
                JOIN department AS d
                ON r.id = d.id;`;

    db.query(sql, (err, results) => {
        if (err) {
          console.log(err)
        return;
        }
        
        const table = cTable.getTable(results);
        console.log(table);
  });
}






const viewEmp = () => {
    const sql = `
    SELECT  e.id AS id, 
		        e.first_name AS first_name,
		        e.last_name AS last_name, 
		        e.manager_id AS manager, 
		        r.title AS title, 
            r.salary AS salary,
            d.name AS department
    FROM employee_traker.employee AS e
    JOIN employee_traker.role AS r
    ON e.role_id = r.id
    JOIN employee_traker.department AS d
    ON r.department_id = d.id
    `;

    db.query(sql, (err, results) => {
        if (err) {
        console.log(err)
        return;
        }
        
        const table = cTable.getTable(results);
        console.log(table);
  });
}





const addDpt = (department) => {
  const sql = `INSERT INTO department (name)
               VALUES (?)`;

  db.query(sql,[department], (err, results) => {
      if (err) {
        console.log(err)
      return;
      }
      console.log(`${department} added`);
});
}





const addRol = (title, salary, department_id) => {
  const sql = `INSERT INTO role (title, salary, department_id)
              VALUES 	(?,?,?);`;

  db.query(sql,[title,  parseInt(salary), parseInt(department_id)], (err, results) => {
      if (err) {
        console.log(err)
      return;
      }
      console.log(`${title} added`);
});
}





const addEmp = (first_name, last_name, role_id, manager_id) => {
  const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
              VALUES 	(?,?,?,?);`;

  db.query(sql,[ first_name,  last_name, parseInt(role_id), parseInt(manager_id)], (err, results) => {
      if (err) {
        console.log(err)
      return;
      }
      console.log(`${first_name} added`);
});
}






const upEmpRol = (role_id, id) => {
  const sql = `UPDATE employee SET role_id = ? WHERE id = ?;`;

  db.query(sql, [ parseInt(role_id), parseInt(id)], (err, results) => {
    if (err) {
      console.log(err)
      return;
    }
    console.log(`Role of employee #${id} updated`);
  });

}

module.exports = { viewDpt, viewRol, viewEmp, addDpt, addRol, addEmp, upEmpRol };