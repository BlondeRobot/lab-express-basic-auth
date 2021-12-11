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
  const { username, password } = req.body;

 
// bcryptjs
//     .genSalt(saltRounds)
//     .then((salt) => bcryptjs.hash(password, salt))
//     .then((hashedPassword) => {
//       return User.create({

//         username,
//         password: hashedPassword,
//       });
//     })
//     .then((userFromDB) => {
//       console.log("Newly created user is: ", userFromDB);
//     })
//     .catch((error) => next(error));

    const salt = bcryptjs.genSaltSync(saltRounds);
    const hashedPassword = bcryptjs.hashSync(password, salt);


    User.create({
        username,
        password: hashedPassword,
    })   
        .then(userCreated => {
            res.redirect('/');
        })
        .catch(err => {
            if (err instanceof Mongoose.Error.ValidationError) {
                return res.render('auth/sign-up', { errorMessage: err.message });
            }
        }) 
});

module.exports = router;
