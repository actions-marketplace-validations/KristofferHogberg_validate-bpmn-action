import { getInput } from "@actions/core";
import * as fs from "fs";
import * as path from "path";
import { execSync } from "child_process";

function run() {
    const bpmnFilesPath = getInput("bpmn-files-path");

    try {
        const files = fs.readdirSync(bpmnFilesPath, "utf-8");

        for (const file of files) {
            if (file.endsWith(".bpmn")) {
                const filePath = path.join(bpmnFilesPath, file);

                try {
                    const result = execSync(`bpmnlint "${filePath}"`, {
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
