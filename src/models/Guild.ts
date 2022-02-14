import { Schema, model } from "mongoose";

const schema = new Schema({
    owner: {
        ref: 'User'
    },
    features: [{
        type: 'string'
    }],
    channels: [{
        ref: 'Channel'
    }],
    // roles: [{
    //     ref: 'Role'
    // }]
    name: String,
    icon: String,
    language: String
})

export default model('Guild', schema);