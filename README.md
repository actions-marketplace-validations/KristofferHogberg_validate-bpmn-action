# BPMN Validation Workflow

This GitHub Action workflow is designed to streamline the validation process for BPMN files using the bpmn linter provided by [bpmn-io](https://github.com/bpmn-io). It enables you to validate your BPMN files and incorporate user-defined rules.

## Usage

To use this workflow, follow these steps:

1. **Create a Workflow YAML File**

   Create a `.github/workflows` directory in your repository (if not already present). Inside this directory, create a file named `bpmn-validation.yml`.

2. **Add the Workflow Configuration**

   Open the `bpmn-validation.yml` file and paste the following code:

   ```yaml
   name: Use Camunda BPMN-validate workflow action

   on:
      workflow_dispatch:
   
   jobs:
   call_bpmn_validate_workflow:
   runs-on: ubuntu-latest

    steps:
      - name: Checkout repository
        uses: actions/checkout@v3

      # Set up NodeJs (this action is only compatible with nodejs 16.20.1 at this moment)
      - name: Set up NodeJs
        uses: actions/setup-node@v3
        with:
          node-version: 16.20.1

      # Install bpmnlint
      - name: Install bpmnlint
        run: npm install -g bpmnlint

      - name: Validate BPMN process models
        uses: KristofferHogberg/validate-bpmn-action@v.1.0.0
        with:
          bpmn-files-path: 'BPMN'  # Adjust paths accordingly
          custom-rules-folder: 'custom_rules'
          bpmnlintrc-path: 'BPMN/.bpmnlintrc'
