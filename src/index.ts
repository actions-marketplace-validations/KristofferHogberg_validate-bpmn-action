import * as fs from 'fs';
import * as path from 'path';
import { getInput, setFailed } from "@actions/core";
import { execSync } from 'child_process';

async function run() {
    const customRules = getInput("custom-rules-folder");
    const bpmnFiles = getInput("bpmn-files-path");
    const bpmnlintrc = getInput("bpmnlintrc-path");

    try {

        // CHECK BPMNLINT INSTALATION
        const bpmnlintVersion = execSync("npx bpmnlint --version", {
            encoding: "utf-8"
        });
        console.log("bpmnlint version:", bpmnlintVersion);


        // READ AND PRINT BPMN MODELS
        const models = fs.readdirSync(bpmnFiles, 'utf-8')
            .filter(file => path.extname(file) === '.bpmn'); // Filter files by extension

        console.log(`Contents of ${bpmnFiles}:`, models)

        for (const file of models) {
            const filePath = path.join(bpmnFiles, file);
            const fileContent = fs.readFileSync(filePath, 'utf-8');
            console.log(`Content of ${file}:`, fileContent);
        }

        // READ AND CREATE .BPMNLINTRC
        const bpmnlintConfig = fs.readdirSync(bpmnlintrc, 'utf-8')
            .filter(file => file === '.bpmnlintrc');

        console.log(`Contents of ${bpmnlintrc}:`, bpmnlintConfig);

        let bpmnlintrcContent;
        for (const file of bpmnlintConfig) {
            const filePath = path.join(bpmnlintrc, file);
            bpmnlintrcContent = fs.readFileSync(filePath, 'utf-8');

            const bpmnlintrcFilePath = path.join(bpmnFiles, '.bpmnlintrc'); // Save in bpmnFiles location
            fs.writeFileSync(bpmnlintrcFilePath, bpmnlintrcContent);
            console.log(`.bpmnlintrc file created in ${bpmnFiles} based on ${file}.`);
        }
        console.log(bpmnlintrcContent);



        // LINT BPMN FILES USING .BPMNLINTRC
        for (const file of models) {
            const filePath = path.join(bpmnFiles, file);

            console.log(`Validating ${file}...`);
            const lintResult = execSync(`npx bpmnlint lint ${filePath}`, {
                encoding: "utf-8"
            });
            console.log(`Linting result for ${file}:`, lintResult);
        }


    } catch (error) {
        setFailed((error as Error)?.message ?? "Unknown error");
    }
}

run();
