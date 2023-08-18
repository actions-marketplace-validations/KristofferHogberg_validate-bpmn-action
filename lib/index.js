"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@actions/core");
async function run() {
    var _a;
    const customRules = (0, core_1.getInput)('custom-rules-folder');
    const bpmnFiles = (0, core_1.getInput)('bpmn-files-path');
    const bpmnlintrcPath = (0, core_1.getInput)('bpmnlintrc-path');
    try {
        console.log(customRules);
        console.log(bpmnFiles);
        console.log(bpmnlintrcPath);
    }
    catch (error) {
        (0, core_1.setFailed)((_a = error === null || error === void 0 ? void 0 : error.message) !== null && _a !== void 0 ? _a : 'Unknown error');
    }
}
run();
