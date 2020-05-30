const inquirer = require("inquirer");
const mysql = require("mysql");
require("console.table");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "hw12",
});

const first30Chars = (input) =>
  input.length > 30 ? input.substring(0, 30) : input;

const requiredNumber = (input) => !isNaN(parseFloat(input));
const toNumber = (input) =>
  isNaN(parseFloat(input)) ? input : parseFloat(input);

const mainMenu = async () => {
  const answers = await inquirer.prompt([
    {
      name: "choice",
      message: "What would you like to do?",
      type: "list",
      choices: ["Add Department", "Display Departments", "Add Role", "Quit"],
    },
  ]);
  switch (answers.choice) {
    case "Add Department":
      addDepartment();
      break;
    case "Quit":
      connection.end();
      break;
    case "Display Departments":
      displayDepartments();
      break;
    case "Add Role":
      addRole();
      break;
  }
};

const addDepartment = async () => {
  const answers = await inquirer.prompt([
    {
      name: "department",
      message: "Enter department name.",
      type: "input",
      filter: first30Chars,
    },
  ]);
  connection.query(
    "INSERT INTO department (name) VALUES (?)",
    [answers.department],
    (err, results, fields) => {
      if (err) {
        console.error("there is an error ", err.message);
        mainMenu();
        return;
      }
      console.log("department added successfully");
      mainMenu();
    }
  );
};

const displayDepartments = async () => {
  connection.query("SELECT * FROM department", (err, results, fields) => {
    if (err) {
      console.error("there is an error ", err.message);
      mainMenu();
      return;
    }
    console.table(results);
    mainMenu();
  });
};

const addRole = async () => {
  connection.query("SELECT * FROM department", async (err, results, fields) => {
    if (err) {
      console.error("there is an error ", err.message);
      mainMenu();
      return;
    }
    const choices = results.map((department) => ({
      value: department.id,
      name: department.name,
    }));
    const answers = await inquirer.prompt([
      {
        name: "title",
        message: "Enter role title.",
        type: "input",
        filter: first30Chars,
      },
      {
        name: "salary",
        message: "Enter role salary",
        type: "input",
        filter: toNumber,
        validate: requiredNumber,
      },
      {
        name: "department_id",
        message: "select department",
        type: "list",
        choices: choices,
      },
    ]);
    console.log(answers);
    mainMenu();
  });
};

connection.connect();

mainMenu();
