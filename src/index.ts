import * as fs from 'fs';
import * as path from 'path';
import { getInput, setFailed } from "@actions/core";
import { execSync } from 'child_process';

async function run() {
    const customRules = getInput("custom-rules-folder");
    const bpmnFiles = getInput("bpmn-files-path");
    const bpmnlintrc = getInput("bpmnlintrc-path");

    try {

        const models = fs.readdirSync(bpmnFiles, 'utf-8')
            .filter(file => path.extname(file) === '.bpmn'); // Filter files by extension

        console.log(`Contents of ${bpmnFiles}:`, models)

        for (const file of models) {
            const filePath = path.join(bpmnFiles, file);
            const fileContent = fs.readFileSync(filePath, 'utf-8');
            console.log(`Content of ${file}:`, fileContent);
        }


        const bpmnlintConfig = fs.readdirSync(bpmnlintrc, 'utf-8')
            .filter(file => file === '.bpmnlintrc');

        console.log(`Contents of ${bpmnFiles}:`, bpmnlintConfig);


        for (const file of bpmnlintConfig) {
            const filePath = path.join(bpmnlintrc, file);
            const fileContent = fs.readFileSync(filePath, 'utf-8');
            console.log(`Content of ${file}:`, fileContent);
        }

    } catch (error) {
        setFailed((error as Error)?.message ?? "Unknown error");
    }
}

run();
