"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const core_1 = require("@actions/core");
const child_process_1 = require("child_process");
async function run() {
    var _a;
    const customRules = (0, core_1.getInput)('custom-rules-folder');
    const bpmnFiles = (0, core_1.getInput)('bpmn-files-path');
    const bpmnlintrcPath = (0, core_1.getInput)('bpmnlintrc-path');
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
            const versionResult = (0, child_process_1.execSync)(versionCommand, { encoding: 'utf-8' });
            console.log(`bpmnlint version: ${versionResult}`);
        }
        catch (error) {
            console.error(`Error checking bpmnlint version: ${error}`);
        }
        // Read and create .bpmnlintrc configuration file
        const bpmnlintrcContent = fs.readFileSync(bpmnlintrcPath, 'utf-8');
        const currentDirBpmnlintrcPath = path.join(process.cwd(), '.bpmnlintrc');
        fs.writeFileSync(currentDirBpmnlintrcPath, bpmnlintrcContent);
        console.log(`.bpmnlintrc file created in current directory.`);
        console.log(bpmnlintrcContent);
        // Rest of the code to validate BPMN files
        const bpmnFilesPath = path.join(process.cwd(), (0, core_1.getInput)('bpmn-files-path'));
        const bpmnFilesList = fs.readdirSync(bpmnFilesPath, 'utf-8');
        for (const file of bpmnFilesList) {
            if (path.extname(file) === '.bpmn') {
                const filePath = path.join(bpmnFilesPath, file);
                console.log(`Validating ${file}...`);
                try {
                    // Read the contents of the BPMN file
                    const bpmnXmlContent = fs.readFileSync(filePath, 'utf-8');
                    // console.log(`Contents of ${file}:`);
                    // console.log(bpmnXmlContent);
                    // Run bpmnlint command for the file
                    const lintCommand = `bpmnlint ${filePath}`;
                    const lintResult = (0, child_process_1.execSync)(lintCommand, { encoding: 'utf-8' });
                    if (lintResult) {
                        console.log(`Linting result for ${file}:`);
                        console.log(lintResult);
                    }
                }
                catch (error) {
                    console.error(`Error linting ${file}:`);
                }
            }
        }
    }
    catch (error) {
        (0, core_1.setFailed)((_a = error === null || error === void 0 ? void 0 : error.message) !== null && _a !== void 0 ? _a : "Unknown error");
    }
}
run();
