export type ChannelType = 'GUILD_TEXT' | 'GUILD_ANNOUNCEMENT' | 'GUILD_CATEGORY';

export interface IChannel{
    name: string,
    type: ChannelType,
    guild: any,
    _id: string
}
