import { Request, Response, NextFunction } from "express";
import User from "../models/User";

const belongToGuild = async (req: Request, res: Response, next: NextFunction) => {
    if(!req.user) return res.status(403).json({error: 'Forbidden.'});
    const returnedUser = await User.findById((req.user as any)._id);
    if(!(returnedUser as any).guilds.includes(req.params.guildID)) return res.status(403).json({error: 'Forbidden.'});
    else next();
}

export default belongToGuild;