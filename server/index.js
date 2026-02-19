import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import path from "path";
import methodOverride from "method-override";

import session from "express-session";
import flash from "connect-flash";

import passport from "passport";
import LocalStrategy from "passport-local";

import productRoutes from "./routes/productRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import authRoutes from "./routes/authRoutes.js";

import User from "./models/userModel.js";

import seedDb from "./seed.js";

dotenv.config();

const app = express();

// Static + parsers
app.use(express.static(path.join(path.resolve(), "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// View engine
app.set("view engine", "ejs");
app.set("views", path.join(path.resolve(), "views"));

// Other middleware
app.use(cors());
app.use(methodOverride("_method"));

// Session config (Task 72)
const sessionConfig = {
  secret: "weneedsomebettersecret",
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7,
  },
};

app.use(session(sessionConfig));
app.use(flash());

// Passport setup (Task 62)
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Locals: flash + currentUser (Task 69)
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});

// Routes
app.use("/products", productRoutes);
app.use(reviewRoutes);
app.use(authRoutes);

app.get("/", (req, res) => {
  res.send("Ecommerce Server is running");
});

// DB + server start
mongoose
  .connect(process.env.mongodburi)
  .then(() => {
    console.log("Database Connected Successfully");
    // optional seed
    seedDb();

    app.listen(5500, () => console.log("Server is running on port 5500"));
  })
  .catch((err) => console.log("Error connecting to database", err));
