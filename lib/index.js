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
    const customRules = (0, core_1.getInput)("custom-rules-folder");
    const bpmnFiles = (0, core_1.getInput)("bpmn-files-path");
    const bpmnlintrc = (0, core_1.getInput)("bpmnlintrc-path");
    try {
        // console.log(`BPMN files: ${bpmnFiles}`);
        // console.log(`Custom rules: ${customRules}`);
        // console.log(`bpmnlintrc file: ${bpmnlintrc}`);
        // Check bpmnlint version
        const bpmnlintVersion = (0, child_process_1.execSync)("npx bpmnlint --version", {
            encoding: "utf-8"
        });
        console.log("bpmnlint version:", bpmnlintVersion);
        const dirContents = fs.readdirSync(bpmnFiles, 'utf-8');
        console.log(`Contents of ${bpmnFiles}:`, dirContents);
        for (const file of dirContents) {
            const filePath = path.join(bpmnFiles, file);
            const fileContent = fs.readFileSync(filePath, 'utf-8');
            // Run bpmnlint for each file
            const lintResult = (0, child_process_1.execSync)(`npx bpmnlint lint ${filePath} --config ${bpmnlintrc} --rulesdir ${customRules}`, {
                encoding: "utf-8"
            });
            console.log(`Linting result for ${file}:`, lintResult);
        }
    }
    catch (error) {
        (0, core_1.setFailed)((_a = error === null || error === void 0 ? void 0 : error.message) !== null && _a !== void 0 ? _a : "Unknown error");
    }
}
run();
