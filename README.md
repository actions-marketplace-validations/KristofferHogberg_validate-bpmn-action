# BPMN Validation Workflow

This GitHub Action workflow is designed to streamline the validation process for BPMN files using the bpmn linter provided by [bpmn-io](https://github.com/bpmn-io). It enables you to validate your BPMN files and incorporate user-defined rules.

## Usage

To use this workflow, follow these steps:

1. **Create a Workflow YAML File**

   Create a `.github/workflows` directory in your repository (if not already present). Inside this directory, create a file named `bpmn-validation.yml`.

2. **Add the Workflow Configuration**

   Open the `bpmn-validation.yml` file and paste the following code:

   ```yaml
   name: Call BPMN-validate workflow

   on:
     push:
       branches:
         - main

   jobs:
     call-workflow-passing-data:
       permissions:
         contents: read
         pull-requests: write
       uses: KristofferHogberg/validate-bpmn-action/.github/workflows/validate-bpmn.yml@main
       with:
         bpmn-file-path: 'BPMN/demo-process.bpmn'
         custom-rules-folder: 'custom_rules/'
         bpmnlintrc-path: 'BPMN/.bpmnlintrc'
