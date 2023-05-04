const { prompt, query, write_output } = require('./utils');
const { prompts } = require('./prompts');
const fs = require('fs');
const path = require('path');

// idea: ask it to generate reasoning 
// ask it to plan more, especially with CSS
// pass the parents' CSS to children

async function main(folder_name = 'chat-create-react-app') {

    let message = await prompt('What would you like to create?\n\n');
    let expanded_task = await query(prompts['generate_expanded_task'](message));

    let hierarchy = await query(prompts['generate_component_hierarchy'](expanded_task));
    let JSON_hierarchy = JSON.parse(hierarchy);

    const componentsDir = `../${folder_name}/src/components`;
    const stylesDir = `../${folder_name}/src/styles`;

    fs.readdir(componentsDir, (_, files) => {
        files.forEach(file => {
            fs.unlink(path.join(componentsDir, file), () => {});
        });
    });

    fs.readdir(stylesDir, (_, files) => {
        files.forEach(file => {
            fs.unlink(path.join(stylesDir, file), () => {});
        });
    });

    let root = Object.keys(JSON_hierarchy)[0];
    await create_component(expanded_task, root, JSON_hierarchy, "this is the root", folder_name);

    // process.exit();
}

function write_root(component_name) {
    app_implementation = `
import ${component_name} from './components/${component_name}'

function App() {
    return (
        <${component_name} />
    );
}

export default App;
`

    fs.writeFileSync(`../${folder_name}/src/App.js`, app_implementation, () => {});    
}

async function create_component(expanded_task, component_name, JSON_hierarchy, previous_component_implementation, folder_name) {

    if (previous_component_implementation === "this is the root") {
        write_root(component_name, folder_name);
    }

    let children = JSON_hierarchy[component_name]['childComponents'];
    let component_description = component_name + " " + (JSON.stringify(JSON_hierarchy[component_name]));

    let component_implementation = await query(prompts['generate_implementation'](expanded_task, component_description, JSON.stringify(JSON_hierarchy), previous_component_implementation));
    fs.writeFileSync(`../${folder_name}/src/components/${component_name}.js`, component_implementation, () => {});
    
    for (let child of children) {
        create_component(expanded_task, child, JSON_hierarchy, component_implementation);
    }

    let component_style = await query(prompts['generate_style'](expanded_task, JSON_hierarchy, component_implementation));
    fs.writeFileSync(`../${folder_name}/src/styles/${component_name}.css`, component_style, () => {});
}
// todo: get rid of array of functions
main();