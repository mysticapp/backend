import { Router, Request, Response, request } from "express";
const router = Router();

router.get('/login', (req: Request, res: Response) => {
    res.json({})
})

export default router;