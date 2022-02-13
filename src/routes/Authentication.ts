import { Router, Request, Response, request } from "express";
import PassportAuthentication from '../providers/PassportAuthentication';
const router = Router();

router.post('/', PassportAuthentication.authenticate('local', {successRedirect: '/app', failureRedirect: '/error'}))

export default router;