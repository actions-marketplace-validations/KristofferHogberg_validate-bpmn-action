import {getInput, setFailed} from "@actions/core";
import * as fs from 'fs';
import * as path from 'path';



async function run(){

    const customRules = getInput("custom-rules-folder");
    const bpmnFiles = getInput("bpmn-files-path");
    const bpmnlintrc = getInput("bpmnlintrc-path");

    console.log("TEST")

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


