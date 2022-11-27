import {Schema, model} from 'mongoose';

const schema = new Schema({
    name: String,
    type: {
        type: String,
        enum: ['GUILD_TEXT', 'GUILD_ANNOUNCEMENT', 'GUILD_CATEGORY']
    },
    guild: {
        type: Schema.Types.ObjectId,
        ref: 'Guild'
    },
    description: String,
    privateRoles: [{
        ref: 'Role', //For future usage for private channels.,
        type: Schema.Types.ObjectId
    }]
})

export default model('Channel', schema);