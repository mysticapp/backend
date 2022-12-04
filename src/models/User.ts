import { model, Schema } from "mongoose";
import { createToken, createDiscriminator } from "../helpers/UserHelpers";
import passportLocalMongoose from 'passport-local-mongoose';

const UserSchema =  new Schema({
    token: {
        type: String,
        default: createToken(25)
    },
    username: String,
    discriminator: {
        type: String,
        default: createDiscriminator()
    },
    email: String,
    profile: Object,
    avatar: String, 
    password: String,
    guilds: [{
        type: Schema.Types.ObjectId,
        ref: 'Guild',
        default: []
    }]
})

UserSchema.plugin(passportLocalMongoose, {
    selectFields: '_id, username, token, discriminator, email, profile, avatar, guilds',
    usernameField: 'email'
})

export default model("User", UserSchema);

