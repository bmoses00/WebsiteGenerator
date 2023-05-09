// generate-projects.js
const { execSync } = require("child_process");
const path = require("path");
const fs = require("fs");

const numberOfProjects = 25;

for (let i = 1; i <= numberOfProjects; i++) {
  const projectName = `project-${i}`;
  const projectPath = path.join(__dirname, projectName);

  if (!fs.existsSync(projectPath)) {
    fs.mkdirSync(projectPath);
    console.log(`Creating ${projectName}...`);

    // Initialize the project with package.json
    execSync(`npm init -y`, { cwd: projectPath });

    // Add React and ReactDOM
    execSync(`npm install react react-dom`, { cwd: projectPath });

    // Create the project using Create React App
    execSync(`npx create-react-app ${projectName}`, { cwd: projectPath });

    // Move the generated project files to the workspace folder

    console.log(`${projectName} created.`);
  } else {
    console.log(`${projectName} already exists.`);
  }
  const srcPath = path.join(projectPath, projectName, 'src');
  const stylesPath = path.join(srcPath, 'styles');
  const componentsPath = path.join(srcPath, 'components');

  if (!fs.existsSync(stylesPath)) {
    fs.mkdirSync(stylesPath, { recursive: true });
  }

  if (!fs.existsSync(componentsPath)) {
    fs.mkdirSync(componentsPath, { recursive: true });
  }
}
