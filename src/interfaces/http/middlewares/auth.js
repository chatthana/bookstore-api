const passport = require('passport');
const { Strategy, ExtractJwt } = require('passport-jwt');
const { compose } = require('ramda');

const userRepository = require('../../../infrastructure/repositories/user');

module.exports = ({ config, db }) => {

  const authParams = {
    secretOrKey: Buffer.from(config.authentication.jwt.publicKey, 'base64').toString('ascii'),
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
  };

  const strategy = new Strategy(authParams, (payload, done) => {
    const useCase = compose(userRepository)(db.models.User);
    useCase.getOne({ guid: payload.guid })
    .then(user => {
      done(null, user);
    }).catch(error => {
      done(error, null);
    });
  });

  passport.use(strategy);

  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((user, done) => {
    done(null, user);
  });

  return {
    initialise: () => {
      return passport.initialize();
    },
    authenticate: () => {
      return passport.authenticate('jwt');
    }
  }
}