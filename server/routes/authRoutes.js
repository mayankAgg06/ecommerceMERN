import express from "express";
import passport from "passport";
import User from "../models/userModel.js";

const router = express.Router();

// Register form
router.get("/register", (req, res) => {
  res.render("auth/signup");
});

// Register user + auto login
router.post("/register", async (req, res, next) => {
  try {
    const { email, username, password } = req.body;

    const user = new User({ email, username });
    const newUser = await User.register(user, password);

    req.login(newUser, (err) => {
      if (err) return next(err);
      req.flash("success", "welcome, you are registered successfully");
      return res.redirect("/products/allProducts");
    });
  } catch (e) {
    req.flash("error", e.message);
    return res.redirect("/register");
  }
});

// Login form
router.get("/login", (req, res) => {
  res.render("auth/login");
});

// Login
router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureMessage: true,
  }),
  (req, res) => {
    req.flash("success", `welcome back ${req.user.username}`);
    res.redirect("/products/allProducts");
  }
);

// Logout
router.get("/logout", (req, res) => {
  req.logout(() => {
    req.flash("success", "goodbye friend");
    res.redirect("/login");
  });
});

export default router;
