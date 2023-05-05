const { prompt, query, write_output } = require('./utils');
const { prompts } = require('./prompts');

async function v2(message, folderName) {

    // if (message === undefined) {
    //     message = await prompt('What would you like to create?\n\n')
    // }
    // let message = await prompt('What would you like to create?\n\n');
    let html = await query(prompts['generate_html'](message));

    const pattern = /(?<=<title>)(.*?)(?=<\/title>)/;
    folderName ??= 'v2/' + html.match(pattern)[0];
    
    let css = await query(prompts['generate_css'](message, html));
    let js = await query(prompts['generate_js'](message, html));

    write_output(folderName, html, css, js);

    // process.exit();
}
// todo: get rid of array of functions
// v2();
module.exports = { v2 };