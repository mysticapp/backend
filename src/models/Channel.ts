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
    }
    /* privateRoles: [{
        ref: 'Role' //For future usage for private channels. 
    }] */
})

export default model('Channel', schema);