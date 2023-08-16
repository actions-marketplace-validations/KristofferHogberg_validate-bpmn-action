import * as fs from 'fs';
import * as path from 'path';
import {getInput, setFailed} from "@actions/core";


async function run(){

    const customRules = getInput("custom-rules-folder");
    const bpmnFiles = getInput("bpmn-files-path");
    const bpmnlintrc = getInput("bpmnlintrc-path");

    const fs = require('fs');
    const content = fs.readdirSync(bpmnFiles, 'utf-8');
    console.log(content);

    try {

        console.log(`BPMN files: ${bpmnFiles}`);
        console.log(`Custom rules: ${customRules}`);
        console.log(`bpmnlintrc file: ${bpmnlintrc}`);


        const dirContents = fs.readdirSync(__dirname);
        console.log(dirContents);

    } catch (error) {
        setFailed((error as Error)?.message ?? "Unknown error");
    }

}


