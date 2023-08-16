import {getInput, setFailed} from "@actions/core";

async function run(){
    const customRules = getInput("custom-rules-folder");
    const bpmnFiles = getInput("bpmn-files-path");
    const bpmnlintrc = getInput("bpmnlintrc-path");

    try {

        console.log(`BPMN files: ${bpmnFiles}`);
        console.log(`Custom rules: ${customRules}`);
        console.log(`bpmnlintrc file: ${bpmnlintrc}`);

    } catch (error) {
        setFailed((error as Error)?.message ?? "Unknown error");
    }


}