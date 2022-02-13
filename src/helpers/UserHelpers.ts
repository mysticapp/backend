export const createToken = (l: number): string => {
    let result = 'mystic.';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_.';
    const charactersLength = characters.length;
    for (let i = 0; i < l; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
};

export const createDiscriminator = () => {
    return String(
        Math.floor(
            Math.random() * (9999 - 1111) + 1111
        )
    )
}