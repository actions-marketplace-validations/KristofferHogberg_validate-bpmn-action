import * as fs from 'fs';
import { getInput, setFailed } from "@actions/core";
import { execSync } from "child_process";

async function run() {
    const bpmnFilesPath = getInput("bpmn-files-path");

    try {
        const files = fs.readdirSync(bpmnFilesPath, "utf-8");

        for (const file of files) {
            if (file.endsWith(".bpmn")) {
                const filePath = `${bpmnFilesPath}/${file}`;

                try {
                    // Run bpmnlint on the BPMN file
                    const result = execSync(`npx bpmnlint "${filePath}"`, {
                        encoding: "utf-8"
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
    }
}

run();
