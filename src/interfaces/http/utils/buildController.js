const path = require('path');

module.exports = controller => {
  const controllerLocation = path.join(__dirname, '..', 'controllers', controller);
  const controllerModule = require(controllerLocation);
  return controllerModule();
};