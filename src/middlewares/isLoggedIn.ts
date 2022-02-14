import { Request, Response, NextFunction } from "express"

const isLoggedIn = (req: Request, res: Response, next: NextFunction) => {

    if(req.isAuthenticated()) return next();
    else res.status(403).json({error: 'Forbidden.'})

}

export default isLoggedIn;