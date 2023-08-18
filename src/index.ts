import * as fs from 'fs';
import * as path from 'path';
import { getInput, setFailed } from "@actions/core";
import {execSync, spawnSync} from 'child_process';
import {readdirSync} from "fs";

async function validateProcessModels() {
    const customRules = getInput('custom-rules-folder');
    const bpmnFiles = getInput('bpmn-files-path');
    const bpmnlintrcPath = getInput('bpmnlintrc-path');

    try {
        // Copy custom rules to bpmnlint installation.
        const customRulesPath = path.join('/opt/hostedtoolcache/node/16.20.1/x64/lib/node_modules/bpmnlint/rules');
        const customRulesFiles = fs.readdirSync(customRules, 'utf-8');

        for (const file of customRulesFiles) {
            const sourceFilePath = path.join(customRules, file);
            const targetFilePath = path.join(customRulesPath, file);
            fs.copyFileSync(sourceFilePath, targetFilePath);
            console.log(`Copied ${file} to ${customRulesPath}`);
        }

        // List all implemented rules.
        const availableRules = fs.readdirSync(customRulesPath);
        console.log(`Available rules:`, availableRules);


        // Create .bpmnlintrc configuration file from input.
        const bpmnlintrcContent = fs.readFileSync(bpmnlintrcPath, 'utf-8');
        const currentDirBpmnlintrcPath = path.join(process.cwd(), '.bpmnlintrc');
        fs.writeFileSync(currentDirBpmnlintrcPath, bpmnlintrcContent);
        console.log(`.bpmnlintrc file created in current directory.`);

        // Run and output validation of .bpmn files from input.
        const bpmnFilesPath = path.join(process.cwd(), getInput('bpmn-files-path'));
        const bpmnFilesList = readdirSync(bpmnFilesPath, 'utf-8');

        for (const file of bpmnFilesList) {
            if (path.extname(file) === '.bpmn') {
                const filePath = path.join(bpmnFilesPath, file);
                console.log(`Validating ${file}...`);

                const lintCommand = 'bpmnlint';
                const lintArgs = [filePath];
                const lintResult = spawnSync(lintCommand, lintArgs, { encoding: 'utf-8' });

                console.log(`Linting result for ${file}:`);
                console.log(lintResult.stdout);
                console.error(lintResult.stderr);
            }
        }

    } catch (error) {
        setFailed((error as Error)?.message ?? "Unknown error");
    }
}

validateProcessModels();
