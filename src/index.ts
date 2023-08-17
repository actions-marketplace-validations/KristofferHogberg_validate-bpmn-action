import * as fs from 'fs';
import * as path from 'path';
import { getInput, setFailed } from "@actions/core";
import { execSync } from "child_process";

async function run() {
    const customRules = getInput("custom-rules-folder");
    const bpmnFiles = getInput("bpmn-files-path");
    const bpmnlintrcPath = getInput("bpmnlintrc-path"); // Update this line

    try {
        const dirContents = fs.readdirSync(bpmnFiles, 'utf-8');
        const bpmnlintrc = fs.readFileSync(bpmnlintrcPath, 'utf-8');

        console.log(bpmnlintrc);

        const result = execSync("npx bpmnlint --version", {
            encoding: "utf-8"
        });

        console.log(result);



        // for (const file of dirContents) {
        //     if (file.endsWith(".bpmn")) {
        //         const filePath = path.join(bpmnFiles, file);
        //
        //         try {
        //             const result = execSync(`bpmnlint "${filePath}" --config "${bpmnlintrcPath}"`, {
        //                 encoding: "utf-8"
        //             });
        //
        //             if (result.trim() === "") {
        //                 console.log(`No errors found in ${file}`);
        //             } else {
        //                 console.log(`Errors found in ${file}:`);
        //                 console.log(result);
        //             }
        //         } catch (error) {
        //             console.log(`Errors found in ${file}:`);
        //         }
        //     }
        // }
    } catch (error) {
        setFailed((error as Error)?.message ?? "Unknown error");
    }
}

run();
