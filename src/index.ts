import * as fs from 'fs';
import * as path from 'path';
import { getInput, setFailed } from '@actions/core';
import { execSync } from 'child_process';

async function run() {
    const customRules = getInput('custom-rules-folder');
    const bpmnFiles = getInput('bpmn-files-path');
    const bpmnlintrcPath = getInput('bpmnlintrc-path');

    try {
            console.log(customRules)
            console.log(bpmnFiles)
            console.log(bpmnlintrcPath)

    } catch (error) {
        setFailed((error as Error)?.message ?? 'Unknown error');
    }
}

run();
