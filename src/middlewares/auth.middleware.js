//? Middleware in order to protect routes

const { jwtSecret } = require("../config");
const { getUserById } = require("../users/users.controllers");

//* 1- Check if there is a token
//* 2- Validate wether such token belong a valid user
//* 3- Modify the req and add req.user with the information decrypted from the token

const JwtStrategy = require("passport-jwt").Strategy; //? Strategies for the diferent authentications
const ExtractJWT = require("passport-jwt").ExtractJwt; //? Get the headers from the petition

module.exports = (passport) => {
  const options = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderWithScheme(" jwt"),
    secretOrKey: jwtSecret,
  };

  passport.use(
    new JwtStrategy(options, async (decoded, done) => {
      //? done(error, decoded)
      try {
        const response = await getUserById(decoded.id);
        if (!response) {
          return done(null, false);
        }
        console.log("decoded JWT", decoded);
        return done(null, decoded);
      } catch (error) {
        return done(error, false);
      }
    })
  );
};
