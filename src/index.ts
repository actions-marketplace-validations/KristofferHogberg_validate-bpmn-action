import * as fs from 'fs';
import * as path from 'path';
import { getInput, setFailed } from "@actions/core";
import { execSync } from 'child_process';

async function run() {
    const customRules = getInput("custom-rules-folder");
    const bpmnFiles = getInput("bpmn-files-path");
    const bpmnlintrc = getInput("bpmnlintrc-path");

    try {

        // CHECK BPMNLINT INSTALLATION
        const bpmnlintVersion = execSync("npx bpmnlint --version", {
            encoding: "utf-8"
        });
        console.log("bpmnlint version:", bpmnlintVersion);

        const bpmnlintInstallationPath = path.dirname(require.resolve('bpmnlint'));

        console.log("bpmnlint path:", bpmnlintInstallationPath);

        // READ AND CREATE .BPMNLINTRC
        const bpmnlintConfigPath = path.join(bpmnlintrc, '.bpmnlintrc');
        const bpmnlintrcContent = fs.readFileSync(bpmnlintConfigPath, 'utf-8');

        console.log(`BPMNLINT CONTENT ${bpmnlintConfigPath}:`, bpmnlintrcContent);


        // Write bpmnlintrc content to each BPMN file folder
        // for (const file of bpmnlintConfig) {
        //     const folderPath = path.dirname(path.join(bpmnFiles, file));
        //     const bpmnlintrcFilePath = path.join(folderPath, '.bpmnlintrc');
        //     fs.writeFileSync(bpmnlintrcFilePath, bpmnlintrcContent);
        //     console.log(folderPath)
        //
        //     console.log(`.bpmnlintrc file created in ${folderPath}.`);
        // }


        // READ AND PRINT BPMN MODELS
        // const models = fs.readdirSync(bpmnFiles, 'utf-8')
        //     .filter(file => path.extname(file) === '.bpmn'); // Filter files by extension
        //
        // console.log(`Contents of ${bpmnFiles}:`, models)
        //
        // for (const file of models) {
        //     const filePath = path.join(bpmnFiles, file);
        //     const fileContent = fs.readFileSync(filePath, 'utf-8');
        //     console.log(`Content of ${file}:`, fileContent);
        // }


        // LINT BPMN FILES USING .BPMNLINTRC
        // for (const file of models) {
        //     const filePath = path.join(bpmnFiles, file);
        //
        //     console.log(`Validating ${file}...`);
        //     const lintResult = execSync(`npx bpmnlint lint ${filePath}`, {
        //         encoding: "utf-8"
        //     });
        //     console.log(`Linting result for ${file}:`, lintResult);
        // }


    } catch (error) {
        setFailed((error as Error)?.message ?? "Unknown error");
    }
}

run();
