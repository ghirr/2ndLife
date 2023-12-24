const Userrouter = require("express").Router();
const passport = require("passport");
const User =require("../models/User");
const bcrypt = require("bcrypt"); //import module Bcrypt
const jwt = require("jsonwebtoken");
const config=require('../config/config');



const CLIENT_URL = "http://localhost:4200/";

Userrouter.get('/session-data', (req, res) => {
  console.log(req.session);
  if (req.user) {
    res.status(201).json({ data:req.session.passport.user });
  } else {
   // res.status(401).json({ message: 'User not authenticated' });
  }
});

Userrouter.get("/login/success", (req, res) => {
  if (req.user) {
    req.login(req.user, (err) => {
      if (err) {
        return res.status(401).json({ success: false, message: "Login failed" });
      }
      res.status(200).json({
        user:req.user
      })
      res.redirect("http://localhost:4200/");
    });
  }else{
    console.log(req.session);
  }
});

/*Userrouter.get("/login/failed", (req, res) => {
  res.status(401).json({
    success: false,
    message: "failure",
  });
});*/
/*
router.get("/logout", (req, res) => {
  req.logout();
  res.redirect(CLIENT_URL);
});
*/

Userrouter.get('/google',passport.authenticate('google', { scope:[ 'email', 'profile' ] }));

Userrouter.get('/google/cb', passport.authenticate('google',  {
  successRedirect: "http://localhost:3000/auth/login/success",
  failureRedirect: CLIENT_URL+"**",
}));


/*
Userrouter.get("/facebook", passport.authenticate("facebook", { scope: ["profile"] }));

Userrouter.get(
  "/facebook/cb",
  passport.authenticate("facebook", {
    successRedirect: CLIENT_URL,
    failureRedirect: "/login/failed",
  })
);
*/
Userrouter.post("/sign-up", async (req, res) => {
  const data = await User.findOne({ email: req.body.email });
  if (data?.email) {
    return res.status(200).json({
      message: "Email is Already used",
    });
    
  } else {
    bcrypt.hash(req.body.password, 10, function (err, hash) {
      if (err) {
        console.log(err);
      } else {
        const user = new User({
          name: req.body.name,
          email: req.body.email,
          phone:req.body.PhoneNumber,
          password: hash,
        });

        user.save().then(() => {
         return res.status(200).json({ message: "register successfully",user });
        });
      }
    });
  }
});
  //trait logique login
  Userrouter.post("/login", (req, res) => {
    console.log("hereeeee into loginnn");
    console.log(req.body);
  
    User.findOne({ email: req.body.email }).then(async (findedUser) => {
      if (!findedUser) {
        res.status(200).json({
          message: "please verify your credentials",
        });
        return
      } else {
        console.log(req.body.password);
        console.log("findedUser:", findedUser);
        let comPwd = await bcrypt.compare(req.body.password, findedUser.password);
        console.log("here co pwf", comPwd);
        if (!comPwd) {
          res.status(200).json({
            message: "please verify your credentials",
          });
          return
        } else {
          let user = {
            name: findedUser.name,
            email: findedUser.email,
            phone:findedUser.phone

          };
          
       let data= jwt.sign({
          data: {id:findedUser._id,role:findedUser.role},
        }, config.secret,{ expiresIn: '10m' });
          res.status(200).json({
            message: "Welcome "+user.name,
            user: user,
            token:data
          });
        }
      }
    });
  });

module.exports = Userrouter