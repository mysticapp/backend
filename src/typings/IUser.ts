export interface IUser{
    _id: string,
    token: string,
    username: string,
    discriminator: string,
    email?: string,
    profile?: object,
    avatar?: string,
    password?: string,
    guilds?: any
}