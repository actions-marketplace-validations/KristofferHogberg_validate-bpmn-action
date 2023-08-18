import * as fs from 'fs';
import * as path from 'path';
import { getInput, setFailed } from "@actions/core";
import {execSync, spawnSync} from 'child_process';

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

        // Check bpmnlint version
        try {
            const versionCommand = 'npx bpmnlint --version';
            const versionResult = execSync(versionCommand, { encoding: 'utf-8' });
            console.log(`bpmnlint version: ${versionResult}`);
        } catch (error) {
            console.error(`Error checking bpmnlint version: ${error}`);
        }

        // Rest of the code to validate BPMN files
        const bpmnFilesPath = path.join(process.cwd(), getInput('bpmn-files-path'));
        const bpmnFilesList = fs.readdirSync(bpmnFilesPath, 'utf-8');

        for (const file of bpmnFilesList) {
            if (path.extname(file) === '.bpmn') {
                const filePath = path.join(bpmnFilesPath, file);
                console.log(`Validating ${file}...`);

                try {
                    const lintCommand = `bpmnlint lint ${filePath}`;
                    const lintResult = spawnSync(lintCommand, { shell: true, encoding: 'utf-8' });

                    if (lintResult.error) {
                        console.error(`Error linting ${file}:`);
                        console.error(lintResult.error.message);
                    } else {
                        console.log(`Linting result for ${file}:`);
                        console.log(lintResult.stdout);
                    }
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
