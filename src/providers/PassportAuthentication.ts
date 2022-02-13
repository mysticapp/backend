import { Error } from "mongoose";
import passport from "passport";
import { Strategy } from "passport-local";
import User from '../models/User';
import bcrypt from 'bcrypt';

passport.serializeUser((user: any, done) => {
    done(null, user._id);
})

passport.deserializeUser((id, done) => {
    User.findById(id, (err: Error, user: object) => {
        done(err, user);
    })
})

passport.use(new Strategy(async(email, password, done) => {
    try{
        const userDatabase = await User.findOne({email: email}, {versionKey: false});
        const isValidPassword = await bcrypt.compareSync(password, userDatabase.password);
        isValidPassword ? done(null, userDatabase) : done(null, false, {message: 'Invalid password'});
    }catch(e){
        return done(e)
    }
}))

export default passport;