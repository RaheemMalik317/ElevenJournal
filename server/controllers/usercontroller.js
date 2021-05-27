const router = require("express").Router();
const { UserModel } = require("../models");
const { UniqueConstraintError } = require("sequelize/lib/errors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const e = require("express");

router.post("/register", async (req, res) => {
     let { email, password } = req.body.user;
        try {
    const User = await UserModel.create({
      email,
      password: bcrypt.hashSync(password, 13),
    });

    let token = jwt.sign({ id: User.id  }, process.env.JWT_SECRET, {
      expiresIn: 60 * 60 * 24,
    });

    res.status(201).json({
      message: "User successfully registered",
      user: User,
      sessionToken: token
    });
  } catch (err) {

    if (err instanceof UniqueConstraintError) {
      res.status(409).json({
        message: "Email already in use",
      });
    } else {
      res.status(500).json({
        message: "Failed to register user",
      });
    }
  }
});

router.post("/login", async (req, res) => {
  let { email, password } = req.body.user;

  try {
    let loginUser = await UserModel.findOne({
      where: {
        email: email,
      },
    });

    if (loginUser) {

        let passwordComparison = await bcrypt.compare(password, loginUser.password);

        if (passwordComparison) {
            let token = jwt.sign({ id: loginUser.id  }, process.env.JWT_SECRET, {
                expiresIn: 60 * 60 * 24,
              });

      res.status(200).json({
        user: loginUser,
        message: "User succesffully logged in!",
        sessionToken: token
      });
    } else {
      res.status(401).json({
        message: "Login failed!",
      })
     } 
    } else {
         res.status(401).json({
             message: 'Incorrect email or password'
         })
        }
    } catch (err) {
        res.status(500).json({
            message:"Failed to log user in"
        })
    }
    });
    
    // res.status(200).json({
    //     user: loginUser,
    //     message: "User successfully logged in!"
    // });
/* *********************************

***** USER SIGNUP!!!! *****

************************************* */

// router.post('create', function(req, res) {

//       await  User.create({
//             email: req.body.user.email,
//             password: req.body.user.password
//         })
//             .then(
//                 res.send("This is our user/create endpoint!")
//             )

// })

module.exports = router;
