// Import the functions from the different files
const { v1 } = require('./gpt3_v1');
const { v2 } = require('./gpt3_v2');
const { v3 } = require('./gpt3_v3');

// The array of entries
const prompts = [
    "info page on mayonaise",
    "interactive info page on mayonaise",
    "daily inspirational quote app",
    "fake call app",
    "timer app",
    "baby name generator",
    "a tic tac toe game",
    "20 questions game that tries to guess the user's word", 
    "a todo list app",
    "calendar app",
    "simple runner game using blocks as sprites",
    "guess the code game",
    "simple pocket calculator",
    "drawing app",
    "scientific calculator",
    "syllogism puzzle game",
    "parameterized julia set visualizer",
    "L-System visualizer",
    "text editor",
    "sudoku app",
    "rhyme scheme highlighter on user given text",
    "recipe generator based on given ingredients",
    "classic snake game",
    "soft body ball simulation",
    "uno game"
];
const tests_per_prompt = 1;

// Function to call the appropriate async function based on the project number and version
async function processProject(prompt, project_number, version) {
    const folder_name = `project-${project_number}`;

    if (version === 1) {
        await v1(prompt, `../v1/${folder_name}`);
    } else if (version === 2) {
        await v2(prompt, `../v2/${folder_name}`);
    } else {
        await v3(prompt, `../v3/${folder_name}/${folder_name}`);
    }
}

// Function to call your async functions 24 times for each entry
async function processProjects() {
    const promises = [];

    for (let version = 1; version <= 2; version++) {
      let project_number = 1;

      for (const prompt of prompts) {
          for (let i = 0; i < tests_per_prompt; i++) {
              promises.push(processProject(prompt, project_number, version));
              project_number++;
          }
      }
    }

    await Promise.all(promises);
}

// Call the processProjects function
processProjects().then(() => {
    console.log('All projects processed!');
}).catch((error) => {
    console.error('Error processing projects:', error);
});
