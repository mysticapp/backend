import { Schema, model } from "mongoose";

const schema = new Schema({
    owner: {
        ref: 'User',
        type: Schema.Types.ObjectId
    },
    features: [{
        type: String
    }],
    channels: [{
        ref: 'Channel',
        type: Schema.Types.ObjectId
    }],
    // roles: [{
    //     ref: 'Role'
    // }]
    name: String,
    icon: String,
    language: String,
    verified: {
        type: Boolean,
        default: false
    },
    partnered: {
        type: Boolean,
        default: false
    }
})

export default model('Guild', schema);