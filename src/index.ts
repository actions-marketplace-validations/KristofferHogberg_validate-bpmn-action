import * as fs from 'fs';
import * as path from 'path';
import { getInput, setFailed } from "@actions/core";
import { execSync } from 'child_process';

async function run() {
    const customRules = getInput("custom-rules-folder");
    const bpmnFiles = getInput("bpmn-files-path");
    const bpmnlintrc = getInput("bpmnlintrc-path");

    try {
        // console.log(`BPMN files: ${bpmnFiles}`);
        // console.log(`Custom rules: ${customRules}`);
        // console.log(`bpmnlintrc file: ${bpmnlintrc}`);

        // Check bpmnlint version
        const bpmnlintVersion = execSync("npx bpmnlint --version", {
            encoding: "utf-8"
        });
        console.log("bpmnlint version:", bpmnlintVersion);

        const dirContents = fs.readdirSync(bpmnFiles, 'utf-8');
        console.log(`Contents of ${bpmnFiles}:`, dirContents);

        for (const file of dirContents) {
            const filePath = path.join(bpmnFiles, file);
            const fileContent = fs.readFileSync(filePath, 'utf-8');

            // Run bpmnlint for each file
            const lintResult = execSync(`npx bpmnlint lint ${filePath} --config ${bpmnlintrc} --rulesdir ${customRules}`, {
                encoding: "utf-8"
            });
            console.log(`Linting result for ${file}:`, lintResult);

        }

    } catch (error) {
        setFailed((error as Error)?.message ?? "Unknown error");
    }
}

run();
