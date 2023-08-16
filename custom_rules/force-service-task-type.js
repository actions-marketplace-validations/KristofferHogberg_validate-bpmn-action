const { isAny } = require('bpmnlint-utils');

module.exports = function () {
  function check(node, reporter) {
    //TODO Report on bpmn:serviceTask id instead of zeebe:taskDefinition.
    if (node.$type === 'zeebe:taskDefinition') {
      // Check if the 'type' attribute exists within the 'zeebe:taskDefinition' element
      const hasTypeAttribute = Object.keys(node).some(
        (attr) => attr.startsWith('type') && node[attr] !== undefined
      );

      if (!hasTypeAttribute) {
        reporter.report(node.$type, 'Service task type must be defined');
      }
    }
  }

  return {
    name: 'force-service-task-type',
    check: check,
  };
};
