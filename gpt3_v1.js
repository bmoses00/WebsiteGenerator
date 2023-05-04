const { prompt, query, write_output } = require('./utils');
const { prompts } = require('./prompts');

async function v1(message, folder_name) {

    if (message === undefined) {
        message = await prompt('What would you like to create?\n\n')
    }
    // message ??= await prompt('What would you like to create?\n\n');
    // let response = await query(prompts['generate_full_site'](message));
    let response = `
{
    "folderName": "",
    "html": "morbius",
    "css": "",
    "js": ""
}
    `

    let { folderName, html, css, js } = JSON.parse(response);
    folder_name ??= 'v1/' + folderName;

    write_output(folder_name, html, css, js);

    // process.exit();
}
v1();
module.exports = { v1 };

    
