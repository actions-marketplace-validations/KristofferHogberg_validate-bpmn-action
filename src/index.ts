import * as fs from 'fs';
import * as path from 'path';
import { getInput, setFailed } from "@actions/core";
import {execSync} from "child_process";

async function run() {
    const customRules = getInput("custom-rules-folder");
    const bpmnFiles = getInput("bpmn-files-path");
    const bpmnlintrc = getInput("bpmnlintrc-path");

    try {

        console.log("TESTING TESTING");
        const dirContents = fs.readdirSync(bpmnFiles, 'utf-8');

        const result = execSync("npx bpmnlint --version", {
            encoding: "utf-8"
        });
        console.log("bpmnlint version:", result);

        for (const file of dirContents) {
            if (file.endsWith(".bpmn")) {
                const filePath = path.join(bpmnFiles, file);

                try {
                    const result = execSync(`bpmnlint "${filePath}"`, {
                        encoding: "utf-8",
                        stdio: "pipe"
                    });

                    if (result.trim() === "") {
                        console.log(`No errors found in ${file}`);
                    } else {
                        console.log(`Errors found in ${file}:`);
                        console.log(result);
                    }
                } catch (error) {
                    console.log(`Errors found in ${file}:`);
                }
            }
        }
    } catch (error) {
        setFailed((error as Error)?.message ?? "Unknown error");
    }
}

run();