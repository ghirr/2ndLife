const Livreurrouter = require("express").Router();
const Livreur =require("../models/Livreur");
const bcrypt = require("bcrypt"); //import module Bcrypt

Livreurrouter.post("/sign-up", async (req, res) => {
    try{
    const mail = await Livreur.findOne({ email: req.body.email });
    let iscin = await bcrypt.compare(req.body.numcin, mail?.numcin);
    if(iscin){
        res.status(200).json({
            message: "This CIN is used",
          });
          return;
    }
     if (mail?.email) {
        res.status(200).json({
          message: "Email is Already used",
        });
        return;
      } 
     
   
     else {
      bcrypt.hash(req.body.numcin, 10, function (err, hash) {
        if (err) {
          console.log(err);
          return;
        } else {
            bcrypt.hash(req.body.password, 10, function (err, hash1) {
                if (err) {
                    console.log(err);
                    return;
                  } else {
                    const livreur = new Livreur({
                        firstname: req.body.firstname,
                        lastname: req.body.lastname,
                        email: req.body.email,
                        numcin:hash,
                        password: hash1,
                      });
              
                      livreur.save().then(() => {
                        res.status(200).json({ message: "livreur register successfully",livreur });
                      });
                   
                    }});
                }
            });
        }}catch (error) {
            console.error(error);
            res.status(500).json({
                message: "Internal server error",
            });
        }
  });
    //trait logique login
    Livreurrouter.post("/login", (req, res) => {
      console.log("hereeeee into loginnn");
      console.log(req.body);
    
      Livreur.findOne({ email: req.body.email }).then(async (findedUser) => {
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
              name: findedUser.firstname +" "+findedUser.lastname,
              email: findedUser.email,
              role:findedUser.role
            };
            res.status(200).json({
              message: "Welcome "+user.name,
              user: user,
            });
          }
        }
      });
    });
  
  module.exports = Livreurrouter