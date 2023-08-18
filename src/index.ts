import * as fs from 'fs';
import * as path from 'path';
import { getInput, setFailed } from "@actions/core";
import { execSync } from 'child_process';

async function run() {
    const customRules = getInput('custom-rules-folder');
    const bpmnFiles = getInput('bpmn-files-path');
    const bpmnlintrcPath = getInput('bpmnlintrc-path');

    try {
        // Copy custom rules
        const customRulesPath = path.join('/opt/hostedtoolcache/node/16.20.1/x64/lib/node_modules/bpmnlint/rules');
        const customRulesFiles = fs.readdirSync(customRules, 'utf-8');

        for (const file of customRulesFiles) {
            const sourceFilePath = path.join(customRules, file);
            const targetFilePath = path.join(customRulesPath, file);
            fs.copyFileSync(sourceFilePath, targetFilePath);
            console.log(`Copied ${file} to ${customRulesPath}`);
        }

        // List all available rules
        const availableRules = fs.readdirSync(customRulesPath);
        console.log(`Available rules:`, availableRules);

        // Read and create .bpmnlintrc configuration file
        const bpmnlintrcContent = fs.readFileSync(bpmnlintrcPath, 'utf-8');
        const currentDirBpmnlintrcPath = path.join(process.cwd(), '.bpmnlintrc');
        fs.writeFileSync(currentDirBpmnlintrcPath, bpmnlintrcContent);
        console.log(`.bpmnlintrc file created in current directory.`);

        // Run BPMN validation and output result
        const bpmnFilesPath = path.join(process.cwd(), bpmnFiles);
        const bpmnFilesList = fs.readdirSync(bpmnFilesPath, 'utf-8');

        for (const file of bpmnFilesList) {
            if (path.extname(file) === '.bpmn') {
                const filePath = path.join(bpmnFilesPath, file);
                console.log(`Validating ${file}...`);

                try {
                    const lintResult = execSync(`npx bpmnlint lint ${filePath}`, {
                        encoding: 'utf-8',
                        stdio: ['pipe', 'pipe', 'pipe'] // Capturing stdout, stderr, and error stream
                    });

                    console.log(`Linting result for ${file}:`);
                    console.log(lintResult);
                } catch (error) {
                    console.error(`Error linting ${file}:`);
                }
            }
        }
    } catch (error) {
        setFailed((error as Error)?.message ?? "Unknown error");
    }
}

run();
