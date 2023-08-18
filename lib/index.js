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
        // CHECK BPMNLINT INSTALLATION
        (0, child_process_1.execSync)('npm install -g bpmnlint', { stdio: 'inherit' });
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
    }
    catch (error) {
        (0, core_1.setFailed)((_a = error === null || error === void 0 ? void 0 : error.message) !== null && _a !== void 0 ? _a : 'Unknown error');
    }
}
run();
