const inquirer = require("inquirer");
const mysql = require("mysql");

const connection = mysql.createConnection({
    host:"localhost", 
    user: "root",
    password: "password",
    database:"hw12"
});

const mainMenu = () => {
    inquirer.prompt([
        {
            name: "choice",
            message: "What would you like to do?",
            type: "list",
            choices: ["Quit"]
        }
    ]).then(answers => {
        switch(answers.choice) {
            case "Quit": 
                connection.end();
                break;
        }
    });
}; 

connection.connect();

mainMenu();

