import { Router, Request, Response } from "express";
import isLoggedIn from "../middlewares/isLoggedIn";
import User from "../models/User";
const router = Router();

router.get('/@me', isLoggedIn, async(req: Request, res: Response) => {
    const user = await User.findById((req.user as any)._id).populate('guilds');
    res.json((user as any).guilds);
})

export default router;