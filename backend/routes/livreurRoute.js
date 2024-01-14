const Livreurrouter = require("express").Router();
const Livreur =require("../models/Livreur");
const bcrypt = require("bcrypt"); //import module Bcrypt

Livreurrouter.post("/signup", async (req, res) => {
  console.log(req.body);
    try{
    const mail = await Livreur.findOne({ email: req.body.email });

    console.log(mail);
    
     if (mail) {
      console.log("tkanterert 2");
      return res.status(200).json({
          message: "Email is Already used",
        });
       
      } else{
     
      console.log("wsselete");
      bcrypt.hash(req.body.numCIN, 10, function (err, hash) {
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
                      username: req.body.username,
                        email: req.body.email,
                        numcin:hash,
                        password: hash1,
                        numTel:req.body.numTel
                      });
              
                      livreur.save().then(() => {
                        res.status(200).json({ message: "livreur register successfully",livreur });
                      });
                   
                    }});
                }
            });
          }
        }catch (error) {
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
              name: findedUser.username,
              email: findedUser.email,
              role:"livreur",
              id:findedUser._id,
            };
            res.status(200).json({
              message: "Welcome "+user.name,
              user: user,
            });
          }
        }
      });
    });
  Livreurrouter.get('/',async(req,res)=>{
    try{
      let data = await Livreur.find({}); // Use await to get the result
  
      return res.status(200).json({ livreurs: data }); // Corrected syntax for res.status
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  })

  Livreurrouter.delete('/:id',(req,res)=>{
    Livreur.deleteOne({ _id: req.params.id }).then(() => {
     return res.status(200).json({
        message: "livreur deleted",
      });
  });
});
  module.exports = Livreurrouter