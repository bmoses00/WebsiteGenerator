// Import the 'fs' module
const fs = require('fs');

// Define the number of folders you want to create
const numberOfFolders = 24;

// Loop through the range of folders to create
for (let i = 1; i <= numberOfFolders; i++) {
  // Define the folder name
  const folderName = `project-${i}`;

  // Create the folder
  fs.mkdir(folderName, { recursive: true }, (err) => {
    if (err) {
      console.error(`Error creating folder: ${folderName}`, err);
    } else {
      console.log(`Folder created: ${folderName}`);
    }
  });
}
