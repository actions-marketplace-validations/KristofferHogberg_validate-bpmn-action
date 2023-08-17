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
        // Copy custom rules
        (0, child_process_1.execSync)(`cp -r ${customRules}/* /opt/hostedtoolcache/node/18.17.0/x64/lib/node_modules/bpmnlint/rules/`, {
            stdio: "inherit",
            cwd: process.cwd()
        });
        // List all available rules
        (0, child_process_1.execSync)("ls -al /opt/hostedtoolcache/node/18.17.0/x64/lib/node_modules/bpmnlint/rules", {
            stdio: "inherit",
            cwd: process.cwd()
        });
        // Read and create .bpmnlintrc configuration file
        (0, child_process_1.execSync)(`cat "${bpmnlintrc}" > .bpmnlintrc.txt && mv .bpmnlintrc.txt .bpmnlintrc`, {
            stdio: "inherit",
            cwd: process.cwd()
        });
        // Run BPMN validation and output result
        for (const file of fs.readdirSync(bpmnFiles, 'utf-8')) {
            const filePath = path.join(bpmnFiles, file);
            if (file.endsWith('.bpmn')) {
                if (!(0, child_process_1.execSync)(`bpmnlint "${filePath}"`, { stdio: "inherit", cwd: process.cwd() })) {
                    console.log(`No errors found in ${file}`);
                }
                else {
                    console.log(`Errors found in ${file}`);
                }
            }
        }
    }
    catch (error) {
        (0, core_1.setFailed)((_a = error === null || error === void 0 ? void 0 : error.message) !== null && _a !== void 0 ? _a : "Unknown error");
    }
}
run();
