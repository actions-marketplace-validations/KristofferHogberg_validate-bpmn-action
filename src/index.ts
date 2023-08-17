import * as fs from 'fs';
import * as path from 'path';
import { getInput, setFailed } from "@actions/core";
import { execSync } from "child_process";

async function run() {
    const customRules = getInput("custom-rules-folder");
    const bpmnFiles = getInput("bpmn-files-path");
    const bpmnlintrc = getInput("bpmnlintrc-path");

    try {
        // Copy custom rules
        execSync(`cp -r ${customRules}/* /opt/hostedtoolcache/node/18.17.0/x64/lib/node_modules/bpmnlint/rules/`, {
            stdio: "inherit",
            cwd: process.cwd()
        });

        // List all available rules
        execSync("ls -al /opt/hostedtoolcache/node/18.17.0/x64/lib/node_modules/bpmnlint/rules", {
            stdio: "inherit",
            cwd: process.cwd()
        });

        // Read and create .bpmnlintrc configuration file
        execSync(`cat "${bpmnlintrc}" > .bpmnlintrc.txt && mv .bpmnlintrc.txt .bpmnlintrc`, {
            stdio: "inherit",
            cwd: process.cwd()
        });

        // Run BPMN validation and output result
        for (const file of fs.readdirSync(bpmnFiles, 'utf-8')) {
            const filePath = path.join(bpmnFiles, file);
            if (file.endsWith('.bpmn')) {
                if (!execSync(`bpmnlint "${filePath}"`, { stdio: "inherit", cwd: process.cwd() })) {
                    console.log(`No errors found in ${file}`);
                } else {
                    console.log(`Errors found in ${file}`);
                }
            }
        }
    } catch (error) {
        setFailed((error as Error)?.message ?? "Unknown error");
    }
}

run();
