const prompts = {
    generate_full_site: task => `
    
    1. Your response should be a purely JSON output of the form
    {
      html: // html code,
      js: // javascript code,
      css: // css code,
      folderName: // short name which is descriptive of the site created
    }
    2. Give me code only. Beside the JSON, there should be no other text output. 
    3. For contents of the HTML, CSS, JS files, please use single quotes instead of double quotes. 
    4. First generate the HTML file, then make the CSS to match, then finally create the JS. 
    5. Make sure the html file has href='style.css' and <script 
    src='script.js'>. 
    6. Do NOT include any links to images. Your response should NOT have <img> tags
    7. If the site is primarily text-based, make it descriptive and thorough
    8. keep in mind the specific css that might correspond to the task. 
    Your task is: ${task}`,
    generate_html: task => `
    1. you response should be HTML. It should be a valid HTML file with no
    other text. 
    2. text within the HTML should be long-form and descriptive.
    3. Do NOT include any links to images. Your response should NOT have <img> tags
    4. Make sure the html file has href='style.css' in the head, and <script 
    src='script.js'> at the end of the body.
    5. include a descriptive title
    6. include ID's or classes for any DOM elements you might want to style
    7. the HTML should be enough to write JS that accomplishes the task.
    Your task is: ${task}`,
    generate_css: (task, html) => `
    The task is ${task}. The HTML is ${html}. Generate CSS code which matches the HTML.
    1. Your response should be only CSS, valid CSS file with no other text.`,
    generate_js: (task, html) => `
    The task is ${task}. The HTML is ${html}. Generate JS code which accomplishes the functionality
    required by the task, using the given HTML code.`,
    generate_expanded_task: task => `output a clearer and more well-defined version of the task below: ${task}`
}

module.exports = { prompts }
