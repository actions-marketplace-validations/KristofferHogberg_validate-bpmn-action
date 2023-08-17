import * as fs from 'fs';
import * as path from 'path';
import { getInput, setFailed } from "@actions/core";
import { execSync } from "child_process";

async function run() {
    const customRules = getInput("custom-rules-folder");
    const bpmnFiles = getInput("bpmn-files-path");
    const bpmnlintrc = getInput("bpmnlintrc-path");

    try {
        // Copy or create .bpmnlintrc in the same directory as bpmn files
        const bpmnlintConfigPath = path.join(bpmnFiles, '.bpmnlintrc');
        if (!fs.existsSync(bpmnlintConfigPath)) {
            const bpmnlintConfigContent = {
                extends: "bpmnlint:recommended"
            };
            fs.writeFileSync(bpmnlintConfigPath, JSON.stringify(bpmnlintConfigContent, null, 2));
        }

        console.log(bpmnlintConfigPath);

        const result = execSync("bpmnlint --version", {
            encoding: "utf-8"
        });

        console.log(result);
        //
        // const dirContents = fs.readdirSync(bpmnFiles, 'utf-8');
        // console.log(`Contents of ${bpmnFiles}:`, dirContents);
        //
        // for (const file of dirContents) {
        //     const filePath = path.join(bpmnFiles, file);
        //     const fileContent = fs.readFileSync(filePath, 'utf-8');
        //     console.log(`Content of ${file}:`, fileContent);
        // }

    } catch (error) {
        setFailed((error as Error)?.message ?? "Unknown error");
    }
}

run();
