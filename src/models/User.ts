import { model, Schema } from "mongoose";
import { createToken, createDiscriminator } from "../helpers/UserHelpers";

export default model("User", new Schema({
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
    password: String
}));

