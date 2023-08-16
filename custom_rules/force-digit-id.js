const { isAny } = require('bpmnlint-utils');

const DIGIT_REGEX = /\d$/; // Regex to match any digit at the end

module.exports = function () {
  function check(node, reporter) {
    if (isAny(node, ['bpmn:FlowNode']) && !DIGIT_REGEX.test(node.id)) {
      reporter.report(node.id, 'Activity id must end with a digit.');
    } else if (node.$type === 'bpmn:SequenceFlow' && !DIGIT_REGEX.test(node.id)) {
      reporter.report(node.id, 'Sequence flows id must end with a digit.');
    }
  }

  return {
    name: 'force-digit-id', 
    check: check,
  };
};
