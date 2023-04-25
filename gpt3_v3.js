const { prompt, query, write_output } = require('./utils');
const { prompts } = require('./prompts');

async function main() {

    // let message = await prompt('What would you like to create?\n\n');
    // let expanded_task = await query(prompts['generate_expanded_task'](message));

    // let html = await query(prompts['generate_html'](expanded_task));

    // const pattern = /(?<=<title>)(.*?)(?=<\/title>)/;
    // const folderName = 'v2/' + html.match(pattern)[0];
    
    // let css = await query(prompts['generate_css'](message, html));
    // let js = await query(prompts['generate_js'](message, html));

    // write_output(folderName, html, css, js);

    process.exit();
}
// todo: get rid of array of functions
main();