import { Router, Request, Response } from "express";
import { oneOf } from "../helpers/PermissionsHelper";
import belongToGuild from "../middlewares/belongToGuild";
import isLoggedIn from "../middlewares/isLoggedIn";
const router = Router();
//TODO
router.post('/', isLoggedIn, belongToGuild, (req: Request, res: Response) => {
    
})

export default router;