import {model, Schema} from 'mongoose';

const schema = new Schema({
    userId: String,
    guildId: String,
    roles: [
        {type: Schema.Types.ObjectId, ref: 'Role'}
    ],
    nickname: String,
    last_message_id: { type: Schema.Types.ObjectId, ref: 'Message' }
})

export default model('GuildMember', schema);