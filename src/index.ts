import * as fs from 'fs';
import * as path from 'path';
import { getInput, setFailed } from '@actions/core';
import { execSync } from 'child_process';

async function run() {
    const customRules = getInput('custom-rules-folder');
    const bpmnFiles = getInput('bpmn-files-path');
    const bpmnlintrcPath = getInput('bpmnlintrc-path');

    try {
        // CHECK BPMNLINT INSTALLATION
        execSync('npm install -g bpmnlint', { stdio: 'inherit' });

        // Read the contents of the .bpmnlintrc file
        const bpmnlintrcContent = fs.readFileSync(bpmnlintrcPath, 'utf-8');

        // Write the contents to a new .bpmnlintrc file in the current directory
        const currentDirBpmnlintrcPath = path.join(process.cwd(), '.bpmnlintrc');
        fs.writeFileSync(currentDirBpmnlintrcPath, bpmnlintrcContent);

        console.log(`.bpmnlintrc file created in current directory.`);

        // Read the contents of the created .bpmnlintrc file and output it
        const createdBpmnlintrcContent = fs.readFileSync(currentDirBpmnlintrcPath, 'utf-8');
        console.log(`Contents of created .bpmnlintrc:`, createdBpmnlintrcContent);


        // READ BPMN FILES
        // const models = fs.readdirSync(bpmnFiles, 'utf-8')
        //     .filter(file => path.extname(file) === '.bpmn'); // Filter files by extension
        //
        // // Write the contents to a new .bpmnlintrc file in the current directory
        // const currentDirBpmnlintrcPath = path.join(process.cwd(), '.bpmnlintrc');
        // fs.writeFileSync(currentDirBpmnlintrcPath, bpmnlintrcContent);

        // LINT BPMN FILES USING .BPMNLINTRC
        // for (const file of models) {
        //     const filePath = path.join(bpmnFiles, file);
        //
        //     console.log(`Validating ${file}...`);
        //     const lintResult = execSync(`npx bpmnlint lint ${filePath}`, {
        //         encoding: 'utf-8'
        //     });
        //     console.log(`Linting result for ${file}:`, lintResult);
        // }

    } catch (error) {
        setFailed((error as Error)?.message ?? 'Unknown error');
    }
}

run();
