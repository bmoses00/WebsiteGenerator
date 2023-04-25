const { Configuration, OpenAIApi } = require('openai');
const fs = require('fs');
const path = require('path');
const readline = require('readline');

// for user input
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const prompt = (query) => new Promise((resolve) => rl.question(query, resolve));

// openAI api configs
const apiKey = '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';
const configuration = new Configuration({apiKey});
const openai = new OpenAIApi(configuration);

function unescapeString(str) {
    const replacements = {
        '\\\\': '\\',
        '\\n': '\n',
        '\\r': '\r',
        '\\t': '\t',
        '\\"': '\"',
        "\\'": '\'',
    };

  return str.replace(/\\\\|\\n|\\r|\\t|\\"|\\'/g, (match) => replacements[match]);
}

async function query(instruction) {

    return new Promise(async (resolve) => {
        let complete_message = '';
        let num_tokens_received = 0;

        const res = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [{ role: 'user', content: instruction }],
            temperature: 0,
            stream: true,
        }, { responseType: 'stream' });

        res.data.on('data', data => {
            let messages = data.toString().split('data');
            for (let message of messages) {
                if (message === '' || message.includes('"role":"assistant"') || message.includes('"finish_reason":"stop"'))
                    continue;

                if (message.includes('[DONE]')) {
                    console.clear();
                    console.log(`Generating response for instruction '${instruction}':\n\n`);
                    console.log(unescapeString(complete_message).replace(/\\n/g, '\n'));
                    resolve(unescapeString(complete_message));
                    return;
                }

                let content = message.match(/"content":"(.*?)"}/);
                complete_message += content[1];

                if (num_tokens_received++ % 10 === 0) {
                    console.clear();
                    console.log(`Generating response for instruction '${instruction}':\n\n`);
                    console.log(unescapeString(complete_message).replace(/\\n/g, '\n'));
                }
            }
        });
    });
}

function write_output(folderName, html, css, js) {

    console.log('\nwriting into ' + folderName);
    if (fs.existsSync(folderName)) {
        fs.rmdirSync(folderName, {recursive: true})
    }
    fs.mkdirSync(folderName);

    fs.writeFileSync(folderName + '/main.html', html, () => {});
    fs.writeFileSync(folderName + '/style.css', css, () => {});
    fs.writeFileSync(folderName + '/script.js', js, () => {});
}

module.exports = { prompt,  query, write_output };