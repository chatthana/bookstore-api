const { compose, curry } = require('ramda');

const mod = name => name + ' modded';

const repo = modded => modded + ' finalised';

const repos = curry((transfer, mod) => {
  return transfer(mod);
});

const result = compose(repo, mod)('user');
console.log(result);