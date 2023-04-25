const { prompt, query, write_output } = require('./utils');
const { prompts } = require('./prompts');

async function main() {

    let message = await prompt('What would you like to create?\n\n');
    let response = await query(prompts['generate_full_site'](message));

    let { folderName, html, css, js } = JSON.parse(response);
    folderName = 'v1/' + folderName;

    write_output(folderName, html, css, js);

    process.exit();
}
main();

    
