const inquirer = require('inquirer');
const querys = require('./querysfile');


const options = [
    'View All Departments',
    'View All Roles',
    'View All Employees',
    'Add A Department',
    'Add A Role',
    'Add An Employee',
    'Update An Employee Role'
]

const questions = [
   
    {   
        type: 'list',
        name: 'option',
        message: 'What would you like to do? ',
        choices: options
    }
]

const roleQuestions=[
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
    



function init(){
   
    // console.log(art.create("Some Text", 'doom',true))
    

        inquirer.prompt(questions).then((answer) => {

            if(answer.option === options[0]){
                querys.viewDpt();
            }
    
            if(answer.option === options[1]){
                querys.viewRol();
            }
    
            if(answer.option === options[2]){
                querys.viewEmp();
            }
    
            if(answer.option === options[3]){
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
                })
            }
            
            if(answer.option === options[4]){
                inquirer
                .prompt(roleQuestions)
                .then((answer) => {
                    querys.addRol(answer.title, answer.salary, answer.department_id);
                })
            }
            
            if(answer.option === options[5]){
                querys.addEmp();
            }
    
            if(answer.option === options[6]){
                querys.upEmpRol();
            }
            
        })
    }

init();