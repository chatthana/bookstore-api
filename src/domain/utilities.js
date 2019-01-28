const { compose, complement, pickBy, isNil } = require('ramda');
exports.cleaned = entity => pickBy(compose(complement(isNil)), entity);