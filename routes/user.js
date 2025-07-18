const express = require("express");
const router = express.Router();
const asyncWrap = require("../utils/asyncwrap");
const passport = require("passport");
const { saveRedirectURL } = require("../middleware");
const UserController = require("../Controllers/User.controller.js");

router
  .route("/signup")
  .get(UserController.UserRegisterForm)
  .post(asyncWrap(UserController.RegisterUser));

router
  .route("/login")
  .get(UserController.UserLoginForm)
  .post(
    saveRedirectURL,
    passport.authenticate("local", {
      failureRedirect: "/login",
      failureFlash: true,
    }),
    UserController.UserLogin
  );

router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.flash("success", "You are Logged out!!");
    res.redirect("/listings");
  });
});

module.exports = router;
