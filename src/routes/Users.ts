import { Router, Request, Response } from "express";
import isLoggedIn from "../middlewares/isLoggedIn";
const router = Router();

router.get('/@me', isLoggedIn, (req: Request, res: Response) => {
    return res.json(req.user);
})

export default router;