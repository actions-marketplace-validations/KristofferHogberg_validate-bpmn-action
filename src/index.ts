import {getInput, setFailed} from "@actions/core";
import * as fs from 'fs';
import * as path from 'path';



async function run(){

    const customRules = getInput("custom-rules-folder");
    const bpmnFiles = getInput("bpmn-files-path");
    const bpmnlintrc = getInput("bpmnlintrc-path");

    try {

        console.log(`BPMN files: ${bpmnFiles}`);
        console.log(`Custom rules: ${customRules}`);
        console.log(`bpmnlintrc file: ${bpmnlintrc}`);


        const directoryPath = customRules;

        // Read the files in the directory
        fs.readdir(directoryPath, (err, files) => {
            if (err) {
                console.error('Error reading directory:', err);
                return;
            }

            // Loop through each file in the directory
            files.forEach(file => {
                const filePath = path.join(directoryPath, file);

                // Read the content of each file
                fs.readFile(filePath, 'utf-8', (readErr, content) => {
                    if (readErr) {
                        console.error(`Error reading file ${file}:`, readErr);
                        return;
                    }

                    console.log(`Content of ${file}:`);
                    console.log(content);
                });
            });
        });

    } catch (error) {
        setFailed((error as Error)?.message ?? "Unknown error");
    }

}


