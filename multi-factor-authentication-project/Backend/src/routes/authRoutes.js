import { Router } from "express";
import passport from "passport";
import {
  authstatus,
  login,
  logout,
  register,
  reset,
  setup2FA,
  verify2FA,
} from "../controllers/authController.js";
const router = Router();
/**-----------1st fa ------------------ */
//registration routes 1
router.post("/register", register);

//login routes 2 ---  passport middle ware yaha use hoga
router.post("/login", passport.authenticate("local"), login);

// Auth Status Route 3
router.get("/status", authstatus);

//Logout route 4
router.post("/logout", logout);

/*--------2fa routes--------------*/

//2fa setup route 5
router.post(
  "/2fa/setup",
  (req, res, next) => {
    if (req.isAuthenticated()) return next();
    res.status(401).json({ message: "Unauthorised user" });
  },
  setup2FA
);
//verify route 6
router.post(
  "/2fa/verify",
  (req, res, next) => {
    if (req.isAuthenticated()) return next();
    res.status(401).json({ message: "Unauthorised user" });
  },
  verify2FA
);
//reset route 7
router.post(
  "/2fa/reset",
  (req, res, next) => {
    if (req.isAuthenticated()) return next();
    res.status(401).json({ message: "Unauthorised user" });
  },
  reset
);

export default router;
