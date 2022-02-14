import passport from "passport";
import { Strategy} from "passport-local";
import User from "../models/User";

try {
    passport.use((User as any).createStrategy());
    passport.serializeUser((user: any, done) => {
      done(null, user._id);
    })

    passport.deserializeUser(function(id, done){
      User.findById(id, (err: Error, user: any) => {
        done(err, user)
      })
    })
} catch (error) {
  console.log(error);
}

export default passport;
