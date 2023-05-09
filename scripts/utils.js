const { Configuration, OpenAIApi } = require('openai');
const fs = require('fs');
const path = require('path');
const readline = require('readline');

// for user input
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const prompt = (query) => new Promise((resolve) => rl.question(query, resolve));

// openAI api configs
const apiKey = 'sk-'; // INSERT KEY HERE
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

        try {
        const res = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [{ role: 'user', content: instruction }],
            temperature: 0,
            stream: true,
        }, { responseType: 'stream' });

        let stop = false;

        res.data.on('data', data => {
            console.log('DATA', data.toString());
            if (stop === true) {
                console.log("Ball Cracker Motherfucker");
                process.exit();
            }
            let messages = data.toString().split('data:');

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
                
                // console.log(message);
                
                let content = message.match(/"content":"(.*?)"}/);
                if (content != null) {
                    complete_message += content[1];

                }
                else {
                    stop = true;
                }
                
                if (num_tokens_received++ % 150 === 0) {
                    console.clear();
                    console.log(`Generating response for instruction '${instruction}':\n\n`);
                    console.log(unescapeString(complete_message).replace(/\\n/g, '\n'));
                }
            }
        });
    }
    catch(e) {
        console.log(e);
    }
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