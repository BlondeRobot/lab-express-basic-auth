const { Router } = require("express");
const router = new Router();

const bcryptjs = require("bcryptjs");
const saltRounds = 10;
const User = require("../models/User.model");
const { Mongoose } = require("mongoose");

// GET route ===> render the sign-up form
router.get("/sign-up", (req, res) => res.render("auth/sign-up"));

// POST route ==> to process form data
router.post("/sign-up", (req, res, next) => {
  const { username, email, password } = req.body;


    const salt = bcryptjs.genSaltSync(saltRounds);
    const hashedPassword = bcryptjs.hashSync(password, salt);


    User.create({
        username,
        email,
        password: hashedPassword,
    })   
        .then(userCreated => {
            res.redirect('/');
        })
        .catch(err => {


            if (err.code === 11000) {
                return res.render('auth/sign-up', { errorMessage: 'This user already exists'})
            }
            next(err);
        }) 
});

module.exports = router;

// Login GET route
router.get("/login", (req, res) => res.render("auth/login"));

//Login POST route
router.post("/login", (req, res, next) => {
  const { email, password } = req.body;

  if (email === "" || password === "") {
    res.render("auth/login", {
      errorMessage: "Please enter both, email and password to login.",
    });
    return;
  }

  User.findOne({ email })
    .then((user) => {
      if (!user) {
        res.render("auth/login", {
          errorMessage: "Email is not registered. Try with other email.",
        });
        return;
      } else if (bcryptjs.compareSync(password, user.password)) {
        res.render("users/user-profile", { user });
      } else {
        res.render("auth/login", { errorMessage: "Incorrect password." });
      }
    })
    .catch((error) => next(error));
});