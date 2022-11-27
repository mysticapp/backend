import {model, Schema} from 'mongoose';

const schema = new Schema({
    memberId: {
        type: Schema.Types.ObjectId,
        ref: 'GuildMember'
    },
    content: String,
    embeds: Array<Object>,
    pinned: Boolean,
    created_at: {
        type: Date,
        default: Date.now()
    }
})

export default model('Message', schema);