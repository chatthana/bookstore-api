const crypto = require('crypto');

const generateSalt = length =>
  crypto.randomBytes(Math.ceil(length / 2))
  .toString('hex')
  .slice(0, length);

const test = plainPassword => {
  const salt = generateSalt(128);
  const hash = crypto.createHmac('sha512', salt);
  hash.update(plainPassword);
  return { hashed: hash.digest('hex'), salt };
}

console.log(test('secret'));
