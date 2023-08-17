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

        const bpmnConfig = fs.readdirSync(bpmnlintrc, 'utf-8')
            .filter(file => path.extname(file) === '.bpmnlintrc'); // Filter files by extension

        console.log(`Contents of ${bpmnFiles}:`, bpmnConfig);


    } catch (error) {
        setFailed((error as Error)?.message ?? "Unknown error");
    }
}

run();
