"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@actions/core");
async function run() {
    var _a;
    const bpmnFiles = (0, core_1.getInput)("bpmn-files-path");
    const customRules = (0, core_1.getInput)("custom-rules-folder");
    const bpmnlintrc = (0, core_1.getInput)("bpmnlintrc-path");
    // const token = getInput("gh-token");
    // const octokitClient = getOctokit(token);
    try {
        console.log(`BPMN files: ${bpmnFiles}`);
        console.log(`Custom rules: ${customRules}`);
        console.log(`bpmnlintrc file: ${bpmnlintrc}`);
    }
    catch (error) {
        (0, core_1.setFailed)((_a = error === null || error === void 0 ? void 0 : error.message) !== null && _a !== void 0 ? _a : "Unknown error");
    }
}
