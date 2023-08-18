import * as fs from 'fs';
import * as path from 'path';
import { getInput, setFailed } from '@actions/core';
import { execSync } from 'child_process';

async function run() {
    const customRules = getInput('custom-rules-folder');
    const bpmnFiles = getInput('bpmn-files-path');
    const bpmnlintrc = getInput('bpmnlintrc-path');

    try {
        // CHECK BPMNLINT INSTALLATION
        execSync('npm install -g bpmnlint', { stdio: 'inherit' });

        // READ AND CREATE .BPMNLINTRC
        const bpmnlintConfigPath = path.join(bpmnlintrc, '.bpmnlintrc');
        const bpmnlintrcContent = fs.readFileSync(bpmnlintConfigPath, 'utf-8');

        // READ BPMN FILES
        const models = fs.readdirSync(bpmnFiles, 'utf-8')
            .filter(file => path.extname(file) === '.bpmn'); // Filter files by extension

        // Write bpmnlintrc content to each BPMN file folder
        for (const file of models) {
            const folderPath = path.dirname(path.join(bpmnFiles, file));
            const bpmnlintrcFilePath = path.join(folderPath, '.bpmnlintrc');
            fs.writeFileSync(bpmnlintrcFilePath, bpmnlintrcContent);
            console.log(`.bpmnlintrc file created in ${folderPath}.`);
        }

        // LINT BPMN FILES USING .BPMNLINTRC
        for (const file of models) {
            const filePath = path.join(bpmnFiles, file);

            console.log(`Validating ${file}...`);
            const lintResult = execSync(`npx bpmnlint lint ${filePath}`, {
                encoding: 'utf-8'
            });
            console.log(`Linting result for ${file}:`, lintResult);
        }

    } catch (error) {
        setFailed((error as Error)?.message ?? 'Unknown error');
    }
}

run();
