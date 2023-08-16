import {getInput, setFailed} from "@actions/core";
import {context, getOctokit} from "@actions/github";

async function run(){
    const bpmnFiles = getInput("bpmn-files-path");
    const customRules = getInput("custom-rules-folder");
    const bpmnlintrc = getInput("bpmnlintrc-path");
    // const token = getInput("gh-token");


    // const octokitClient = getOctokit(token);

    try {

        console.log(`BPMN files: ${bpmnFiles}`);
        console.log(`Custom rules: ${customRules}`);
        console.log(`bpmnlintrc file: ${bpmnlintrc}`);

    } catch (error) {
        setFailed((error as Error)?.message ?? "Unknown error");
    }


}