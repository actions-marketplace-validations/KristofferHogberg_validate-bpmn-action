import * as fs from 'fs';
import * as path from 'path';
import {getInput, setFailed} from "@actions/core";
import {readdirSync} from "fs";
import {spawnSync} from "child_process";
const exec = require('@actions/exec');
const setupNode = require('@actions/setup-node');


async function setupNodeJs() {
    // Set up NodeJs
    const nodeVersion = '16.20.1';
    await setupNode.setupNode(nodeVersion);
}

async function installBpmnlint() {
    await exec.exec('npm', ['install', '-g', 'bpmnlint']);
}

async function copyCustomRules(customRules: string) {

    try {
        const customRulesPath = path.join('/opt/hostedtoolcache/node/16.20.1/x64/lib/node_modules/bpmnlint/rules');
        const customRulesFiles = fs.readdirSync(customRules, 'utf-8');

        for (const file of customRulesFiles) {
            const sourceFilePath = path.join(customRules, file);
            const targetFilePath = path.join(customRulesPath, file);
            fs.copyFileSync(sourceFilePath, targetFilePath);
            console.log(`Copied ${file} to ${customRulesPath}`);
        }

    } catch (error) {
        setFailed((error as Error)?.message ?? "Unknown error");
    }

}

async function listAvailableRules() {

    try {
        const customRulesPath = path.join('/opt/hostedtoolcache/node/16.20.1/x64/lib/node_modules/bpmnlint/rules');
        const availableRules = fs.readdirSync(customRulesPath);
        console.log(`Available rules:`, availableRules);
    } catch (error) {
        setFailed((error as Error)?.message ?? "Unknown error");
    }

}

async function createBpmnlintrc(bpmnlintrcPath: string) {

    try {
        const bpmnlintrcContent = fs.readFileSync(bpmnlintrcPath, 'utf-8');
        const currentDirBpmnlintrcPath = path.join(process.cwd(), '.bpmnlintrc');
        fs.writeFileSync(currentDirBpmnlintrcPath, bpmnlintrcContent);
        console.log(`.bpmnlintrc file created in current directory.`);

    } catch (error) {
        setFailed((error as Error)?.message ?? "Unknown error");
    }

}

async function validateBpmnFiles(bpmnFilesPath: string) {

    try {
        const bpmnFilesList = readdirSync(bpmnFilesPath, 'utf-8');

        const ESCAPE_RESET = "\x1b[0m";
        const ESCAPE_RED = "\x1b[31m";
        const ESCAPE_GREEN = "\x1b[32m";

        for (const file of bpmnFilesList) {
            if (path.extname(file) === '.bpmn') {
                const filePath = path.join(bpmnFilesPath, file);
                console.log(`Validating ${file}...`);

                const lintCommand = 'bpmnlint';
                const lintArgs = [filePath];
                const lintResult = spawnSync(lintCommand, lintArgs, {encoding: 'utf-8'});

                if (lintResult.status === 0) {
                    console.log(`${ESCAPE_GREEN}No errors found in: ${file}:`);
                    console.log(ESCAPE_RESET);
                } else {
                    console.log(`${ESCAPE_RED}Errors found in: ${file}:`);
                    console.log(lintResult.stdout);
                    console.log(ESCAPE_RESET);
                }
            }
        }

    } catch (error) {
        setFailed((error as Error)?.message ?? "Unknown error");
    }

}

async function runBpmnValidationWorkflow() {
    try {
        const customRules = getInput('custom-rules-folder');
        const bpmnFiles = getInput('bpmn-files-path');
        const bpmnlintrcPath = getInput('bpmnlintrc-path');

        // Validate inputs
        if (!customRules) {
            throw new Error("Custom rules folder is required.");
        }
        if (!bpmnFiles) {
            throw new Error("BPMN files path is required.");
        }
        if (!bpmnlintrcPath) {
            throw new Error("BPMNlintrc path is required.");
        }
        await setupNodeJs();
        await installBpmnlint();
        await copyCustomRules(customRules);
        await listAvailableRules();
        await createBpmnlintrc(bpmnlintrcPath);
        await validateBpmnFiles(bpmnFiles);

    } catch (error) {
        setFailed((error as Error)?.message ?? "Unknown error");
    }
}

runBpmnValidationWorkflow()
    .then(() => {
        console.log("Workflow completed successfully.");
    })
    .catch((error) => {
        console.error("Workflow failed:", error);
    });
