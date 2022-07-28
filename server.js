const inquirer = require('inquirer');
const querys = require('./querysfile');


const options = [
    'View All Departments',
    'View All Roles',
    'View All Employees',
    'Add A Department',
    'Add A Role',
    'Add An Employee',
    'Update An Employee Role',
    'Update An Employee Manager',
    'View Employees By Manager'
]

const question = [

    {
        type: 'list',
        name: 'option',
        message: 'What would you like to do? ',
        choices: options
    }
]

const roleQuestions = [
    {
        type: 'input',
        name: 'title',
        message: 'Enter Title Name: '
    },
    {
        type: 'input',
        name: 'salary',
        message: 'Enter Salary: '
    },
    {
        type: 'input',
        name: 'department_id',
        message: 'Enter Department ID: '
    }
]

const employeeQuestions = [
    {
        type: 'input',
        name: 'first_name',
        message: 'Enter First Name: '
    },
    {
        type: 'input',
        name: 'last_name',
        message: 'Enter Last Name: '
    },
    {
        type: 'input',
        name: 'role_id',
        message: 'Enter Role ID: '
    },
    {
        type: 'input',
        name: 'manager_id',
        message: 'Enter Manager ID: '
    }
]

const updateRolQuestions = [
    {
        type: 'input',
        name: 'id',
        message: 'Enter Employee ID: '
    },
    {
        type: 'input',
        name: 'role_id',
        message: 'Enter the New Role ID: '
    }
]


const updateManQuestions = [
    {
        type: 'input',
        name: 'id',
        message: 'Enter Employee ID: '
    },
    {
        type: 'input',
        name: 'manager_id',
        message: 'Enter the New Manager ID for the Current Employee: '
    }
]



//const mysql = require('mysql2');
const mysql = require('mysql2/promise');
//Imports the envivorment variables
require('dotenv').config();



async function init() {

    console.log('Welcome to the Office Employee Manager');

    // Connect to database
    const db = await mysql.createConnection(
        {
            host: 'localhost',
            user: 'root',
            password: process.env.password,
            database: 'employee_traker'
        },
        console.log('Connected to the database.')
    );


    inquirer.prompt(question).then((answer) => {

        if (answer.option === options[0]) {
            querys.viewDpt();
            init();
        }

        if (answer.option === options[1]) {
            querys.viewRol();
            init();
        }

        if (answer.option === options[2]) {
            querys.viewEmp();
            init();
        }

        if (answer.option === options[3]) {
            inquirer
                .prompt(
                    {
                        type: 'input',
                        name: 'department',
                        message: 'Enter Department Name: '
                    }
                )
                .then((answer) => {
                    querys.addDpt(answer.department);
                    init();
                })
        }

        if (answer.option === options[4]) {
            inquirer
                .prompt(roleQuestions)
                .then((answer) => {
                    querys.addRol(answer.title, answer.salary, answer.department_id);
                    init();
                })
        }

        if (answer.option === options[5]) {
            inquirer
                .prompt(employeeQuestions)
                .then((answer) => {
                    querys.addEmp(answer.first_name, answer.last_name, answer.role_id, answer.manager_id);
                    init();
                })

        }

        if (answer.option === options[6]) {
            inquirer
                .prompt(updateRolQuestions)
                .then((answer) => {
                    querys.upEmpRol(answer.role_id, answer.id);
                    init();
                }
                )
        }


        if (answer.option === options[7]) {
            inquirer
                .prompt(updateManQuestions)
                .then((answer) => {
                    querys.upEmpMan(answer.manager_id, answer.id);
                    init();
                }
                )
        }


        if (answer.option === options[8]) {
            inquirer
            .prompt(
                {
                    type: 'input',
                    name: 'manager_id',
                    message: 'Enter Manager ID: '
                }
            )
            .then((answer) => {
                querys.viewEmpMan(answer.manager_id);
                init();
            })
            
        }
    })
}

init();