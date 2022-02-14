import { NextFunction, Request, Response, Router } from "express";
import passport from "../providers/AuthenticationProvider";
import User from "../models/User";
const router = Router();

router.get("/ping", (req: Request, res: Response) => {
  return res.status(200).json({
    authenticated: req.isAuthenticated(),
  });
});

router.get("/logout", (req: Request, res: Response) => {
  req.logout();
  return res.json({});
});

router.post("/register", (req: Request, res: Response, next: NextFunction) => {
  const user = new User({
    username: req.body.username,
    email: req.body.email
  }, {versionKey: false});

  (User as any).register(user, req.body.password, (err: Error, _: any) => {
    if ((err) || !(user)) {
      console.log((err) ? err : "No User");
      return res.status(500).send({
        error: ((err) && (err.message))
          ? err.message
          : "Internal Server error.",
      });
    }

    user.save((uerr) => {
      if (uerr) {
        console.log(uerr);
        return res.status(500).send({
          error: ((uerr) && (uerr.message))
            ? uerr.message
            : "Internal Server error.",
        });
      }

      passport.authenticate("local", (perr: Error, auth: any) => {
        if (perr || !auth) {
          console.log(perr);
          return res.status(500).send({
            error: ((perr) && (perr.message))
              ? perr.message
              : "Internal Server error.",
          });
        }

        req.logIn(auth, async (lerr: Error) => {
          if (lerr) {
            console.log(lerr);
            return res.status(500).send({
              error: ((lerr) && (lerr.message))
                ? lerr.message
                : "Internal Server error.",
            });
          }

          delete (user as any).hash;
          delete (user as any).salt;

          return res.status(200).send({ user });
        });
      })(req, res, next);
    });
  });
});

router.post(
  "/login",
  async (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate("local", (err: Error, user: any, info: any) => {
      if ((err) || (!user)) {
        console.log((err) ? err : "No User");
        return res.status(500).send({
          error: ((err) && (err.message))
            ? err.message
            : "Internal Server error.",
        });
      }

      User.findById(user._id, (uerr: Error, _: any) => {
        if ((uerr) || (!user)) {
          console.log((uerr) ? uerr : "No User");
          return res.status(500).send({
            error: ((uerr) && (uerr.message))
              ? uerr.message
              : "Incorrect username or password",
          });
        }

        req.logIn(user, async (lerr: Error) => {
          delete user.hash;
          delete user.salt;
          return res.status(200).send({ user });
        });
      });
    })(req, res, next);
  },
);

export default router;
