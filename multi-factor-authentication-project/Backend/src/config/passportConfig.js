import bcrypt from "bcryptjs";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import User from "../models/user.js";

passport.use(
  new LocalStrategy(async (username, password, done) => {
    // if we want to validate user through name by email then
    // we need to use this function strategy
    /*function({username : "email"},email, password, done) { */
    try {
      const user = await User.findOne({ username: username });
      // if user not found then we need to do this
      if (!user) {
        return done(null, false, { message: "User not found" });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) return done(null, user);
      else return done(null, false, { message: "Invalid password" });
    } catch (error) {
      return done(error);
    }
  })
);

passport.serializeUser((user, done) => {
  console.log("we are inside serializeUser");
  done(null, user._id);
});

passport.deserializeUser(async (_id, done) => {
  try {
    console.log("we are inside deserializeUser");
    const user = await User.findById(_id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});
