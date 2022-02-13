import { model, Schema } from "mongoose";
import { createToken, createDiscriminator } from "../helpers/UserHelpers";

export default model("User", new Schema({
    token: createToken(25),
    username: String,
    discriminator: createDiscriminator(),
    email: String,
    profile: Object,
    avatar: String, 
    password: String
}));

