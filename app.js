//linking modules and packages
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");
const render = require("./lib/htmlRenderer");

//initializing key variables
const employeeList = [];
let isThereAManager = false;

function initialize() {
    inquirer
        .prompt([
            {
                type: "list",
                name: "jobType",
                message: "What would you like to log?",
                choices: [
                    "Manager",
                    "Engineer",
                    "Intern",
                    "All Employees Accounted For"
                ]
            }
        ])
        .then(answers => {
            if (answers.jobType === "Engineer") {
                addEngineer();
            }
            else if (answers.jobType === "Manager") {
                if (isThereAManager === false) {
                    isThereAManager = true;
                    addManager();
                } else {
                    console.log("Please Re-assign Employee Role.");
                    initialize();
                }
            }
            else if (answers.jobType === "Intern") {
                addIntern();
            }
            else {
                end();
            }
        });
}

function addManager() {
    inquirer
      .prompt([
        {
          type: "input",
          name: "managerName",
          message: "Please input the Manager's Name.",
        },
        {
          type: "input",
          name: "managerID",
          message: "Please input the Manager's ID Number.",
        },
        {
          type: "input",
          name: "managerEmail",
          message: "Please input the Manager's Email.",
        },

        {
          type: "input",
          name: "managerOfficeNumber",
          message: "Please input the Manager's office number.",
        },
      ])
      .then((answers) => {
        console.log(answers);
        const manager = new Manager(
          answers.managerName,
          answers.managerID,
          answers.managerEmail,
          answers.managerOfficeNumber
        );
        employeeList.push(manager);
        initialize();
      });
}

function addEngineer() {
    inquirer
      .prompt([
        {
          type: "input",
          name: "engineerName",
          message: "Please input the engineer's name.",
        },
        {
          type: "input",
          name: "engineerID",
          message: "Please input the engineer's ID Number.",
        },
        {
          type: "input",
          name: "engineerEmail",
          message: "Please input the engineer's Email Address.",
        },
        {
          type: "input",
          name: "engineerGithub",
          message: "Please input the engineer's GitHub Username.",
        },
      ])
      .then((answers) => {
        console.log(answers);
        const engineer = new Engineer(
          answers.engineerName,
          answers.engineerID,
          answers.engineerEmail,
          answers.engineerGithub
        );
        employeeList.push(engineer);
        initialize();
      });
}

function addIntern() {
    inquirer
      .prompt([
        {
          type: "input",
          name: "internName",
          message: "Please input the intern's name.",
        },
        {
          type: "input",
          name: "internID",
          message: "Please input the intern's ID Number.",
        },
        {
          type: "input",
          name: "internEmail",
          message: "Please input the intern's Email.",
        },
        {
          type: "input",
          name: "internSchool",
          message: "Please input the intern's school name.",
        },
      ])
      .then((answers) => {
        console.log(answers);
        const intern = new Intern(
          answers.internName,
          answers.internID,
          answers.internEmail,
          answers.internSchool
        );
        employeeList.push(intern);
        initialize();
      });
}

initialize();

function end() {
    console.log("Webpage Completed. Please see the Output Folder.");
    fs.writeFileSync(outputPath, render(employeeList), "utf-8");
}